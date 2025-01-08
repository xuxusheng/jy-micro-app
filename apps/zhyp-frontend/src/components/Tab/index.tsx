import { type TabItem } from '../../interface/tabItem'
import CornersTab from '../CornersTab'
import PolygonTab from '../PolygonTab'
import { NavData } from './const'
import styles from './index.module.scss'

const Tab = ({
  changeTab,
  currentTab
}: {
  changeTab: (v: TabItem) => void
  currentTab: string
}) => {
  const subNavData = NavData.find((v) => {
    if (v.children.length) {
      return v?.children?.map((v) => v.key)?.includes(currentTab)
    }
    return v.key === currentTab
  })

  return (
    <>
      <div className={styles.tabWrap}>
        {NavData.map((v) => (
          <CornersTab
            currentTab={currentTab}
            item={v}
            key={v.key}
            onClick={changeTab}
          ></CornersTab>
        ))}
      </div>

      {!!subNavData?.children?.length && (
        <div className={styles.subTabWrap}>
          {subNavData?.children.map((v) => {
            return (
              <PolygonTab
                currentTab={currentTab}
                item={v}
                key={v.key}
                onClick={changeTab}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Tab
