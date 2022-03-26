import Loader from '@component/atoms/Loader'
import CustomBox from '@component/atoms/CustomBox'
import Auth from '@component/auth/Auth'
import AuthGuard from '@component/auth/AuthGuard'
import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'
import userMenuRoutes from './userRoutes'
import styles from './UserLayout.module.scss'
import PageTitle from '@component/atoms/PageTitle'
import ScrollBar from 'react-perfect-scrollbar'
import { SecondMenu } from '@component/elements'
import { userInformationMenuList } from '@data/constants'
import { lazy } from 'react'

const UserLayout = () => {
  return (
    <Auth>
      {/* {loading && <Loader />} */}
      <PageTitle title={`User information`} />
      <h1 className={styles.title}>{`User information`}</h1>
      <div className={styles.layout}>
        <ScrollBar className={styles.aside_menu}>
          <SecondMenu items={userInformationMenuList} />
        </ScrollBar>
        <div className={styles.user_tab}>
          <Suspense fallback={<Loader />}>
            <Switch>
              {userMenuRoutes.map((item) => (
                <AuthGuard {...item} />
              ))}
              <AuthGuard component={lazy(() => import('./UserInformation'))} path='/user' />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Auth>
  )
}

export default UserLayout
