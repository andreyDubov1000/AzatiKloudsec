import React, { useState } from 'react';
import styles from './SecurityTab.module.scss'
import classNames from "classnames";

interface SecurityTabPropsTypes {
  className?: string;
  onClick?: (state: boolean) => any;
  value?: boolean,
  progress?: number;
  data: SecirityTabData
}

interface SecirityTabData {
  title: string;
  accountId: string;
  server: string;
}

const SecurityTab = ({ className, value = false, onClick, data, progress = 0 }: SecurityTabPropsTypes) => {
  const [activeTab, setActiveTab] = useState(value);

  const onClickHandler = () => {
    setActiveTab(!activeTab)
    if (typeof onClick === 'function') {
      onClick(!activeTab);
    }
  }

  return (
    <div
      onClick={onClickHandler}
      className={classNames(styles.securityTab, { [styles.active]: activeTab }, className)}>
      <div className={styles.securityTab__header}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.desc}><span className={styles.accountId}>{data.accountId}</span> - <span
          className={styles.server}>{data.server}</span></p>
      </div>
      <div className={styles.securityTab__body}>
        <p className={styles.progress}>{progress}<span>%</span></p>
        <p className={styles.progressText}>Compliance</p>
      </div>
    </div>
  );
};

export default SecurityTab;
