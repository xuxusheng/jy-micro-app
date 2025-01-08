import React, { useState } from 'react'

import Header from '../../components/Header'
import Tab from '../../components/Tab'
import { NavData } from '../../components/Tab/const'
import { TabItem } from '../../interface/tabItem'
import styles from './index.module.css'

export const WorkflowPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(
    NavData[0].children?.length ? NavData[0].children[0].key : NavData[0].key
  )

  const changeTab = (v: TabItem) => {
    if (v.children?.length) {
      setCurrentTab(v.children[0].key)
      return
    }
    setCurrentTab(v.key)
  }

  const renderWorkflow = () => {
    const currentItem = NavData.find((v) => {
      if (v.children.length) {
        return v.children.map((v) => v.key).includes(currentTab)
      }
      return v.key === currentTab
    })

    return currentItem?.children?.[0].component
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
