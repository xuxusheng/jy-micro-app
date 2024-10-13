import { Handle, Position } from '@xyflow/react'

import Styles from './index.module.css'
import { NodeProps } from '@xyflow/react/dist/esm/types'
import CustomNode from '../CustomNode'
import CustomHandle from '../../Handle'

const TaskNode = ({
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

      <CustomHandle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  )
}

export default TaskNode
