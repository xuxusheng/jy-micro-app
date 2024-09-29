import IconNode from './IconNode'
import StartNode from './StartNode'
import { NodeType } from '../../interface/node'
import DefaultNode from './DefaultNode'
import TaskNode from './TaskNode'
import EndNode from './EndNode'

export * from './IconNode'

export const nodeTypes = {
  iconNode: IconNode,
  [NodeType.Start]: StartNode,
  [NodeType.Default]: DefaultNode,
  [NodeType.Task]: TaskNode,
  [NodeType.End]: EndNode
}
