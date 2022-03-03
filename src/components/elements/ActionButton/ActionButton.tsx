import React from 'react';
import styles from './ActionButton.module.scss';
import classNames from 'classnames'


interface ActionButtonPropTypes {
  children?: JSX.Element | string;
  icon?: string;
  disabled?: boolean;
  className?: string;
  type?: 'outlined' | 'icon' | 'filled';
  onClick?: () => any;
}

const ActionButton = ({ children, icon, className, onClick, type = 'filled', disabled }: ActionButtonPropTypes) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.button, {
        [styles.outlined]: type === 'outlined',
        [styles.fill]: type === 'filled',
        [styles.iconButton]: type === 'icon',
        [styles.disabled]: disabled
      }, className)}>
      {icon && (
        <div className={styles.iconBox}>
          <img className={styles.icon} src={icon} alt='' />
        </div>
      )}
      <p className={styles.title}>{children}</p>
    </button>
  );
};

export default ActionButton;
