// 工作流
export interface Workflow {
  name: string // 工作流名称
  nodes: Node[] // 工作流节点
}

export enum NodeStatus {
  Default = 'default',
  Success = 'success'
}

export enum NodeType {
  // 举几个例子
  Default = 'DEFAULT', // 普通节点
  Text = 'TEXT', // 文本节点
  Popover = 'POPOVER' // 气泡节点
}

// 流程图中节点
export interface Node {
  id: string // 节点 ID
  title: string // 节点文本
  type: NodeType // 节点类型
  status: NodeStatus // 节点状态

  text?: string // 节点旁边文本

  active: boolean // 节点激活状态

  isSingleSuccess?: boolean // 是否选择一个完成

  parentNodeIds?: string[] // 父节点 ID 列表
  childrenNodeIds?: string[] // 子节点 ID 列表
}
