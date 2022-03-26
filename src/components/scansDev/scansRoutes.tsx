import { lazy } from 'react'

const scansRoutes = [
  {
    path: '/scans/:cloud_id/:account_id/:request_id',
    component: lazy(() => import('../incidentsDev/Incidents')),
  },
  {
    path: '/scans/:cloud_id',
    component: lazy(() => import('./Scans')),
  },
  {
    path: '/scans',
    component: lazy(() => import('./Scans')),
    exact: true,
  },
]

export default scansRoutes
