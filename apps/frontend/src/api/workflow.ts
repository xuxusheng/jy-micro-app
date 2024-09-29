import { NodeStatus, NodeType, Workflow } from '../interface/node'

class WorkflowApi {
  demo01 = (): Workflow => {
    return {
      name: '工作流 01',
      nodes: [
        {
          id: '01',
          title: '01',
          type: NodeType.Start,
          status: NodeStatus.Default,
          parentNodeIds: []
        },
        {
          id: '02',
          title: '02',
          type: NodeType.Default,
          status: NodeStatus.Success,
          hint: '点击在弹窗中出现提示信息',
          hintMode: 'modal',
          parentNodeIds: ['01']
        },
        {
          id: '03',
          title: '03',
          type: NodeType.Task,
          status: NodeStatus.Default,
          hint: '点击在抽屉中出现提示信息',
          hintMode: 'drawer',
          parentNodeIds: ['01']
        },
        {
          id: '04',
          title: '04',
          type: NodeType.Task,
          status: NodeStatus.Failed,
          parentNodeIds: ['02', '03']
        },
        {
          id: '05',
          title: '05',
          type: NodeType.End,
          status: NodeStatus.Default,
          parentNodeIds: ['03', '04']
        }
      ]
    }
  }
}

export const workflowApi = new WorkflowApi()
