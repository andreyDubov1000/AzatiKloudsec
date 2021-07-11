import dashboardRoutes from "@page/analytics/analyticsRoutes";
import authRoutes from "@page/auth/authRoutes";
import { lazy } from "react";

export const simpleRoutes = [...authRoutes];

export const protectedRoutes = [
  {
    path: "/integrations",
    component: lazy(() => import("@component/layouts/IntegrationsLayout")),
  },
  ...dashboardRoutes,
];
