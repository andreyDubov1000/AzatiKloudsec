import React, { useEffect, useState } from 'react';
import styles from './SecondMenu.module.scss';
import Settings from 'assets/icons/Settings.svg';
import { hasChildren } from './utils';
import { Collapse, List } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { MenuNav } from './menuNav';

interface SecondMenuPropsTypes {
  items: MenuNav[];
}

interface MenuItemPropsTypes {
  item: MenuNav;
}

const SecondMenu = ({ items }: SecondMenuPropsTypes) => {
  return (
    <div className={styles.menu}>
      <div className={styles.content}>
        {items.map((item: MenuNav, key: number) => (
          <MenuItem key={key} item={item} />
        ))}
      </div>
      <div className={styles.bottom}>
        <Link to='/'>
          <img className={styles.settings} src={Settings} alt='settings' />
        </Link>
      </div>
    </div>
  );
};

const MenuItem = ({ item }: MenuItemPropsTypes) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item}/>;
};

const SingleLevel = ({ item }: MenuItemPropsTypes) => {
  const [active, setActive] = useState(false);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname === item.url) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location.pathname, item.url]);

  const open = () => {
    if (item.url) {
      history.push(item.url);
    }
  };

  return (
    <p onClick={open} className={classNames(styles.item, { [styles.activeSingle]: active })}>
      {item.title}
    </p>
  );
};

const MultiLevel = ({ item }: MenuItemPropsTypes) => {
  const [active, setActive] = useState(false);
  const { children } = item;

  const activate = () => {
    setActive((prev) => !prev);
  };

  return (
    <React.Fragment>
      <p onClick={activate} className={classNames(styles.item, { [styles.active]: active })}>
        {item.title}
      </p>
      <Collapse in={active} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {children ? children.map((child, key) => <MenuItem key={key} item={child} />) : ''}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default SecondMenu;
