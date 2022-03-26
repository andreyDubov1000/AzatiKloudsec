import dashboardRoutes from '@page/analytics/analyticsRoutes'
import authRoutes from '@page/auth/authRoutes'
import incidentRoutes from '@page/incidents/incidentRoutes'
import otherRoutes from '@page/others/otherRoutes'
import scansRoutes from '@component/scansDev/scansRoutes'
import integrationRoutes from '@component/integrationDev/integrationRoutes'
import securityExceptionRoutes from '@component/SecurityExceptionDev/securityExceptionRoutes'
import { lazy } from 'react'
import { Redirect } from 'react-router'
import securityRoutes from '@component/security/securityRoutes'
import userMenuRoutes from '@component/userDev/userRoutes'

export const simpleRoutes = [
  {
    path: '/',
    component: lazy(() => import('./pages/home/Home')),
    exact: true,
  },
  ...authRoutes,
  ...otherRoutes,
]

export const protectedRoutes = [
  {
    path: '/docs',
    component: lazy(() => import('@component/layouts/DocLayout')),
  },
  {
    path: '/user/:page',
    component: lazy(() => import('@component/userDev/UserLayout')),
   
  },
  {
    path: '/user',
    component: lazy(() => import('@component/userDev/UserLayout')),
    exact: true,
  },
  ...integrationRoutes,
  ...dashboardRoutes,
  ...incidentRoutes,
  ...securityExceptionRoutes,
  ...scansRoutes,
  ...securityRoutes,
  {
    path: '/',
    component: () => <Redirect to='/' />,
  },
]
