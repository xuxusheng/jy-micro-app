import React, { FC, useMemo, useState } from 'react'
import { workflowApi } from '../../api/workflow'
import { Node } from '../../interface/node'
import FlowLayout from '../../components/FlowLayout'
import { MarkerType, ReactFlowProvider } from '@xyflow/react'

type NodeWithChildren = Node & {
  childrenNodeIds?: string[]
}

// const workflow = workflowApi.demo01()

export const Demo01Page: FC = () => {
  const [workflow] = useState(workflowApi.demo01())

  // 流程图中的根节点
  const [rootNode, setRootNode] = useState<NodeWithChildren>()

  // 包含所有节点的 map，每个节点属性中都包含其父节点和子节点的 id
  const nodeMap = useMemo(() => {
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
    const all: any[] = []
    nodeMap?.forEach((v) => {
      const data = v

      all.push({
        id: v.id,
        type: v.type,
        data
      })
    })
    return all
  }, [nodeMap])

  const edges = useMemo(() => {
    const all: any[] = []
    const getEdge = (sourceId: any) => {
      nodeMap.get(sourceId)?.childrenNodeIds?.map((v) => {
        all.push({
          id: `${sourceId}-${v}`,
          source: sourceId,
          target: v,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed, color: '#49e6ef' }
        })
        getEdge(v)
      })
    }
    getEdge((rootNode as Node)?.id)
    return all
  }, [nodeMap, rootNode])

  console.log(nodes, edges)

  return (
    <div
      style={{ width: '100vw', height: '100vh', backgroundColor: '#172533' }}
    >
      <ReactFlowProvider>
        <FlowLayout initialNodes={nodes} initialEdges={edges}></FlowLayout>
      </ReactFlowProvider>
    </div>
  )
}
