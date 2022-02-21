import { lazy } from 'react'

const incidentRoutes = [
  {
    path: '/incidents/:slug',
    component: lazy(() => import('../../components/incidentsDev/Incidents')),
  },
  {
    path: '/incidents',
    component: lazy(() => import('../../components/incidentsDev/Incidents')),
  },
]

export default incidentRoutes
