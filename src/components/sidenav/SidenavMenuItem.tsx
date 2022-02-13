import s from './sidenav.module.css'
import React from 'react'
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom'

interface SidenavMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  to: string
  icon: () => React.ReactNode
  iconActive: () => React.ReactNode
}

const SidenavMenuItem = ({ title, icon, iconActive, to }: SidenavMenuItemProps) => {
  const location = useLocation()
  const regExp = new RegExp(`${to}($|/)`)
  const isMatchLocation = location.pathname.match(regExp)

  return (
    <NavLink className={s.menu_item} activeClassName={s.active} to={to}>
      {isMatchLocation ? iconActive() : icon()}
      <span>{title}</span>
    </NavLink>
  )
}

export default SidenavMenuItem
