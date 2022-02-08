import s from '../../css/sidenav.module.css'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface SidenavMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  to: string
  icon: () => React.ReactNode
}

const SidenavMenuItem = ({ title, icon, to }: SidenavMenuItemProps) => {
  return (
    <NavLink className={s.menu_item} activeClassName={s.active} to={to}>
      {icon()}
      <span>{title}</span>
    </NavLink>
  )
}

export default SidenavMenuItem
