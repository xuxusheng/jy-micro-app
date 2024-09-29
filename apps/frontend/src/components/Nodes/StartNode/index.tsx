import { Position } from '@xyflow/react'

import { NodeProps } from '@xyflow/react/dist/esm/types'
import CustomNode from '../CustomNode'
import CustomHandle from '../../Handle'

const StartNode = ({
  isConnectable,
  data
}: NodeProps & {
  data: any
  type: any
}) => {
  return (
    <>
      <CustomNode data={data}></CustomNode>

      <CustomHandle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  )
}

export default StartNode
