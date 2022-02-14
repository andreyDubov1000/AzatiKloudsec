import { lazy } from 'react'

const incidentRoutes = [
  {
    path: '/incidents/:slug',
    component: lazy(() => import('../../components/incidentsDev/IncidentsContainer')),
  },
  {
    path: '/incidents',
    component: lazy(() => import('../../components/incidentsDev/IncidentsContainer')),
  },
]

export default incidentRoutes
