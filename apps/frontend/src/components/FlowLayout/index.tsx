import {
  Controls,
  type Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react'
import ELK from 'elkjs/lib/elk.bundled.js'
import { ElkNode, LayoutOptions } from 'elkjs/lib/elk-api'
import '@xyflow/react/dist/style.css'
import React, {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect
} from 'react'

import { DefaultNode } from '../../interface/flowNode'
import { nodeTypes } from '../Nodes'

const elk = new ELK()

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.edgeRouting': 'SPLINES',
  'elk.layered.crossingMinimization.forceNodeModelOrder': true,
  'elk.layered.mergeEdges': 'true',
  'elk.layered.spacing': '60',
  'elk.layered.spacing.nodeNodeBetweenLayers': '60',
  'elk.spacing': '60',
  'elk.spacing.individual': '60',
  'elk.spacing.nodeNode': '30'
}

const getLayoutedElements = (
  nodes: DefaultNode[],
  edges: any,
  options: LayoutOptions = {}
) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT'
  const graph: ElkNode = {
    children: nodes.map((node) => ({
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
    .then((layoutedGraph) => ({
      edges: layoutedGraph.edges,

      nodes: layoutedGraph.children?.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: {
          x: node.x,
          y: node.y
        }
      })) as DefaultNode[]
    }))
    .catch(console.error)
}

function LayoutFlow({
  initialEdges,
  initialNodes,
  fitViewNodeLen = 8
}: {
  initialEdges: Edge[]
  initialNodes: DefaultNode[]
  fitViewNodeLen?: number
}) {
  const [nodes, setNodes] = useNodesState<DefaultNode>([])
  const [edges, setEdges] = useEdgesState<Edge>([])
  const { fitView } = useReactFlow()

  const onLayout = useCallback(
    ({
      direction,
      useInitialNodes = false
    }: {
      direction: string
      useInitialNodes: boolean
    }) => {
      const opts = { 'elk.direction': direction, ...elkOptions } as any
      const ns = useInitialNodes ? initialNodes : nodes
      const es = useInitialNodes ? initialEdges : edges

      getLayoutedElements(ns, es, opts).then(
        ({ edges: layoutedEdges, nodes: layoutedNodes }: any) => {
          console.log(layoutedNodes)
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

  const flagNode = (
    nodes: DefaultNode[],
    ids: string[],
    flag: boolean,
    checked?: boolean
  ) => {
    ids.forEach((v) => {
      const node = nodes.find((v1) => v === v1.id)
      if (node) {
        node.data.active = flag

        node.data.checked = checked

        if (
          !flag &&
          node?.data.childrenNodeIds &&
          node?.data.childrenNodeIds?.length > 0
        ) {
          flagNode(nodes, node.data.childrenNodeIds, flag, false)
        }
      }
    })
  }

  const onNodeClick = (event: ReactMouseEvent, node: DefaultNode) => {
    event.stopPropagation()
    event.preventDefault()
    const isStart = !node.data?.parentNodeIds?.length
    const isEnd = !node.data?.childrenNodeIds?.length
    if (!node.data.active || isStart || isEnd) {
      return
    }

    const flag = !node.data.checked
    let allDoned = [flag]
    let isActive = false

    let sibingsNode: DefaultNode[] = []

    if (node.data.parentNodeIds && node.data.parentNodeIds.length > 0) {
      node.data.parentNodeIds?.forEach((n1: string) => {
        sibingsNode =
          nodes.filter(
            (v1) => v1?.data?.parentNodeIds?.includes(n1) && v1.id !== node.id
          ) || []
        const sibingsNodeChecked = sibingsNode?.map((v) => !!v.data.checked)
        allDoned = allDoned.concat(sibingsNodeChecked)
      })
    }

    if (node.data.isSingleSuccess && !!allDoned.find((v1) => v1)) {
      isActive = true
      // 同级节点变灰色
      sibingsNode?.forEach((v) => {
        v.data.active = false
      })
    }

    if (!node.data.isSingleSuccess && allDoned.every((v1) => v1)) {
      isActive = true
    }

    setNodes((ns) => {
      // 子级节点变亮
      const n = ns.find((v) => v.id === node.id)
      if (n) {
        n.data.checked = flag

        flagNode(ns, n.data.childrenNodeIds || [], isActive)
      }

      return [...ns]
    })

    return false
  }

  const onResize = () => {
    fitView()
  }

  // Calculate the initial layout on mount.
  useEffect(() => {
    onLayout({ direction: 'DOWN', useInitialNodes: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    setEdges((eds) => {
      const newEds = eds.map((ed: Edge) => {
        const targetNodeId = ed.target
        const n = nodes.find((n: DefaultNode) => n.id === targetNodeId)
        if (n?.data?.active === false) {
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
        nodes: nodes?.slice(0, fitViewNodeLen)
      }}
      minZoom={1}
      nodes={nodes}
      nodesDraggable={false}
      nodeTypes={nodeTypes}
      onNodeClick={onNodeClick}
      panOnScroll
    >
      <Controls
        fitViewOptions={{
          minZoom: 1,
          nodes: nodes?.slice(0, fitViewNodeLen)
        }}
        showInteractive={false}
      />
    </ReactFlow>
  )
}

export default LayoutFlow
