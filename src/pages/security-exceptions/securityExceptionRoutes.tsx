import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const securityExceptionRoutes = [
  {
    path: '/security-exceptions/:acc',
    component: lazy(() => import('../../components/incidentsDev/Incidents')),
  },
  {
    path: '/security-exceptions',
    component: lazy(() => import('../../components/incidentsDev/Incidents')),
    exact: true,
  },
]

export default securityExceptionRoutes
