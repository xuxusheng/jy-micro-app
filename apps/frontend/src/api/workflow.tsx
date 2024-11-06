import { ReactElement } from 'react'

import { NodeStatus, NodeType, Workflow } from '../interface/flowNode'

class WorkflowApi {
  demo01 = (): Workflow => {
    return {
      name: '工作流 01',
      nodes: [
        {
          active: true,
          checked: false,
          height: 40,
          id: 'ccp',
          parentNodeIds: [],
          status: NodeStatus.Default,
          title: 'CCP 阀冷却水进阀温度高告警',
          type: NodeType.Default,
          width: 300
        },
        {
          active: true,
          checked: false,
          height: 40,
          id: 'note',
          parentNodeIds: ['ccp'],
          status: NodeStatus.Default,
          text: '处理过程中监盘人员密切监视阀冷系统运行情况（阀出水温度、阀进水温度、外冷喷淋泵、冷却塔风机状态），若阀进水温度持续上升，值长立即将阀冷系统运行情况及处理情况汇报站部及公司领导、调度，经同意后向国调申请降低直流系统功率。',
          title: '注意事项',
          type: NodeType.Text,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'report',
          parentNodeIds: ['note'],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版:
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场正在进行详细检查，有关情况随后再汇报，收到请回复。
            </div>
          ),
          title: '汇报',
          type: NodeType.Text,
          width: 80
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportStation',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportScheduling',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报调度',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'monitorClosely',
          parentNodeIds: ['reportStation', 'reportScheduling'],
          status: NodeStatus.Default,
          text: (
            <div>
              需密切监视
              <span>
                阀进水温度、阀出水温度、冷却水流量、阀厅红外测温测量数据
              </span>
              等重要信息
            </div>
          ) as ReactElement,
          title: '密切监视',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'dataComparison',
          parentNodeIds: ['monitorClosely'],
          status: NodeStatus.Default,
          title: '数据对比',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'longitudinalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '纵向对比分析',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'horizontalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '同级阀冷系统横向对比',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkEquipment',
          parentNodeIds: ['longitudinalComparison', 'horizontalComparison'],
          status: NodeStatus.Default,
          title: '检查设备',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '内冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkExternalCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '外冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkValveHall',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '阀厅检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'summary',
          parentNodeIds: [
            'checkCoolingEquipment',
            'checkExternalCoolingEquipment',
            'checkValveHall'
          ],
          status: NodeStatus.Default,
          title: '现场情况汇总',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'analysis',
          parentNodeIds: ['summary'],
          status: NodeStatus.Default,
          title: '综合分析',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis1',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '单一阀进水温度传感器测量数值异常，其余阀门进水温度传感器显示温度在正常范围内，且无出阀温度高告警，外冷相关设备运行正常',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis2',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若三个阀进水温度传感器均故障（断线、失灵等情况），值长立即安排人员检查该阀组外冷冷却塔风机是否全部启动并在工频状态下运行，同事密切监视阀进、出水温度、阀厅测量数据等信息。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis3',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '发现两个及以上阀进水温度传感器测量数值异常，且阀出水温度接近温度高告警或已经出现温度高告警',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis4',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷风机未全部启动，则根据进阀温度值核实是否有未及时启动的风机，若发现有风机为正常启动，现场查明未启动原因后及时将风机启动，若无法排除故障，则准备启动喷淋泵查看备用喷淋泵是否自动启动，若未自动启动，立即在外冷控制面板手动启动备用喷淋泵',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis5',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷冷却塔风机故障，检查其电源和外部结构是否存在异常，若具备继续运行条件，立即恢复其运行，若不具备继续运行条件，立即启动其余冗余风机，直至阀进水温度不在持续上升；',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis6',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现缓冲水池液位低或已经无水，立即通知检修人员检查外冷水回路是否有水处理设备故障，必要时切至备用设备运行，优先保证内冷系统能够得到有效降温。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reviewReport',
          parentNodeIds: [
            'analysis1',
            'analysis2',
            'analysis3',
            'analysis4',
            'analysis5',
            'analysis6'
          ],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版如下：
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场检查为****（初步检查结果），处置措施为*****（现场采取的措施）有关情况随后再汇报，收到请回复。（15min）
            </div>
          ),
          title: '复核后汇报',
          type: NodeType.Text,
          width: 160
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'station',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'province',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '省调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'network',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '网调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'country',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '国调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'end',
          parentNodeIds: ['station', 'province', 'network', 'country'],
          status: NodeStatus.Default,
          title: '结束',
          type: NodeType.Default,
          width: 120
        }
      ]
    }
  }
  demo02 = (): Workflow => {
    return {
      name: '工作流 02',
      nodes: [
        {
          active: true,
          checked: false,
          height: 40,
          id: 'ccp',
          parentNodeIds: [],
          status: NodeStatus.Default,
          title: 'CCP 阀冷却水进阀温度高告警2',
          type: NodeType.Default,
          width: 300
        },
        {
          active: true,
          checked: false,
          height: 40,
          id: 'note',
          parentNodeIds: ['ccp'],
          status: NodeStatus.Default,
          text: '处理过程中监盘人员密切监视阀冷系统运行情况（阀出水温度、阀进水温度、外冷喷淋泵、冷却塔风机状态），若阀进水温度持续上升，值长立即将阀冷系统运行情况及处理情况汇报站部及公司领导、调度，经同意后向国调申请降低直流系统功率。',
          title: '注意事项',
          type: NodeType.Text,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'report',
          parentNodeIds: ['note'],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版:
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场正在进行详细检查，有关情况随后再汇报，收到请回复。
            </div>
          ),
          title: '汇报',
          type: NodeType.Text,
          width: 80
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportStation',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportScheduling',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报调度',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'monitorClosely',
          parentNodeIds: ['reportStation', 'reportScheduling'],
          status: NodeStatus.Default,
          text: (
            <div>
              需密切监视
              <span>
                阀进水温度、阀出水温度、冷却水流量、阀厅红外测温测量数据
              </span>
              等重要信息
            </div>
          ) as ReactElement,
          title: '密切监视',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'dataComparison',
          parentNodeIds: ['monitorClosely'],
          status: NodeStatus.Default,
          title: '数据对比',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'longitudinalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '纵向对比分析',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'horizontalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '同级阀冷系统横向对比',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkEquipment',
          parentNodeIds: ['longitudinalComparison', 'horizontalComparison'],
          status: NodeStatus.Default,
          title: '检查设备',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '内冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkExternalCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '外冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkValveHall',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '阀厅检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'summary',
          parentNodeIds: [
            'checkCoolingEquipment',
            'checkExternalCoolingEquipment',
            'checkValveHall'
          ],
          status: NodeStatus.Default,
          title: '现场情况汇总',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'analysis',
          parentNodeIds: ['summary'],
          status: NodeStatus.Default,
          title: '综合分析',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis1',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '单一阀进水温度传感器测量数值异常，其余阀门进水温度传感器显示温度在正常范围内，且无出阀温度高告警，外冷相关设备运行正常',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis2',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若三个阀进水温度传感器均故障（断线、失灵等情况），值长立即安排人员检查该阀组外冷冷却塔风机是否全部启动并在工频状态下运行，同事密切监视阀进、出水温度、阀厅测量数据等信息。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis3',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '发现两个及以上阀进水温度传感器测量数值异常，且阀出水温度接近温度高告警或已经出现温度高告警',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis4',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷风机未全部启动，则根据进阀温度值核实是否有未及时启动的风机，若发现有风机为正常启动，现场查明未启动原因后及时将风机启动，若无法排除故障，则准备启动喷淋泵查看备用喷淋泵是否自动启动，若未自动启动，立即在外冷控制面板手动启动备用喷淋泵',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis5',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷冷却塔风机故障，检查其电源和外部结构是否存在异常，若具备继续运行条件，立即恢复其运行，若不具备继续运行条件，立即启动其余冗余风机，直至阀进水温度不在持续上升；',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis6',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现缓冲水池液位低或已经无水，立即通知检修人员检查外冷水回路是否有水处理设备故障，必要时切至备用设备运行，优先保证内冷系统能够得到有效降温。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reviewReport',
          parentNodeIds: [
            'analysis1',
            'analysis2',
            'analysis3',
            'analysis4',
            'analysis5',
            'analysis6'
          ],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版如下：
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场检查为****（初步检查结果），处置措施为*****（现场采取的措施）有关情况随后再汇报，收到请回复。（15min）
            </div>
          ),
          title: '复核后汇报',
          type: NodeType.Text,
          width: 160
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'station',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'province',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '省调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'network',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '网调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'country',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '国调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'end',
          parentNodeIds: ['station', 'province', 'network', 'country'],
          status: NodeStatus.Default,
          title: '结束',
          type: NodeType.Default,
          width: 120
        }
      ]
    }
  }
  demo03 = (): Workflow => {
    return {
      name: '工作流 03',
      nodes: [
        {
          active: true,
          checked: false,
          height: 40,
          id: 'ccp',
          parentNodeIds: [],
          status: NodeStatus.Default,
          title: 'CCP 阀冷却水进阀温度高告警3',
          type: NodeType.Default,
          width: 300
        },
        {
          active: true,
          checked: false,
          height: 40,
          id: 'note',
          parentNodeIds: ['ccp'],
          status: NodeStatus.Default,
          text: '处理过程中监盘人员密切监视阀冷系统运行情况（阀出水温度、阀进水温度、外冷喷淋泵、冷却塔风机状态），若阀进水温度持续上升，值长立即将阀冷系统运行情况及处理情况汇报站部及公司领导、调度，经同意后向国调申请降低直流系统功率。',
          title: '注意事项',
          type: NodeType.Text,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'report',
          parentNodeIds: ['note'],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版:
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场正在进行详细检查，有关情况随后再汇报，收到请回复。
            </div>
          ),
          title: '汇报',
          type: NodeType.Text,
          width: 80
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportStation',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportScheduling',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报调度',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'monitorClosely',
          parentNodeIds: ['reportStation', 'reportScheduling'],
          status: NodeStatus.Default,
          text: (
            <div>
              需密切监视
              <span>
                阀进水温度、阀出水温度、冷却水流量、阀厅红外测温测量数据
              </span>
              等重要信息
            </div>
          ) as ReactElement,
          title: '密切监视',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'dataComparison',
          parentNodeIds: ['monitorClosely'],
          status: NodeStatus.Default,
          title: '数据对比',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'longitudinalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '纵向对比分析',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'horizontalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '同级阀冷系统横向对比',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkEquipment',
          parentNodeIds: ['longitudinalComparison', 'horizontalComparison'],
          status: NodeStatus.Default,
          title: '检查设备',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '内冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkExternalCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '外冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkValveHall',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '阀厅检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'summary',
          parentNodeIds: [
            'checkCoolingEquipment',
            'checkExternalCoolingEquipment',
            'checkValveHall'
          ],
          status: NodeStatus.Default,
          title: '现场情况汇总',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'analysis',
          parentNodeIds: ['summary'],
          status: NodeStatus.Default,
          title: '综合分析',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis1',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '单一阀进水温度传感器测量数值异常，其余阀门进水温度传感器显示温度在正常范围内，且无出阀温度高告警，外冷相关设备运行正常',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis2',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若三个阀进水温度传感器均故障（断线、失灵等情况），值长立即安排人员检查该阀组外冷冷却塔风机是否全部启动并在工频状态下运行，同事密切监视阀进、出水温度、阀厅测量数据等信息。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis3',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '发现两个及以上阀进水温度传感器测量数值异常，且阀出水温度接近温度高告警或已经出现温度高告警',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis4',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷风机未全部启动，则根据进阀温度值核实是否有未及时启动的风机，若发现有风机为正常启动，现场查明未启动原因后及时将风机启动，若无法排除故障，则准备启动喷淋泵查看备用喷淋泵是否自动启动，若未自动启动，立即在外冷控制面板手动启动备用喷淋泵',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis5',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷冷却塔风机故障，检查其电源和外部结构是否存在异常，若具备继续运行条件，立即恢复其运行，若不具备继续运行条件，立即启动其余冗余风机，直至阀进水温度不在持续上升；',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis6',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现缓冲水池液位低或已经无水，立即通知检修人员检查外冷水回路是否有水处理设备故障，必要时切至备用设备运行，优先保证内冷系统能够得到有效降温。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reviewReport',
          parentNodeIds: [
            'analysis1',
            'analysis2',
            'analysis3',
            'analysis4',
            'analysis5',
            'analysis6'
          ],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版如下：
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场检查为****（初步检查结果），处置措施为*****（现场采取的措施）有关情况随后再汇报，收到请回复。（15min）
            </div>
          ),
          title: '复核后汇报',
          type: NodeType.Text,
          width: 160
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'station',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'province',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '省调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'network',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '网调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'country',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '国调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'end',
          parentNodeIds: ['station', 'province', 'network', 'country'],
          status: NodeStatus.Default,
          title: '结束',
          type: NodeType.Default,
          width: 120
        }
      ]
    }
  }
  demo04 = (): Workflow => {
    return {
      name: '工作流 04',
      nodes: [
        {
          active: true,
          checked: false,
          height: 40,
          id: 'ccp',
          parentNodeIds: [],
          status: NodeStatus.Default,
          title: 'CCP 阀冷却水进阀温度高告警4',
          type: NodeType.Default,
          width: 300
        },
        {
          active: true,
          checked: false,
          height: 40,
          id: 'note',
          parentNodeIds: ['ccp'],
          status: NodeStatus.Default,
          text: '处理过程中监盘人员密切监视阀冷系统运行情况（阀出水温度、阀进水温度、外冷喷淋泵、冷却塔风机状态），若阀进水温度持续上升，值长立即将阀冷系统运行情况及处理情况汇报站部及公司领导、调度，经同意后向国调申请降低直流系统功率。',
          title: '注意事项',
          type: NodeType.Text,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'report',
          parentNodeIds: ['note'],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版:
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场正在进行详细检查，有关情况随后再汇报，收到请回复。
            </div>
          ),
          title: '汇报',
          type: NodeType.Text,
          width: 80
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportStation',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportScheduling',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报调度',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'monitorClosely',
          parentNodeIds: ['reportStation', 'reportScheduling'],
          status: NodeStatus.Default,
          text: (
            <div>
              需密切监视
              <span>
                阀进水温度、阀出水温度、冷却水流量、阀厅红外测温测量数据
              </span>
              等重要信息
            </div>
          ) as ReactElement,
          title: '密切监视',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'dataComparison',
          parentNodeIds: ['monitorClosely'],
          status: NodeStatus.Default,
          title: '数据对比',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'longitudinalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '纵向对比分析',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'horizontalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '同级阀冷系统横向对比',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkEquipment',
          parentNodeIds: ['longitudinalComparison', 'horizontalComparison'],
          status: NodeStatus.Default,
          title: '检查设备',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '内冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkExternalCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '外冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkValveHall',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '阀厅检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'summary',
          parentNodeIds: [
            'checkCoolingEquipment',
            'checkExternalCoolingEquipment',
            'checkValveHall'
          ],
          status: NodeStatus.Default,
          title: '现场情况汇总',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'analysis',
          parentNodeIds: ['summary'],
          status: NodeStatus.Default,
          title: '综合分析',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis1',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '单一阀进水温度传感器测量数值异常，其余阀门进水温度传感器显示温度在正常范围内，且无出阀温度高告警，外冷相关设备运行正常',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis2',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若三个阀进水温度传感器均故障（断线、失灵等情况），值长立即安排人员检查该阀组外冷冷却塔风机是否全部启动并在工频状态下运行，同事密切监视阀进、出水温度、阀厅测量数据等信息。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis3',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '发现两个及以上阀进水温度传感器测量数值异常，且阀出水温度接近温度高告警或已经出现温度高告警',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis4',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷风机未全部启动，则根据进阀温度值核实是否有未及时启动的风机，若发现有风机为正常启动，现场查明未启动原因后及时将风机启动，若无法排除故障，则准备启动喷淋泵查看备用喷淋泵是否自动启动，若未自动启动，立即在外冷控制面板手动启动备用喷淋泵',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis5',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷冷却塔风机故障，检查其电源和外部结构是否存在异常，若具备继续运行条件，立即恢复其运行，若不具备继续运行条件，立即启动其余冗余风机，直至阀进水温度不在持续上升；',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis6',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现缓冲水池液位低或已经无水，立即通知检修人员检查外冷水回路是否有水处理设备故障，必要时切至备用设备运行，优先保证内冷系统能够得到有效降温。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reviewReport',
          parentNodeIds: [
            'analysis1',
            'analysis2',
            'analysis3',
            'analysis4',
            'analysis5',
            'analysis6'
          ],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版如下：
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场检查为****（初步检查结果），处置措施为*****（现场采取的措施）有关情况随后再汇报，收到请回复。（15min）
            </div>
          ),
          title: '复核后汇报',
          type: NodeType.Text,
          width: 160
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'station',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'province',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '省调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'network',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '网调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'country',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '国调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'end',
          parentNodeIds: ['station', 'province', 'network', 'country'],
          status: NodeStatus.Default,
          title: '结束',
          type: NodeType.Default,
          width: 120
        }
      ]
    }
  }
  demo05 = (): Workflow => {
    return {
      name: '工作流 05',
      nodes: [
        {
          active: true,
          checked: false,
          height: 40,
          id: 'ccp',
          parentNodeIds: [],
          status: NodeStatus.Default,
          title: 'CCP 阀冷却水进阀温度高告警5',
          type: NodeType.Default,
          width: 300
        },
        {
          active: true,
          checked: false,
          height: 40,
          id: 'note',
          parentNodeIds: ['ccp'],
          status: NodeStatus.Default,
          text: '处理过程中监盘人员密切监视阀冷系统运行情况（阀出水温度、阀进水温度、外冷喷淋泵、冷却塔风机状态），若阀进水温度持续上升，值长立即将阀冷系统运行情况及处理情况汇报站部及公司领导、调度，经同意后向国调申请降低直流系统功率。',
          title: '注意事项',
          type: NodeType.Text,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'report',
          parentNodeIds: ['note'],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版:
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场正在进行详细检查，有关情况随后再汇报，收到请回复。
            </div>
          ),
          title: '汇报',
          type: NodeType.Text,
          width: 80
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportStation',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reportScheduling',
          parentNodeIds: ['report'],
          status: NodeStatus.Default,
          title: '汇报调度',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'monitorClosely',
          parentNodeIds: ['reportStation', 'reportScheduling'],
          status: NodeStatus.Default,
          text: (
            <div>
              需密切监视
              <span>
                阀进水温度、阀出水温度、冷却水流量、阀厅红外测温测量数据
              </span>
              等重要信息
            </div>
          ) as ReactElement,
          title: '密切监视',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'dataComparison',
          parentNodeIds: ['monitorClosely'],
          status: NodeStatus.Default,
          title: '数据对比',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'longitudinalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '纵向对比分析',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'horizontalComparison',
          parentNodeIds: ['dataComparison'],
          status: NodeStatus.Default,
          title: '同级阀冷系统横向对比',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkEquipment',
          parentNodeIds: ['longitudinalComparison', 'horizontalComparison'],
          status: NodeStatus.Default,
          title: '检查设备',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '内冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkExternalCoolingEquipment',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '外冷设备间检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'checkValveHall',
          parentNodeIds: ['checkEquipment'],
          status: NodeStatus.Default,
          title: '阀厅检查',
          type: NodeType.Select,
          width: 140
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'summary',
          parentNodeIds: [
            'checkCoolingEquipment',
            'checkExternalCoolingEquipment',
            'checkValveHall'
          ],
          status: NodeStatus.Default,
          title: '现场情况汇总',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'analysis',
          parentNodeIds: ['summary'],
          status: NodeStatus.Default,
          title: '综合分析',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis1',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '单一阀进水温度传感器测量数值异常，其余阀门进水温度传感器显示温度在正常范围内，且无出阀温度高告警，外冷相关设备运行正常',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis2',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若三个阀进水温度传感器均故障（断线、失灵等情况），值长立即安排人员检查该阀组外冷冷却塔风机是否全部启动并在工频状态下运行，同事密切监视阀进、出水温度、阀厅测量数据等信息。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis3',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '发现两个及以上阀进水温度传感器测量数值异常，且阀出水温度接近温度高告警或已经出现温度高告警',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis4',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷风机未全部启动，则根据进阀温度值核实是否有未及时启动的风机，若发现有风机为正常启动，现场查明未启动原因后及时将风机启动，若无法排除故障，则准备启动喷淋泵查看备用喷淋泵是否自动启动，若未自动启动，立即在外冷控制面板手动启动备用喷淋泵',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis5',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现外冷冷却塔风机故障，检查其电源和外部结构是否存在异常，若具备继续运行条件，立即恢复其运行，若不具备继续运行条件，立即启动其余冗余风机，直至阀进水温度不在持续上升；',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 220,
          id: 'analysis6',
          isSingleSuccess: true,
          parentNodeIds: ['analysis'],
          status: NodeStatus.Default,
          title:
            '若现场检查发现缓冲水池液位低或已经无水，立即通知检修人员检查外冷水回路是否有水处理设备故障，必要时切至备用设备运行，优先保证内冷系统能够得到有效降温。',
          type: NodeType.Select,
          width: 210
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'reviewReport',
          parentNodeIds: [
            'analysis1',
            'analysis2',
            'analysis3',
            'analysis4',
            'analysis5',
            'analysis6'
          ],
          status: NodeStatus.Default,
          text: (
            <div>
              汇报模版如下：
              <br />
              你好，韶山站汇报，×月×日×时×分，韶山站阀水冷系统发进阀温度高报警，当前输送功率××MW，现场天气××。现场检查为****（初步检查结果），处置措施为*****（现场采取的措施）有关情况随后再汇报，收到请回复。（15min）
            </div>
          ),
          title: '复核后汇报',
          type: NodeType.Text,
          width: 160
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'station',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '站部',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'province',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '省调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'network',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '网调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'country',
          parentNodeIds: ['reviewReport'],
          status: NodeStatus.Default,
          title: '国调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: 'end',
          parentNodeIds: ['station', 'province', 'network', 'country'],
          status: NodeStatus.Default,
          title: '结束',
          type: NodeType.Default,
          width: 120
        }
      ]
    }
  }
}

export const workflowApi = new WorkflowApi()
