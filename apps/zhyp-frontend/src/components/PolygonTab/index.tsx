import { TabItem } from '../../interface/tabItem'
import styles from './index.module.scss'

const PolygonTab = ({
  currentTab,
  item,
  onClick
}: {
  currentTab: string
  item: TabItem
  onClick: (v: TabItem) => void
}) => {
  return (
    <div
      className={
        styles.subTabBorderBoxWrap +
        ' ' +
        (currentTab === item.key ? styles.active : '')
      }
      onClick={() => onClick(item)}
    >
      <div className={styles.subTabBorderBox}>{item.name}</div>
      {new Array(8).fill(0).map((_, i) => (
        <div className={styles['subTabBorderBox' + (i + 1)]}></div>
      ))}
    </div>
  )
}
export default PolygonTab
