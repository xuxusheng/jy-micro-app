// 工作流
export interface Workflow {
  name: string // 工作流名称
  nodes: Node[] // 工作流节点
}

export enum NodeStatus {
  // 举几个例子
  Default = 'default',
  Success = 'success',
  Failed = 'failed'
}

export enum NodeType {
  // 举几个例子
  Default = 'DEFAULT',
  Start = 'START',
  End = 'END',
  Task = 'TASK'
}

// 流程图中节点
export interface Node {
  id: string // 节点 ID
  title: string // 节点文本
  type: NodeType // 节点类型
  status: NodeStatus // 节点状态

  hint?: string // 提示信息
  hintMode?: 'popover' | 'drawer' | 'modal' // 提示信息展示的方式，弹窗、抽屉，等等

  parentNodeIds?: string[] // 父节点 ID 列表
}
