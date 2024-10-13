import { Handle } from '@xyflow/react'
import { HandleProps } from '@xyflow/react/dist/esm/components/Handle'

export const CustomHandle = ({
  position,
  type,
  isConnectable
}: HandleProps) => (
  <Handle
    type={type}
    position={position}
    isConnectable={isConnectable}
    style={{
      opacity: 0
    }}
  />
)

export default CustomHandle
