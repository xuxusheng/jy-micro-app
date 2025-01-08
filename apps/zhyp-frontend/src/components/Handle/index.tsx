import { Handle } from '@xyflow/react'
import { HandleProps } from '@xyflow/react/dist/esm/components/Handle'

export const CustomHandle = ({
  isConnectable,
  position,
  type
}: HandleProps) => (
  <Handle
    isConnectable={isConnectable}
    position={position}
    style={{
      opacity: 0
    }}
    type={type}
  />
)

export default CustomHandle
