import React, { useEffect, useState } from 'react'
import styles from './SecondMenu.module.scss'
import Settings from 'assets/icons/Settings.svg'
import { hasChildren } from './utils'
import { Collapse, List } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { MenuNav } from './menuNav'
import MenuItem from './MenuItem/MenuItem'

export interface SecondMenuPropsTypes {
  items: MenuNav[]
}

interface MenuItemPropsTypes {
  item: MenuNav
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
  )
}

export default SecondMenu
