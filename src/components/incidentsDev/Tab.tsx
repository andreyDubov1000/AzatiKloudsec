import React, { useState } from 'react'
import styles from './Tab.module.scss'

interface ITabsProps {
  first: any
  second: any
}
const Tabs: React.FC<ITabsProps> = ({ first, second }) => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <div className={styles.container}>
      <div className={styles.bloc_tabs}>
        <div className={`${styles.tabs} ${activeTab === 1 ? styles.tabs_active : ''}`} onClick={() => setActiveTab(1)}>
          Error details
        </div>
        <div className={`${styles.tabs} ${activeTab === 2 ? styles.tabs_active : ''}`} onClick={() => setActiveTab(2)}>
          How to fix it
        </div>
      </div>
      <div className={styles.bloc_content}>
        <div className={`${styles.content} ${activeTab === 1 ? styles.content_active : ''}`}>{first}</div>
        <div className={`${styles.content} ${activeTab === 2 ? styles.content_active : ''}`}>{second}</div>
      </div>
    </div>
  )
}

export default Tabs
