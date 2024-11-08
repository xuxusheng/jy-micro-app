import { type TabItem } from '../../interface/tabItem'
import CornersTab from '../CornersTab'
import PolygonTab from '../PolygonTab'
import { NAVDATA, SUBNAVDATA } from './const'
import styles from './index.module.scss'

const Tab = ({
  changeTab,
  currentTab
}: {
  changeTab: (v: TabItem) => void
  currentTab: string
}) => {
  return (
    <>
      <div className={styles.tabWrap}>
        {NAVDATA.map((v) => (
          <CornersTab
            currentTab={currentTab}
            item={v}
            key={v.key}
            onClick={changeTab}
          ></CornersTab>
        ))}
      </div>

      <div className={styles.subTabWrap}>
        {SUBNAVDATA.map((v) => (
          <PolygonTab
            currentTab={currentTab}
            item={v}
            key={v.key}
            onClick={changeTab}
          />
        ))}
      </div>
    </>
  )
}

export default Tab
