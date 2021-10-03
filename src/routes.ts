import dashboardRoutes from "@page/analytics/analyticsRoutes";
import authRoutes from "@page/auth/authRoutes";
import incidentRoutes from "@page/incidents/incidentRoutes";
import scansRoutes from "@page/scans/scansRoues";
import securityExceptionRoutes from "@page/security-exceptions/securityExceptionRoutes";
import { lazy } from "react";

export const simpleRoutes = [
  {
    path: "/",
    component: lazy(() => import("./pages/home/Home")),
    exact: true,
  },
  ...authRoutes,
];

export const protectedRoutes = [
  {
    path: "/integrations",
    component: lazy(() => import("@component/layouts/IntegrationsLayout")),
  },
  {
    path: "/docs",
    component: lazy(() => import("@component/layouts/DocLayout")),
  },
  ...dashboardRoutes,
  ...incidentRoutes,
  ...securityExceptionRoutes,
  ...scansRoutes,
];
