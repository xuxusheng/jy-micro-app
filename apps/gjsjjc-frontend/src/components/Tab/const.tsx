import WorkFlow1 from '../WorkFlow1'
import WorkFlow2 from '../WorkFlow2'
import WorkFlow3 from '../WorkFlow3'
import WorkFlow4 from '../WorkFlow4'
import WorkFlow5 from '../WorkFlow5'

export const NavData = [
  {
    children: [
      {
        component: <WorkFlow1 />,
        key: '1-1',
        name: 'CCP阀冷却水进阀温度高告警'
      }
    ],
    key: '1',
    name: '阀冷设备'
  },
  {
    children: [{ component: <WorkFlow4 />, key: '2-1', name: '直流线路故障' }],
    key: '2',
    name: '直流场'
  },
  {
    children: [
      { component: <WorkFlow2 />, key: '3-1', name: '滤波器大组保护动作' }
    ],
    key: '3',
    name: '交流场'
  },
  {
    children: [{ component: <WorkFlow5 />, key: '4-1', name: '站用电全停' }],
    key: '4',
    name: '站用电'
  },
  {
    children: [
      { component: <WorkFlow3 />, key: '5-1', name: '配电系统外接线路失电' }
    ],
    key: '5',
    name: '接地极'
  }
]
