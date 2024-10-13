import { Position } from '@xyflow/react'

import CustomNode from '../CustomNode'
import CustomHandle from '../../Handle'
import { Node } from '../../../interface/node'

const DefaultNode = ({
  isConnectable,
  data
}: {
  isConnectable: boolean
  data: Node
}) => {
  const isStart = !data?.parentNodeIds?.length
  const isEnd = !data?.childrenNodeIds?.length

  return (
    <>
      <CustomHandle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <CustomNode data={data}></CustomNode>

      <CustomHandle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  )
}

export default DefaultNode
