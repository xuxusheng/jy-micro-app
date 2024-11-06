import { TabItem } from '../../interface/tabItem'
import styles from './index.module.scss'

const CornersTab = ({
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
        styles.tabBorderBox +
        ' ' +
        (currentTab === item.key ? styles.active : '')
      }
      onClick={() => onClick(item)}
    >
      {item.name}
      <div className={styles.tabBorderBoxCorner} />
      <div className={styles.tabBorderBoxCorner} />
      <div className={styles.tabBorderBoxCorner} />
      <div className={styles.tabBorderBoxCorner} />
    </div>
  )
}

export default CornersTab
