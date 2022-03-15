import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const integrationRoutes = [
  {
    path: '/integrations/:cloud_id',
    component: lazy(() => import('../scansDev/Scans')),
  },
  {
    path: '/integrations',
    component: lazy(() => import('../scansDev/Scans')),
    exact: true,
  },
]

export default integrationRoutes
