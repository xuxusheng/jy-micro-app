import { Alert, Checkbox } from 'antd'
import React from 'react'

import { FlowNode } from '../../../interface/flowNode'
import Styles from './index.module.css'

const CustomNode = ({ data }: { data: FlowNode }) => {
  const isStart = !data?.parentNodeIds?.length
  const isEnd = !data?.childrenNodeIds?.length

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
      {!isStart && !isEnd && (
        <Checkbox
          checked={data.checked}
          style={{ height: '24px', width: '24px' }}
        ></Checkbox>
      )}
      <div className={Styles.label}>{data.title}</div>
      {data.text && (
        <div className={Styles.popoverText}>
          <Alert message={data.text} type="warning" />
        </div>
      )}
    </div>
  )
}

export default CustomNode
