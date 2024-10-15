import { NodeStatus, NodeType, Workflow } from '../interface/node'

class WorkflowApi {
  demo01 = (): Workflow => {
    return {
      name: '工作流 01',
      nodes: [
        {
          id: 'ccp',
          title: 'CCP发冷却水进阀温度高告警',
          type: NodeType.Default,
          status: NodeStatus.Default,
          active: true,
          parentNodeIds: [],
          width: 300,
          height: 40
        },
        {
          id: 'note',
          title: '注意事项',
          type: NodeType.Text,
          active: true,
          status: NodeStatus.Default,
          text: '处理过程中监盘人员密切监视阀冷系统运行情况（阀出水温度、阀进水温度、外冷喷淋泵、冷却塔风机状态），若阀进水温度持续上升，值长立即将阀冷系统运行情况及处理情况汇报站部及公司领导、调度，经同意后向国调申请降低直流系统功率。',
          parentNodeIds: ['ccp'],
          width: 120,
          height: 40
        },
        {
          id: 'report',
          title: '汇报',
          type: NodeType.Default,
          status: NodeStatus.Default,
          active: true,
          parentNodeIds: ['note'],
          width: 80,
          height: 40
        },
        {
          id: 'reportStation',
          title: '汇报站部',
          type: NodeType.Select,
          status: NodeStatus.Default,
          text: '可标记状态为成功',
          parentNodeIds: ['report'],
          checked: false,
          active: true,
          width: 120,
          height: 40
        },
        {
          id: 'reportScheduling',
          title: '汇报调度',
          type: NodeType.Select,
          status: NodeStatus.Default,
          parentNodeIds: ['report'],
          text: '可标记状态为已完成，同级两个节点都需要标记为已完成后才能继续',
          active: true,
          checked: false,
          width: 120,
          height: 40
        },
        {
          id: 'monitorClosely',
          title: '密切监视',
          type: NodeType.Default,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['reportStation', 'reportScheduling'],
          width: 120,
          height: 40
        },
        {
          id: 'dataComparison',
          title: '数据对比',
          type: NodeType.Default,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['monitorClosely'],
          width: 120,
          height: 40
        },
        {
          id: 'longitudinalComparison',
          title: '纵向对比分析',
          type: NodeType.Select,
          status: NodeStatus.Default,
          text: '可标记状态为已完成，同级两个节点都需要标记为已完成后才能继续',
          active: false,
          checked: false,
          parentNodeIds: ['dataComparison'],
          width: 200,
          height: 40
        },
        {
          id: 'horizontalComparison',
          title: '同级阀冷系统横向对比',
          type: NodeType.Select,
          status: NodeStatus.Default,
          text: '可标记状态为已完成，同级两个节点都需要标记为已完成后才能继续',
          active: false,
          checked: false,
          parentNodeIds: ['dataComparison'],
          width: 200,
          height: 40
        },
        {
          id: 'checkEquipment',
          title: '检查设备',
          type: NodeType.Default,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['longitudinalComparison', 'horizontalComparison'],
          width: 120,
          height: 40
        },
        {
          id: 'checkCoolingEquipment',
          title: '冷却设备间检查',
          type: NodeType.Select,
          status: NodeStatus.Default,
          active: false,
          checked: false,
          parentNodeIds: ['checkEquipment'],
          width: 140,
          height: 40
        },
        {
          id: 'checkExternalCoolingEquipment',
          title: '外冷设备间检查',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['checkEquipment'],
          width: 140,
          height: 40
        },
        {
          id: 'checkValveHall',
          title: '阀厅检查',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['checkEquipment'],
          width: 140,
          height: 40
        },
        {
          id: 'summary',
          title: '现场情况汇总',
          type: NodeType.Default,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: [
            'checkCoolingEquipment',
            'checkExternalCoolingEquipment',
            'checkValveHall'
          ],
          width: 120,
          height: 40
        },
        {
          id: 'analysis',
          title: '综合分析',
          type: NodeType.Default,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['summary'],
          width: 120,
          height: 40
        },
        {
          id: 'analysis1',
          title:
            '单一阀进水温度传感器测量数值异常，其余阀门进水温度传感器显示温度在正常范围内，且无出阀温度高告警，外冷相关设备运行正常',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['analysis'],
          isSingleSuccess: true,
          width: 210,
          height: 220
        },
        {
          id: 'analysis2',
          title:
            '若三个阀进水温度传感器均故障（断线、失灵等情况），值长立即安排人员检查该阀组外冷冷却塔风机是否全部启动并在工频状态下运行，同事密切监视阀进、出水温度、阀厅测量数据等信息。',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['analysis'],
          isSingleSuccess: true,
          width: 210,
          height: 220
        },
        {
          id: 'analysis3',
          title:
            '发现两个及以上阀进水温度传感器测量数值异常，且阀出水温度接近温度高告警或已经出现温度高告警',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['analysis'],
          isSingleSuccess: true,
          width: 210,
          height: 220
        },
        {
          id: 'analysis4',
          title:
            '若现场检查发现外冷风机未全部启动，则根据进阀温度值核实是否有未及时启动的风机，若发现有风机为正常启动，现场查明未启动原因后及时将风机启动，若无法排除故障，则准备启动喷淋泵查看备用喷淋泵是否自动启动，若未自动启动，立即在外冷控制面板手动启动备用喷淋泵',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['analysis'],
          isSingleSuccess: true,
          width: 210,
          height: 220
        },
        {
          id: 'analysis5',
          title:
            '若现场检查发现外冷冷却塔风机故障，检查其电源和外部结构是否存在异常，若具备继续运行条件，立即恢复其运行，若不具备继续运行条件，立即启动其余冗余风机，直至阀进水温度不在持续上升；',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['analysis'],
          isSingleSuccess: true,
          width: 210,
          height: 220
        },
        {
          id: 'analysis6',
          title:
            '若现场检查发现缓冲水池液位低或已经无水，立即通知检修人员检查外冷水回路是否有水处理设备故障，必要时切至备用设备运行，优先保证内冷系统能够得到有效降温。',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['analysis'],
          isSingleSuccess: true,
          width: 210,
          height: 220
        },
        {
          id: 'reviewReport',
          title: '复核后汇报',
          type: NodeType.Default,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: [
            'analysis1',
            'analysis2',
            'analysis3',
            'analysis4',
            'analysis5',
            'analysis6'
          ],
          width: 160,
          height: 40
        },
        {
          id: 'station',
          title: '站部',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['reviewReport'],
          width: 120,
          height: 40
        },
        {
          id: 'province',
          title: '省调',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['reviewReport'],
          width: 120,
          height: 40
        },
        {
          id: 'network',
          title: '网调',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['reviewReport'],
          width: 120,
          height: 40
        },
        {
          id: 'country',
          title: '国调',
          type: NodeType.Select,
          checked: false,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['reviewReport'],
          width: 120,
          height: 40
        },
        {
          id: 'end',
          title: '结束',
          type: NodeType.Default,
          status: NodeStatus.Default,
          active: false,
          parentNodeIds: ['station', 'province', 'network', 'country'],
          width: 120,
          height: 40
        }
      ]
    }
  }
}

export const workflowApi = new WorkflowApi()
