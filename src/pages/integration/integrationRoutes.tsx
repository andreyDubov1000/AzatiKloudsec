import { lazy } from "react";
import { Redirect } from "react-router-dom";

const integrationRoutes = [
  {
    path: "/integrations/aws",
    component: lazy(() => import("./Integration")),
  },
  {
    path: "/integrations",
    component: () => <Redirect to="/integrations/aws" />,
    exact: true,
  },
];

export default integrationRoutes;
