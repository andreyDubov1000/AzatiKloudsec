import React, { useState } from 'react';
import Badge from 'assets/icons/available-arrow.svg';
import styles from './PlatCard.module.scss';
import classNames from 'classnames';

interface PlanCardPropTypes {
  amount: string,
  term: string,
  desc: string,
  type: string,
  badge?: boolean;
  badgeText?: string;
  onClick?: (state: boolean) => any;
  className?: string;
}

export const PlanCard = ({ badge = true, badgeText = 'Available', onClick, amount, term, desc, type, className }: PlanCardPropTypes) => {
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);

    if (typeof onClick === 'function') {
      onClick(!active);
    }
  };

  return (
    <div onClick={toggle} className={classNames(styles.card, { [styles.active]: active }, className)}>
      <div className={styles.content}>
        <p className={styles.amount}>{amount}</p>
        <p className={styles.term}>{term}</p>
        <p className={styles.desc}>{desc}</p>
      </div>
      <p className={styles.type}>{type}</p>
      {badge && (
        <div className={styles.badge}>
          <img src={Badge} alt='' />
          <p className={styles.text}>{badgeText}</p>
        </div>
      )}
    </div>
  );
};
