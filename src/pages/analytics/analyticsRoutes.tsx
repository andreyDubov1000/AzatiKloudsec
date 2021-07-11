import { lazy } from "react";
import { Redirect } from "react-router-dom";

const dashboardRoutes = [
  {
    path: "/dashboard/risk-management",
    component: lazy(() => import("./Analytics")),
  },
  {
    path: "/dashboard",
    component: () => <Redirect to="/dashboard/risk-management" />,
    exact: true,
  },
];

export default dashboardRoutes;
