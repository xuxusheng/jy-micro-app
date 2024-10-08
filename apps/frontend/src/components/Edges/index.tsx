import React from 'react'
import {
  getBezierPath,
  BaseEdge,
  useStore,
  EdgeProps,
  ReactFlowState
} from '@xyflow/react'

export type GetSpecialPathParams = {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

export const getSpecialPath = (
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
  offset: number
) => {
  const centerX = (sourceX + targetX) / 2
  const centerY = (sourceY + targetY) / 2

  return `M ${sourceX} ${sourceY} Q ${centerX} ${
    centerY + offset
  } ${targetX} ${targetY}`
}

const BiDirectionalEdge = ({
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  animated
}: EdgeProps) => {
  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const edgeExists = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target)
    )

    return edgeExists
  })

  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  }

  let path = ''

  if (isBiDirectionEdge) {
    path = getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25)
  } else {
    ;[path] = getBezierPath(edgePathParams)
  }

  console.log(animated)

  return (
    <BaseEdge path={path} markerEnd={markerEnd} style={{ stroke: '#3d989f' }} />
  )
}

export const edgeTypes = {
  bidirectional: BiDirectionalEdge
}
