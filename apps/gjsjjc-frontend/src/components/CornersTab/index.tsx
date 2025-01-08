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
  const childKey = item.children?.map((v) => v.key) || []

  return (
    <div
      className={
        styles.tabBorderBox +
        ' ' +
        ([item.key, ...childKey].includes(currentTab) ? styles.active : '')
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
