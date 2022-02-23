import React from 'react';
import classNames from 'classnames';
import styles from './TextTab.module.scss';

interface TextTabPropTypes {
  title?: string;
  desc?: string;
  onClick?: () => any;
  className?: string;
  children?: JSX.Element;
}

const TextTab = ({ title, desc, className, onClick, children }: TextTabPropTypes) => {
  return (
    <div onClick={onClick} className={classNames(styles.textTab, className)}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.desc}>{desc}</p>
      {children}
    </div>
  );
};

export default TextTab;
