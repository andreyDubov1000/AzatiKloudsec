import { lazy } from "react";

const incidentRoutes = [
  {
    path: "/incidents/:slug",
    component: lazy(() => import("./UserIncidents")),
  },
  {
    path: "/incidents",
    component: lazy(() => import("./UserIncidents")),
  },
];

export default incidentRoutes;
