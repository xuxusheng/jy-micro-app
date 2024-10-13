import IconNode from './IconNode'
import { NodeType } from '../../interface/node'
import DefaultNode from './DefaultNode'
import PopoverNode from './PopoverNode'
import TextNode from './TextNode'

export * from './IconNode'

export const nodeTypes = {
  iconNode: IconNode,
  [NodeType.Default]: DefaultNode,
  [NodeType.Text]: TextNode,
  [NodeType.Popover]: PopoverNode
}
