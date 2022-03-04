import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MenuNav } from '../menuNav';
import { hasChildren } from '../utils';
import classNames from 'classnames';
import styles from './MenuItem.module.scss';
import { Collapse, List } from '@material-ui/core';

interface MenuItemPropsTypes {
  item: MenuNav;
}

const MenuItem = ({ item }: MenuItemPropsTypes) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
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
        <List component='div' disablePadding className={styles.menuItemList}>
          {children ? children.map((child, key) => <MenuItem key={key} item={child} />) : ''}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default MenuItem;
