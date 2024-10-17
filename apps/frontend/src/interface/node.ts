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
  Select = 'SELECT', // 任务选择节点
  Text = 'TEXT' // 文本节点
}

// 流程图中节点
export interface Node {
  active: boolean // 节点激活状态
  checked?: boolean // 节点选择状态
  childrenNodeIds?: string[] // 子节点 ID 列表
  height?: number

  id: string // 节点 ID

  isSingleSuccess?: boolean // 是否选择一个完成
  parentNodeIds?: string[] // 父节点 ID 列表

  status: NodeStatus // 节点状态

  text?: string // 节点旁边文本
  title: string // 节点文本
  type: NodeType // 节点类型
  width?: number
}
