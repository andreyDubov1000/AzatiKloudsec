import React from 'react'
import styles from './sidenav.module.css'
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

  const handleSignOut = async () => {
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
    <ScrollBar className={styles.navbar} options={{ suppressScrollX: true }}>
      <Link to='/'>
        <img className={styles.navbar_logo} alt='logo' />
      </Link>

      {protectedLayoutSidenavNavigations.map((item) => (
        <SidenavMenuItem
          to={item.path}
          key={item.path}
          title={item.title}
          icon={() => <item.icon className={styles.link_icon} />}
          iconActive={() => <img src={item.iconActive} className={styles.link_icon} />}
        />
      ))}
      <div className={`${styles.menu_item} ${styles.menu_item_exit}`} onClick={handleSignOut}>
        <Exit className={styles.link_icon} />
        <span>{'Exit'}</span>
      </div>
    </ScrollBar>
  )
}

export default SidenavMenuPanel
