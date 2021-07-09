import { lazy } from "react";

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: lazy(() => import("./RiskManagementDashboard")),
  },
];

export default dashboardRoutes;
