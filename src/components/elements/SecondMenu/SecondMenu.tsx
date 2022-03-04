import React from 'react';
import styles from './SecondMenu.module.scss';
import Settings from 'assets/icons/Settings.svg';
import { Link } from 'react-router-dom';
import { MenuNav } from './menuNav';
import MenuList from './MenuList/MenuList';

export interface SecondMenuPropsTypes {
  items: MenuNav[];
}

const SecondMenu = ({ items }: SecondMenuPropsTypes) => {
  return (
    <div className={styles.menu}>
      <div className={styles.content}>
        <MenuList items={items} />
      </div>
      <div className={styles.bottom}>
        <Link to='/'>
          <img className={styles.settings} src={Settings} alt='settings' />
        </Link>
      </div>
    </div>
  );
};

export default SecondMenu;
