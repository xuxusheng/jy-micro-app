import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react'
import ELK from 'elkjs/lib/elk.bundled.js'
import React, { useCallback, useEffect } from 'react'
import '@xyflow/react/dist/style.css'

import { Node, NodeType } from '../interface/node'
import { nodeTypes } from './Nodes'

const elk = new ELK()

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.edgeRouting': 'SPLINES',
  'elk.layered.mergeEdges': 'true',
  'elk.layered.spacing': '60',
  'elk.layered.spacing.nodeNodeBetweenLayers': '60',
  'elk.spacing': '60',
  'elk.spacing.individual': '60',
  'elk.spacing.nodeNode': '30'
}

const getLayoutedElements = (nodes: any, edges: any, options: any = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT'
  const graph = {
    children: nodes.map((node: any) => ({
      ...node,
      height: node.data.height ?? 80,
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      // Hardcode a width and height for elk to use when layouting.
      width: node.data.width ?? 80
    })),
    edges: edges,
    id: 'root',
    layoutOptions: options
  }

  return elk
    .layout(graph)
    .then((layoutedGraph: any) => ({
      edges: layoutedGraph.edges,

      nodes: layoutedGraph.children.map((node: any) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: {
          x: node.x,
          y: node.y
        }
      }))
    }))
    .catch(console.error)
}

function LayoutFlow({
  initialEdges,
  initialNodes
}: {
  initialEdges: any
  initialNodes: any
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { fitView } = useReactFlow()

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }: any) => {
      const opts = { 'elk.direction': direction, ...elkOptions }
      const ns = useInitialNodes ? initialNodes : nodes
      const es = useInitialNodes ? initialEdges : edges

      getLayoutedElements(ns, es, opts).then(
        ({ edges: layoutedEdges, nodes: layoutedNodes }: any) => {
          setNodes(layoutedNodes)
          setEdges(layoutedEdges)
          window.requestAnimationFrame(() => {
            fitView()
          })
        }
      )
    },
    [nodes, edges]
  )

  const flagNode = (nodes: any, ids: any, flag: boolean) => {
    ids.forEach((v: any) => {
      const node: any = nodes.find((v1: any) => v === v1.id)
      node.data.active = flag

      if (
        node.data.childrenNodeIds &&
        node.data.childrenNodeIds?.length > 0 &&
        node.data.type !== NodeType.Select
      ) {
        flagNode(nodes, node.data.childrenNodeIds, flag)
      }
    })
  }

  const onNodeClick = (event: any, node: any) => {
    if (!node.data.active) {
      return
    }

    const flag = !node.data.checked
    let allDoned = [flag]
    let isActive = false

    if (node.data.parentNodeIds && node.data.parentNodeIds.length > 0) {
      node.data.parentNodeIds?.forEach((n1: string) => {
        const sibingsNodeChecked = nodes
          .filter(
            (v1: any) => v1.data.parentNodeIds.includes(n1) && v1.id !== node.id
          )
          ?.map((v: any) => v.data.checked)
        allDoned = allDoned.concat(sibingsNodeChecked)
      })
    }

    if (node.data.isSingleSuccess && !!allDoned.find((v1) => v1)) {
      isActive = true
    }

    if (!node.data.isSingleSuccess && allDoned.every((v1) => v1)) {
      isActive = true
    }

    setNodes((ns) => {
      const n: any = ns.find((v: any) => v.id === node.id)
      if (n) {
        n.data.checked = flag

        flagNode(ns, n.data.childrenNodeIds, isActive)
      }

      return [...ns]
    })
  }

  // Calculate the initial layout on mount.
  useEffect(() => {
    onLayout({ direction: 'DOWN', useInitialNodes: true })
  }, [])

  useEffect(() => {
    setEdges((eds) => {
      const newEds = eds.map((ed: any) => {
        const targetNodeId = ed.target
        const node: any = nodes.find((n: any) => n.id === targetNodeId)
        if (node.data.active === false) {
          ed = { ...ed, style: { opacity: 0.2 } }
        } else {
          ed = { ...ed, style: { opacity: 1 } }
        }
        return ed
      })

      return [...newEds] as never[]
    })
  }, [nodes])

  return (
    <ReactFlow
      edges={edges}
      fitView
      fitViewOptions={{
        minZoom: 1,
        nodes: nodes?.slice(0, 10)
      }}
      minZoom={1}
      nodes={nodes}
      nodeTypes={nodeTypes}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onNodesChange={onNodesChange}
      panOnScroll
    ></ReactFlow>
  )
}

export default LayoutFlow
