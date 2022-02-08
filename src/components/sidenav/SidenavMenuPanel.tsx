import React from 'react'
import s from '../../css/sidenav.module.css'
import { ReactComponent as Exit } from '../../assets/Exit normal.svg'
import SidenavMenuItem from './SidenavMenuItem'
import protectedLayoutSidenavNavigations from '@data/protectedLayoutSidenavNavigations'
import { SIGN_OUT } from '@redux/auth/authTypes'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import ScrollBar from 'react-perfect-scrollbar'
import { Link, useHistory } from 'react-router-dom'
import { signOut } from 'services/authService'

const SidenavMenuPanel = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)

  const handleSignOut = async (e: React.MouseEvent) => {
    const data = await signOut({
      email: token?.email,
      access_token: token?.access_token,
    })

    if (data) {
      dispatch({ type: SIGN_OUT })
      history.push('/login')
    }
  }

  return (
    <ScrollBar className={s.navbar} options={{ suppressScrollX: true }}>
      <Link to='/'>
        <img className={s.navbar_logo} alt='logo' />
      </Link>

      {protectedLayoutSidenavNavigations.map((item) => (
        <SidenavMenuItem to={item.path} key={item.path} title={item.title} icon={() => <item.icon className={s.link_icon} />} />
      ))}
      <div className={`${s.menu_item} ${s.menu_item_exit}`} onClick={handleSignOut}>
        <Exit className={s.link_icon} />
        <span>{'Exit'}</span>
      </div>
    </ScrollBar>
  )
}

export default SidenavMenuPanel
