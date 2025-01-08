import { Position } from '@xyflow/react'

import { FlowNode } from '../../../interface/flowNode'
import CustomHandle from '../../Handle'
import CustomNode from '../CustomNode'

const DefaultNode = ({
  data,
  isConnectable
}: {
  data: FlowNode
  isConnectable: boolean
}) => {
  const isStart = !data?.parentNodeIds?.length
  const isEnd = !data?.childrenNodeIds?.length

  return (
    <>
      {!isStart && (
        <CustomHandle
          isConnectable={isConnectable}
          position={Position.Top}
          type="target"
        />
      )}

      <CustomNode data={data}></CustomNode>

      {!isEnd && (
        <CustomHandle
          isConnectable={isConnectable}
          position={Position.Bottom}
          type="source"
        />
      )}
    </>
  )
}

export default DefaultNode
