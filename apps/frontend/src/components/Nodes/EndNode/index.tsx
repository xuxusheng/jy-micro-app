import { Handle, Position } from '@xyflow/react'

import { NodeProps } from '@xyflow/react/dist/esm/types'
import CustomNode from '../CustomNode'
import CustomHandle from '../../Handle'

const EndNode = ({
  isConnectable,
  data
}: NodeProps & {
  data: any
  type: any
}) => {
  return (
    <>
      <CustomHandle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <CustomNode data={data}></CustomNode>
    </>
  )
}

export default EndNode
