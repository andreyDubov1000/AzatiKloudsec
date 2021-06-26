import { lazy } from "react";
import { Redirect } from "react-router-dom";

const integrationRoutes = [
  {
    path: "/integrations/aws",
    component: lazy(() => import("./Integration")),
  },
  {
    path: "/integrations",
    exact: true,
    component: () => <Redirect to="/integrations/aws" />,
  },
];

export default integrationRoutes;
