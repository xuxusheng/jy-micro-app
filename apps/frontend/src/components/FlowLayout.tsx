import ELK from 'elkjs/lib/elk.bundled.js'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  useReactFlow
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { nodeTypes } from './Nodes'
import { Modal } from 'antd'
import { NodeStatus } from '../interface/node'

const elk = new ELK()

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.spacing.nodeNode': '30',
  'elk.layered.spacing.nodeNodeBetweenLayers': '60',
  'elk.layered.spacing': '60',
  'elk.layered.mergeEdges': 'true',
  'elk.spacing': '60',
  'elk.spacing.individual': '60',
  'elk.edgeRouting': 'SPLINES'
}

const getLayoutedElements = (nodes: any, edges: any, options: any = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT'
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node: any) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // Hardcode a width and height for elk to use when layouting.
      width: node.data.width ?? 80,
      height: node.data.height ?? 80
    })),
    edges: edges
  }

  return elk
    .layout(graph)
    .then((layoutedGraph: any) => ({
      nodes: layoutedGraph.children.map((node: any) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: {
          x: node.x,
          y: node.y
        }
      })),

      edges: layoutedGraph.edges
    }))
    .catch(console.error)
}

function LayoutFlow({
  initialNodes,
  initialEdges
}: {
  initialNodes: any
  initialEdges: any
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { fitView } = useReactFlow()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentNode, setCurrentNode] = useState<any>(null)

  const handleOk = () => {
    setIsModalOpen(false)
    setNodes((ns) => {
      const node: any = ns.find((n: any) => n.data.id === currentNode.data.id)
      if (node) {
        node.data.status = NodeStatus.Success
      }
      return [...ns]
    })

    for (let n of currentNode.data.childrenNodeIds) {
      setEdges((es) => {
        const _id = `${currentNode.data.id}-${n}`
        const edge: any = es.find((e: any) => e.id === _id)
        if (edge) {
          edge.animated = true
        }
        return [...es]
      })
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }: any) => {
      const opts = { 'elk.direction': direction, ...elkOptions }
      const ns = useInitialNodes ? initialNodes : nodes
      const es = useInitialNodes ? initialEdges : edges

      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }: any) => {
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

  // Calculate the initial layout on mount.
  useEffect(() => {
    onLayout({ direction: 'DOWN', useInitialNodes: true })
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      minZoom={1}
      fitView
      fitViewOptions={{
        minZoom: 1,
        nodes: nodes?.slice(0, 10)
      }}
      nodeTypes={nodeTypes}
      onNodeClick={(event, node: any) => {
        if (node.data.hintMode === 'modal') {
          setIsModalOpen(true)
          setCurrentNode(node)
          console.log('node', node)
        }
      }}
      panOnScroll
    >
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <p>{currentNode?.data?.hint}</p>
      </Modal>
    </ReactFlow>
  )
}

export default LayoutFlow
