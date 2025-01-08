import { ReactElement } from 'react'

import { NodeStatus, NodeType, Workflow } from '../interface/flowNode'

class WorkflowApi {
  demo01 = (): Workflow => {
    return {
      name: 'CCP阀冷却水进阀温度高告警',
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
      name: '直流线路故障',
      nodes: [
        {
          active: true,
          checked: false,
          height: 40,
          id: '1',
          parentNodeIds: [],
          status: NodeStatus.Default,
          title: '事件特征复核',
          type: NodeType.Default,
          width: 160
        },
        {
          active: true,
          checked: false,
          height: 80,
          id: '2',
          parentNodeIds: ['1'],
          status: NodeStatus.Default,
          title:
            '大组滤波器失灵保护动作，母线差动保护动作，故障录波启动，进线开关跳闸锁定，小组滤波器开关跳闸锁定，小组滤波器投入，绝对最小滤波器条件不满足，功率回降，调相机停电（二、四大组交流滤波器跳闸时）。',
          type: NodeType.Default,
          width: 600
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '3',
          parentNodeIds: ['2'],
          status: NodeStatus.Default,
          title: '交流滤波器大组保护动作确认',
          type: NodeType.Default,
          width: 220
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '4',
          parentNodeIds: ['3'],
          status: NodeStatus.Default,
          title: '汇报',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '5-1',
          parentNodeIds: ['4'],
          status: NodeStatus.Default,
          title: '汇报站部领导',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '5-2',
          parentNodeIds: ['4'],
          status: NodeStatus.Default,
          title: '汇报国调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '6',
          parentNodeIds: ['5-1', '5-2'],
          status: NodeStatus.Default,
          title: '检查备用交流滤波器是否正常投入',
          type: NodeType.Default,
          width: 260
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '7',
          parentNodeIds: ['6'],
          status: NodeStatus.Default,
          title: '检查直流系统是否有功率回降',
          type: NodeType.Default,
          width: 240
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '8-1',
          parentNodeIds: ['7'],
          status: NodeStatus.Default,
          title: '检查直流系统功率',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '8-2',
          parentNodeIds: ['7'],
          status: NodeStatus.Default,
          title: '检查交流母线电压',
          type: NodeType.Select,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '9',
          parentNodeIds: ['8-1', '8-2'],
          status: NodeStatus.Default,
          title: '检查保护范围内设备动作情况',
          type: NodeType.Default,
          width: 300
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '10',
          parentNodeIds: ['9'],
          status: NodeStatus.Default,
          title: '现场复核保护范围内设备（含调相机）',
          type: NodeType.Default,
          width: 300
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '11',
          parentNodeIds: ['10'],
          status: NodeStatus.Default,
          title: '告知检修对二次回路和保护动作原因进行检查分析',
          type: NodeType.Default,
          width: 360
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '12',
          parentNodeIds: ['11'],
          status: NodeStatus.Default,
          title: '整理故障录波、事件记录，并传真至相关调度和部门',
          type: NodeType.Default,
          width: 360
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '13',
          parentNodeIds: ['12'],
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
      name: '滤波器大组保护动作',
      nodes: [
        {
          active: true,
          checked: false,
          height: 40,
          id: '1',
          parentNodeIds: [],
          status: NodeStatus.Default,
          title: '事件特征复核',
          type: NodeType.Default,
          width: 160
        },
        {
          active: true,
          checked: false,
          height: 40,
          id: '2',
          parentNodeIds: ['1'],
          status: NodeStatus.Default,
          title: '接地极在线监控系统报“高压10kV失电”报警，并发出报警铃声。',
          type: NodeType.Default,
          width: 450
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '3',
          parentNodeIds: ['2'],
          status: NodeStatus.Default,
          title: '立即询问益阳公司，确认10kV茈张线注南公路分支线已停电',
          type: NodeType.Default,
          width: 450
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '4',
          parentNodeIds: ['3'],
          status: NodeStatus.Default,
          title: '汇报',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '5-1',
          parentNodeIds: ['4'],
          status: NodeStatus.Default,
          title: '汇报站部领导',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '5-2',
          parentNodeIds: ['4'],
          status: NodeStatus.Default,
          title: '汇报国调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 60,
          id: '6',
          parentNodeIds: ['5-1', '5-2'],
          status: NodeStatus.Default,
          title:
            '在确认10kV茈张线注南公路分支线短时（2小时）不能恢复送电时，通知益阳公司，请求提供应急电源车，并组织人员前往接地极应急',
          type: NodeType.Default,
          width: 600
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '7',
          parentNodeIds: ['6'],
          status: NodeStatus.Default,
          title: '确认接地极配电系统恢复前设备状态',
          type: NodeType.Default,
          width: 340
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '8',
          parentNodeIds: ['7'],
          status: NodeStatus.Default,
          title: '接地极配电系统恢复处置',
          type: NodeType.Default,
          width: 200
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '9',
          parentNodeIds: ['8'],
          status: NodeStatus.Default,
          title:
            '设备恢复正常后，值班人员应立即向公司应急指挥中心、站部领导汇报',
          type: NodeType.Default,
          width: 520
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '10',
          parentNodeIds: ['9'],
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
      name: '站用电全停',
      nodes: [
        {
          active: true,
          checked: false,
          height: 40,
          id: '1',
          parentNodeIds: [],
          status: NodeStatus.Default,
          title: '事件特征复核',
          type: NodeType.Default,
          width: 160
        },
        {
          active: true,
          checked: false,
          height: 120,
          id: '2',
          parentNodeIds: ['1'],
          status: NodeStatus.Default,
          title:
            '故障极PPR A/B/C三套均发“直流线路 电压突变量保护 动作”、“直流线路 行波保护 动作”；\n' +
            '主用PCP发“向对站发出线路保护动作”，对站发“直流低电压保护动作”，故障极高低端换流器CCP A/B 发“对站发出保护闭锁 执行”，故障极高低端换流器闭锁，过负荷限制器限制电流指令在5294A，高低端换流器对应的旁通开关合闸，故障极退至极隔离状态。',
          type: NodeType.Default,
          width: 600
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '3',
          parentNodeIds: ['2'],
          status: NodeStatus.Default,
          title: '事件特征确认',
          type: NodeType.Default,
          width: 160
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '4',
          parentNodeIds: ['3'],
          status: NodeStatus.Default,
          title: '汇报',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '5-1',
          parentNodeIds: ['4'],
          status: NodeStatus.Default,
          title: '汇报站部领导',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '5-2',
          parentNodeIds: ['4'],
          status: NodeStatus.Default,
          title: '汇报国调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 100,
          id: '6',
          parentNodeIds: ['5-1', '5-2'],
          status: NodeStatus.Default,
          title:
            '现场检查开关、刀闸实际动作情况；现场检查保护屏柜报警信息、故障灯是否点亮等情况；检查线路故障测距屏，确认故障距离；检查稳控装置，确认功率损失情况；检查故障录波装置，确认保护正确动作，直流线路再启动及非故障阀重启情况',
          type: NodeType.Default,
          width: 600
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '7',
          parentNodeIds: ['6'],
          status: NodeStatus.Default,
          title: '检查正常极是否存在过负荷情况',
          type: NodeType.Default,
          width: 340
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '8',
          parentNodeIds: ['7'],
          status: NodeStatus.Default,
          title: '检查直流电压动态策略压板投入情况',
          type: NodeType.Default,
          width: 340
        },
        {
          active: false,
          checked: false,
          height: 60,
          id: '9',
          parentNodeIds: ['8'],
          status: NodeStatus.Default,
          title:
            '实时监视接地极入地电流情况，及时通知中国石化、运检部、省调做好附近设备受直流偏磁影响监视，并在2小时内将接地极入地电流控制在3000A及以内',
          type: NodeType.Default,
          width: 600
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '10',
          parentNodeIds: ['9'],
          status: NodeStatus.Default,
          title:
            '检查故障极站内直流线路、直流场光CT、直流分压器等设备有无明显异常',
          type: NodeType.Default,
          width: 600
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '11',
          parentNodeIds: ['10'],
          status: NodeStatus.Default,
          title: '汇报',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '12',
          parentNodeIds: ['11'],
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
      name: '配电系统外接线路失电',
      nodes: [
        {
          active: true,
          checked: false,
          height: 40,
          id: '1',
          parentNodeIds: [],
          status: NodeStatus.Default,
          title: '事件特征复核',
          type: NodeType.Default,
          width: 160
        },
        {
          active: true,
          checked: false,
          height: 120,
          id: '2',
          parentNodeIds: ['1'],
          status: NodeStatus.Default,
          title:
            'SPC发“10kV IM母线电压低”、“10kV IIM母线电压低”、“10kV IIIM母线电压低”告警，OWS发“31B变压器差动保护动作”、“32B变压器差动保护动作”、“33B变压器差动保护动作”，310、320、330开关跳闸；\n' +
            '四换流器CCP相继发“冷却水流量超低+进阀压力低”动作，双极四换流器闭锁。',
          type: NodeType.Default,
          width: 600
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '3',
          parentNodeIds: ['2'],
          status: NodeStatus.Default,
          title: '复核确认',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '4',
          parentNodeIds: ['3'],
          status: NodeStatus.Default,
          title: '汇报',
          type: NodeType.Default,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '5-1',
          parentNodeIds: ['4'],
          status: NodeStatus.Default,
          title: '汇报站部领导',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 40,
          id: '5-2',
          parentNodeIds: ['4'],
          status: NodeStatus.Default,
          title: '汇报国调',
          type: NodeType.Select,
          width: 120
        },
        {
          active: false,
          checked: false,
          height: 100,
          id: '6',
          parentNodeIds: ['5-1', '5-2'],
          status: NodeStatus.Default,
          title:
            '现场检查开关等设备实际动作情况；现场检查保护屏柜报警信息、故障灯是否点亮等情况；检查稳控装置，确认功率损失情况；检查故障录波装置，确认保护正确动作',
          type: NodeType.Default,
          width: 600
        },
        {
          active: false,
          checked: false,
          height: 120,
          id: '7',
          parentNodeIds: ['6'],
          status: NodeStatus.Default,
          title:
            '（1）立即拉开鹤岭Ⅰ、Ⅱ线、云田Ⅰ、Ⅱ线、古亭Ⅰ、Ⅱ线、船山I线进线开关5011、5012、5021、5022、5041、5042、5043、5062、5063、5071、5072、5082、5083，拉开110kV麦换线进线开关330；\n' +
            '（2）立即拉开站内所有其他处于合闸位置的交流开关，将直流场现场就地手动转至极隔离；\n' +
            '（3）在确认外来电源短时不能恢复时，通知湘潭地调，请求提供应急电源车',
          type: NodeType.Default,
          width: 600
        },
        {
          active: false,
          checked: false,
          height: 120,
          id: '8',
          parentNodeIds: ['7'],
          status: NodeStatus.Default,
          title:
            '（1）站用电系统恢复；\n' +
            '（2）辅助系统恢复；\n' +
            '（3）交直流二次系统恢复；\n' +
            '（4）教质量一次系统恢复',
          type: NodeType.Default,
          width: 300
        },
        {
          active: false,
          checked: false,
          height: 60,
          id: '9',
          parentNodeIds: ['8'],
          status: NodeStatus.Default,
          title:
            '设备恢复正常后，值班人员应立即向公司应急指挥中心、站部领导汇报',
          type: NodeType.Default,
          width: 520
        },

        {
          active: false,
          checked: false,
          height: 40,
          id: '10',
          parentNodeIds: ['9'],
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
