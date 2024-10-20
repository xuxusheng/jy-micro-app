import { type Edge, MarkerType, ReactFlowProvider } from '@xyflow/react'
import React, { FC, useMemo, useState } from 'react'

import { workflowApi } from '../../api/workflow'
import FlowLayout from '../../components/FlowLayout'
import { DefaultNode, FlowNode } from '../../interface/flowNode'

type NodeWithChildren = {
  childrenNodeIds?: string[]
} & FlowNode

// const workflow = workflowApi.demo01()

export const Demo01Page: FC = () => {
  const [workflow] = useState(workflowApi.demo01())

  // 流程图中的根节点
  const [rootNode, setRootNode] = useState<NodeWithChildren>()

  // 包含所有节点的 map，每个节点属性中都包含其父节点和子节点的 id
  const nodeMap: Map<string, FlowNode> = useMemo(() => {
    const nodes = workflow.nodes
    const map = new Map<string, NodeWithChildren>()

    // 先将 nodes 数组中的节点都填充到 map 中
    nodes.forEach((node) => {
      if (!node.parentNodeIds?.length) {
        // 没有父节点的节点，默认为根节点
        setRootNode(node)
      }

      map.set(node.id, node)
    })

    // 填充 map 中节点的 childrenNodeIds 属性
    nodes.forEach((node) => {
      // 遍历节点的所有父节点
      node.parentNodeIds?.forEach((parentNodeId) => {
        const parentNode = map.get(parentNodeId)
        if (parentNode) {
          parentNode.childrenNodeIds = [
            ...(parentNode.childrenNodeIds || []),
            node.id
          ]
        }
      })
    })

    console.log(map)

    return map
  }, [workflow])

  const nodes = useMemo(() => {
    const all: DefaultNode[] = []
    nodeMap?.forEach((v) => {
      const data = v

      all.push({
        data,
        id: v.id,
        position: {
          x: 0,
          y: 0
        },
        type: 'Default'
      })
    })
    return all
  }, [nodeMap])

  const edges = useMemo(() => {
    const all: Edge[] = []
    nodeMap.forEach((v) => {
      v.childrenNodeIds?.forEach((v1) => {
        all.push({
          id: `${v.id}-${v1}`,
          markerEnd: { color: '#49e6ef', type: MarkerType.ArrowClosed },
          source: v.id,
          target: v1,
          type: 'smoothstep'
        })
      })
    })

    return all
  }, [nodeMap, rootNode])

  console.log(nodes, edges)

  return (
    <div
      style={{ backgroundColor: '#172533', height: '100vh', width: '100vw' }}
    >
      <ReactFlowProvider>
        <FlowLayout initialEdges={edges} initialNodes={nodes}></FlowLayout>
      </ReactFlowProvider>
    </div>
  )
}
