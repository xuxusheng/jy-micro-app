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
          type: NodeType.Task,
          status: NodeStatus.Default,
          parentNodeIds: ['03', '04']
        },
        {
          id: '06',
          title: '06',
          type: NodeType.Task,
          status: NodeStatus.Default,
          parentNodeIds: ['01', '03', '04', '05']
        },
        {
          id: '07',
          title: '07',
          type: NodeType.Task,
          status: NodeStatus.Default,
          parentNodeIds: ['02', '03', '04', '05']
        },
        {
          id: '08',
          title: '08',
          type: NodeType.Task,
          status: NodeStatus.Default,
          parentNodeIds: ['05', '06']
        },
        {
          id: '09',
          title: '09',
          type: NodeType.Task,
          status: NodeStatus.Default,
          parentNodeIds: ['07', '06', '02']
        },
        {
          id: '10',
          title: '10',
          type: NodeType.Task,
          status: NodeStatus.Default,
          parentNodeIds: ['07', '08', '01']
        },
        {
          id: '11',
          title: '11',
          type: NodeType.Task,
          status: NodeStatus.Default,
          parentNodeIds: ['04', '03', '08']
        }
      ]
    }
  }
}

export const workflowApi = new WorkflowApi()
