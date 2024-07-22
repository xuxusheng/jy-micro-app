import { Handle, Position } from '@xyflow/react'

import IconNodeStyle from './IconNode.module.css'
import { NodeProps } from '@xyflow/react/dist/esm/types'

const IconNode = ({
  isConnectable,
  data
}: NodeProps & {
  data: any
  type: any
}) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className={IconNodeStyle.container}>
        <div
          className={IconNodeStyle.icon + ' ' + IconNodeStyle[data.icon]}
        ></div>
        <div className={IconNodeStyle.label}>{data.label}</div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </>
  )
}

export default IconNode
