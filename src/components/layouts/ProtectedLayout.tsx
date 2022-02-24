import CustomBox from '@component/atoms/CustomBox'
import Loader from '@component/atoms/Loader'
import Auth from '@component/auth/Auth'
import AuthGuard from '@component/auth/AuthGuard'
import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'
import { protectedRoutes } from 'routes'
import SidenavMenuPanel from '../sidenav/SidenavMenuPanel'
import styles from './ProtectedLayout.module.scss'

const ProtectedLayout = () => {
  return (
    <Auth>
      <CustomBox className={styles.mainBg} sx={{ height: '100vh', display: 'flex', overflow: 'scroll' }}>
        <SidenavMenuPanel />

        <CustomBox
          sx={{
            flex: '1 1 0',
            position: 'relative',
          }}
        >
          <Suspense fallback={<Loader />}>
            <Switch>
              {protectedRoutes.map((item) => (
                <AuthGuard {...item} key={item.path} />
              ))}
            </Switch>
          </Suspense>
        </CustomBox>
      </CustomBox>
    </Auth>
  )
}

export default ProtectedLayout
