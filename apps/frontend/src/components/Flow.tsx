import { useCallback, useState, useMemo } from 'react'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlow,
  SelectionMode,
  MiniMap,
  Controls,
  Panel,
  BackgroundVariant,
  Background,
  NodeChange
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// import TextUpdaterNode from './TextUpdaterNode.jsx'
// import './text-updater-node.css'
// import CounterNode from './CounterNode.jsx'
// import CustomEdge from './CustomEdge.jsx'

const initialNodes = [
  {
    id: '1',
    position: { x: 250, y: 25 },
    style: { backgroundColor: '#6ede87', color: 'white' },
    data: { label: 1 }
  },
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: 2 },
    position: { x: 100, y: 125 },
    style: { backgroundColor: '#ff0072', color: 'white' }
  },
  {
    id: '3',
    data: { label: '3' },
    position: { x: 250, y: 250 },
    style: { backgroundColor: '#6865A5', color: 'white' }
  },
  {
    id: '4',
    data: { label: '4' },
    position: { x: 250, y: 350 },
    style: { backgroundColor: '#6865A5', color: 'white' }
  }
]

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    // sourceHandle: 'a',
    type: 'step',
    label: 'to'
  },
  { id: 'e1-3', source: '1', target: '3', sourceHandle: 'b', label: 'to' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4' }
]

const rfStyle = {
  backgroundColor: '#f5f5f5'
}

const panOnDrag = [1, 2]

// const nodeTypes = { textUpdater: TextUpdaterNode, counterNode: CounterNode }

// const edgeTypes = {
//   'custom-edge': CustomEdge
// }

// const nodeColor = (node: { type: string }) => {
//   switch (node.type) {
//     case 'input':
//       return '#6ede87'
//     case 'output':
//       return '#6865A5'
//     default:
//       return '#ff0072'
//   }
// }

function Flow() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  )
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  )
  const onConnect = useCallback(
    (connection: any) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  )

  const [variant, setVariant] = useState<BackgroundVariant>(
    BackgroundVariant.Cross
  )

  return (
    <ReactFlow
      // colorMode="dark"
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      panOnScroll
      selectionOnDrag
      // edgeTypes={edgeTypes}
      panOnDrag={panOnDrag}
      selectionMode={SelectionMode.Partial}
      // nodeTypes={nodeTypes}
      style={rfStyle}
    >
      <MiniMap
        // nodeColor={nodeColor}
        nodeStrokeWidth={3}
        zoomable
        pannable
      ></MiniMap>
      <Controls />
      <Background color="#ccc" variant={variant} />

      <Panel>
        <div>variant:</div>
        <button onClick={() => setVariant(BackgroundVariant.Dots)}>dots</button>
        <button onClick={() => setVariant(BackgroundVariant.Lines)}>
          lines
        </button>
        <button onClick={() => setVariant(BackgroundVariant.Cross)}>
          cross
        </button>
      </Panel>

      <Panel position="top-left">top-left</Panel>
      <Panel position="top-center">top-center</Panel>
      <Panel position="top-right">top-right</Panel>
      <Panel position="bottom-left">bottom-left</Panel>
      <Panel position="bottom-center">bottom-center</Panel>
      <Panel position="bottom-right">bottom-right</Panel>
    </ReactFlow>
  )
}

export default Flow
