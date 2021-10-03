import { lazy } from "react";
import { Redirect } from "react-router-dom";

const securityExceptionRoutes = [
  {
    path: "/security-exceptions/aws",
    component: lazy(() => import("./SecurityException")),
  },
  {
    path: "/security-exceptions",
    component: () => <Redirect to="/security-exceptions/aws" />,
    exact: true,
  },
];

export default securityExceptionRoutes;
