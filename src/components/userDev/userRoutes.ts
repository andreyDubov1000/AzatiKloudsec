import { lazy } from 'react'

const userMenuRoutes = [
  {
    path: '/user/personal',
    component: lazy(() => import('./UserEditDetails')),
  },
  {
    path: '/user/payments',
    component: lazy(() => import('./UserPayments')),
  },
]

export default userMenuRoutes
