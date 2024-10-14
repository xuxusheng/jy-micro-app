import Styles from './index.module.css'
import { Node, NodeType } from '../../../interface/node'
import React, { useState } from 'react'
import { Checkbox, Popover } from 'antd'

const CustomNode = ({ data }: { data: Node }) => {
  const [isDoned, setIsDoned] = useState(false)

  if (data.type === NodeType.Popover) {
    return (
      <Popover
        content={
          <div>
            <Checkbox
              checked={isDoned}
              onChange={(e) => setIsDoned(e.target.checked)}
            >
              已完成
            </Checkbox>
          </div>
        }
        title={data.text}
        trigger={'click'}
      >
        <div
          className={Styles.container + ' ' + Styles[data.type]}
          style={{
            width: data.width + 'px',
            height: data.height + 'px'
          }}
        >
          <div className={Styles.icon + ' ' + Styles[data.status]}></div>
          <div className={Styles.label}>{data.title}</div>
        </div>
      </Popover>
    )
  }

  if (data.type === NodeType.Text) {
    return (
      <Popover
        content={<p style={{ maxWidth: '300px' }}>{data.text}</p>}
        trigger={'click'}
        open={true}
        placement={'right'}
        style={{ maxWidth: '200px' }}
        arrow={false}
      >
        <div
          className={Styles.container + ' ' + Styles[data.type]}
          style={{
            width: data.width + 'px',
            height: data.height + 'px'
          }}
        >
          <div className={Styles.icon + ' ' + Styles[data.status]}></div>
          <div className={Styles.label}>{data.title}</div>
        </div>
      </Popover>
    )
  }

  return (
    <div
      className={Styles.container + ' ' + Styles[data.type]}
      style={{
        width: data.width + 'px',
        height: data.height + 'px'
      }}
    >
      <div className={Styles.icon + ' ' + Styles[data.status]}></div>
      <div className={Styles.label}>{data.title}</div>
    </div>
  )
}

export default CustomNode
