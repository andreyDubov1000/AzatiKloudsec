import { lazy } from "react";
import { Redirect } from "react-router-dom";

const scansRoutes = [
  {
    path: "/scans/aws/:account_id/:request_id",
    component: lazy(() => import("./AwsScanResults")),
  },
  {
    path: "/scans/aws",
    component: lazy(() => import("./AwsScans")),
    expect: true,
  },
  {
    path: "/scans",
    component: () => <Redirect to="/scans/aws" />,
    exact: true,
  },
];

export default scansRoutes;
