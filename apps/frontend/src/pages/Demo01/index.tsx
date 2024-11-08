import React, { FC, useState } from 'react'

import Header from '../../components/Header'
import Tab from '../../components/Tab'
import { NAVDATA, SUBNAVDATA } from '../../components/Tab/const'
import WorkFlow1 from '../../components/WorkFlow1'
import WorkFlow2 from '../../components/WorkFlow2'
import WorkFlow3 from '../../components/WorkFlow3'
import WorkFlow4 from '../../components/WorkFlow4'
import WorkFlow5 from '../../components/WorkFlow5'
import { TabItem } from '../../interface/tabItem'
import styles from './index.module.css'

export const Demo01Page = () => {
  const [currentTab, setCurrentTab] = useState<string>(NAVDATA[0].key)

  const changeTab = (v: TabItem) => {
    setCurrentTab(v.key)
  }

  const renderWorkflow = () => {
    switch (currentTab) {
      case NAVDATA[0].key:
        return <WorkFlow1 />
      case NAVDATA[1].key:
        return <WorkFlow2 />
      case NAVDATA[2].key:
        return <WorkFlow3 />
      case SUBNAVDATA[0].key:
        return <WorkFlow4 />
      case SUBNAVDATA[1].key:
        return <WorkFlow5 />
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrap}>
        <Tab changeTab={changeTab} currentTab={currentTab}></Tab>
        <div className={styles.content}>{renderWorkflow()}</div>
      </div>
    </div>
  )
}
