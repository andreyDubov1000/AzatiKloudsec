import { lazy } from 'react'

const scansRoutes = [
  {
    path: '/scans/:cloud_id/:account_id/:request_id',
    component: lazy(() => import('../../components/scansDev/AwsScanResults')),
  },
  {
    path: '/scans/:cloud_id',
    component: lazy(() => import('../../components/scansDev/Scans')),
  },
  {
    path: '/scans',
    component: lazy(() => import('../../components/scansDev/Scans')),
    exact: true,
  },
]

export default scansRoutes
