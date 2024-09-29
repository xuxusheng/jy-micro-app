import Styles from './index.module.css'
import { Node } from '../../../interface/node'

const CustomNode = ({
  data,
  onClick
}: {
  data: Node
  onClick?: () => void
}) => {
  return (
    <div
      className={Styles.container + ' ' + Styles[data.status]}
      onClick={onClick}
    >
      <div className={Styles.icon + ' ' + Styles[data.status]}></div>
      <div className={Styles.label}>{data.title}</div>
    </div>
  )
}

export default CustomNode
