import { initialNodes, initialEdges } from './nodes-edges.js'
import ELK from 'elkjs/lib/elk.bundled.js'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import {
  ReactFlow,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { nodeTypes } from './Nodes'
import { edgeTypes } from './Edges'
import { Modal } from 'antd'

const elk = new ELK()

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80'
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
      width: 100,
      height: 24
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
        position: { x: node.x, y: node.y }
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
  const [modalDescription, setModalDescription] = useState('')

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds) as any),
    []
  )
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }: any) => {
      const opts = { 'elk.direction': direction, ...elkOptions }
      const ns = useInitialNodes ? initialNodes : nodes
      const es = useInitialNodes ? initialEdges : edges

      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }: any) => {
          setNodes(layoutedNodes)
          setEdges(layoutedEdges)

          window.requestAnimationFrame(() => fitView())
        }
      )
    },
    [nodes, edges]
  )

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: 'RIGHT', useInitialNodes: true })
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodeClick={(event, node: any) => {
        if (node.data.hintMode === 'modal') {
          setIsModalOpen(true)
          setModalDescription(node.data.hint)
        }
      }}
    >
      <Panel position="top-right">
        <button onClick={() => onLayout({ direction: 'DOWN' })}>
          vertical layout
        </button>

        <button onClick={() => onLayout({ direction: 'RIGHT' })}>
          horizontal layout
        </button>
      </Panel>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <p>{modalDescription}</p>
      </Modal>
    </ReactFlow>
  )
}

export default LayoutFlow
