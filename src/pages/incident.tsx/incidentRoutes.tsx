import { lazy } from "react";
// import { Redirect } from "react-router-dom";

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
