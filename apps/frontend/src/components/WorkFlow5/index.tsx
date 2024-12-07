import { ReactFlowProvider } from '@xyflow/react'
import React, { useMemo } from 'react'

import { workflowApi } from '../../api/workflow'
import { FlowNode } from '../../interface/flowNode'
import {
  generateDefaultFlowEdges,
  generateDefaultFlowNodes,
  generateTreeMap
} from '../../lib'
import FlowLayout from '../FlowLayout'

const DATA = workflowApi.demo05()

const WorkFlow5 = () => {
  const nodeMap: Map<string, FlowNode> = useMemo(() => {
    return generateTreeMap(DATA)
  }, [])

  const nodes = useMemo(() => {
    return generateDefaultFlowNodes(nodeMap)
  }, [nodeMap])

  const edges = useMemo(() => {
    return generateDefaultFlowEdges(nodeMap)
  }, [nodeMap])

  return (
    <ReactFlowProvider>
      <FlowLayout
        fitViewNodeLen={7}
        initialEdges={edges}
        initialNodes={nodes}
      ></FlowLayout>
    </ReactFlowProvider>
  )
}

export default WorkFlow5
