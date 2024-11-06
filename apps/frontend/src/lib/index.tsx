import { Edge, MarkerType } from '@xyflow/react'

import { DefaultNode, FlowNode, Workflow } from '../interface/flowNode'

type NodeWithChildren = {
  childrenNodeIds?: string[]
} & FlowNode

export const generateTreeMap = (
  data: Workflow
): Map<string, NodeWithChildren> => {
  const nodes = data.nodes
  const map = new Map<string, NodeWithChildren>()

  // 先将 nodes 数组中的节点都填充到 map 中
  nodes.forEach((node: FlowNode) => {
    // if (!node.parentNodeIds?.length) {
    //   // 没有父节点的节点，默认为根节点
    //   setRootNode(node)
    // }

    map.set(node.id, node)
  })

  // 填充 map 中节点的 childrenNodeIds 属性
  nodes.forEach((node: FlowNode) => {
    // 遍历节点的所有父节点
    node.parentNodeIds?.forEach((parentNodeId: string) => {
      const parentNode = map.get(parentNodeId)
      if (parentNode) {
        parentNode.childrenNodeIds = [
          ...(parentNode.childrenNodeIds || []),
          node.id
        ]
      }
    })
  })

  return map
}

export const generateDefaultFlowNodes = (
  nodeMap: Map<string, NodeWithChildren>
): DefaultNode[] => {
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
}

export const generateDefaultFlowEdges = (
  nodeMap: Map<string, NodeWithChildren>
): Edge[] => {
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
}
