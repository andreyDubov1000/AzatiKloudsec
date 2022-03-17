import { lazy } from 'react'

const securityRoutes = [
  {
    path: '/security/:cloud_id/:account_id/:request_id',
    component: lazy(() => import('./Security')),
  },
  {
    path: '/security/:cloud_id',
    component: lazy(() => import('./Security')),
  },
  {
    path: '/security',
    component: lazy(() => import('./Security')),
    exact: true,
  },
]

export default securityRoutes
