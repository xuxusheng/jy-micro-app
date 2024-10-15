import Styles from './index.module.css'
import { Node, NodeType } from '../../../interface/node'
import React from 'react'
import { Alert, Checkbox } from 'antd'
import { WranSvg } from './const'

const CustomNode = ({ data }: { data: Node }) => {
  if (data.type === NodeType.Select) {
    return (
      <div
        className={
          Styles.container +
          ' ' +
          Styles[data.type] +
          ' ' +
          (!data.active ? Styles.disabled : '')
        }
        style={{
          width: data.width + 'px',
          height: data.height + 'px'
        }}
      >
        <Checkbox
          checked={data.checked}
          style={{ width: '24px', height: '24px' }}
        ></Checkbox>
        <div className={Styles.label}>{data.title}</div>
      </div>
    )
  }

  if (data.type === NodeType.Text) {
    return (
      <div
        className={
          Styles.container +
          ' ' +
          Styles[data.type] +
          ' ' +
          (!data.active ? Styles.disabled : '')
        }
        style={{
          width: data.width + 'px',
          height: data.height + 'px'
        }}
      >
        <div className={Styles.icon}>{WranSvg}</div>
        <div className={Styles.label}>{data.title}</div>

        <div className={Styles.popoverText}>
          <Alert message={data.text} type="warning" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={Styles.container + ' ' + (!data.active ? Styles.disabled : '')}
      style={{
        width: data.width + 'px',
        height: data.height + 'px'
      }}
    >
      <div className={Styles.label}>{data.title}</div>
    </div>
  )
}

export default CustomNode
