import React from 'react';
import styles from './ActionButton.module.scss';
import classNames from 'classnames'


interface ActionButtonPropTypes {
  children?: JSX.Element | string;
  icon?: string;
  className?: string;
  onClick?: () => any;
}

const ActionButton = ({ children, icon, className, onClick }: ActionButtonPropTypes) => {
  
  return (
    <button onClick={onClick} className={classNames(styles.button, className)}>
      {icon && (
        <div className='icon'>
          <img className={styles.icon} src={icon} alt='' />
        </div>
      )}
      <p className={styles.title}>{children}</p>
    </button>
  );
};

export default ActionButton;
