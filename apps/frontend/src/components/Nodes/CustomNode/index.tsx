import { Alert, Checkbox } from 'antd'
import React from 'react'

import { Node, NodeType } from '../../../interface/node'
import { WranSvg } from './const'
import Styles from './index.module.css'

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
          height: data.height + 'px',
          width: data.width + 'px'
        }}
      >
        <Checkbox
          checked={data.checked}
          style={{ height: '24px', width: '24px' }}
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
          height: data.height + 'px',
          width: data.width + 'px'
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
        height: data.height + 'px',
        width: data.width + 'px'
      }}
    >
      <div className={Styles.label}>{data.title}</div>
    </div>
  )
}

export default CustomNode
