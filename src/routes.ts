import dashboardRoutes from "@page/analytics/analyticsRoutes";
import authRoutes from "@page/auth/authRoutes";
import incidentRoutes from "@page/incidents/incidentRoutes";
import { lazy } from "react";

export const simpleRoutes = [
  ...authRoutes,
  {
    path: "/docs",
    component: lazy(() => import("@component/layouts/DocLayout")),
  },
];

export const protectedRoutes = [
  {
    path: "/integrations",
    component: lazy(() => import("@component/layouts/IntegrationsLayout")),
  },

  ...dashboardRoutes,
  ...incidentRoutes,
];
