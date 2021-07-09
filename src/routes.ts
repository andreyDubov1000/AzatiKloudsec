import authRoutes from "@page/auth/authRoutes";
import { lazy } from "react";

export const simpleRoutes = [...authRoutes];

export const protectedRoutes = [
  {
    path: "/integrations",
    component: lazy(() => import("@component/layouts/IntegrationsLayout")),
  },
  {
    path: "/risk-management-dashboard",
    component: lazy(() => import("@page/dashboard/RiskManagementDashboard")),
  },
];
