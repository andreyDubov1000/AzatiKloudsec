import React, { useEffect, useState } from 'react';
import styles from './ToggleButton.module.scss';
import classNames from 'classnames';

interface ToggleButtonPropTypes {
  disabled?: boolean;
  defaultChecked?: boolean;
  className?: string;
  onChange?: (state: boolean) => any;
}

const ToggleButton = ({ disabled, defaultChecked, className, onChange }: ToggleButtonPropTypes) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (defaultChecked) {
      setToggle(defaultChecked);
    }
  }, [defaultChecked]);

  const triggerToggle = () => {
    if (disabled) return;

    setToggle(!toggle);

    if (typeof onChange === 'function') {
      onChange(!toggle);
    }
  };

  return (
    <div
      onClick={triggerToggle}
      className={classNames(className, styles.toggle, { [styles.checked]: toggle, [styles.disabled]: disabled })}>
      <div className={styles.container}></div>
      <div className={styles.circle}></div>
      <input className={styles.input} type='checkbox' aria-label='Toggle Button' />
    </div>
  );
};

export default ToggleButton;
