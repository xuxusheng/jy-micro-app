import Styles from './index.module.css'
import { Node } from '../../../interface/node'
import React from 'react'

const CustomNode = ({ data }: { data: Node }) => {
  return (
    <div className={Styles.container + ' ' + Styles[data.type]}>
      <div className={Styles.icon + ' ' + Styles[data.status]}></div>
      <div className={Styles.label}>{data.title}</div>
    </div>
  )
}

export default CustomNode
