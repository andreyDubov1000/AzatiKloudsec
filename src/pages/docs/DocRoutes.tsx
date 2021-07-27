import { lazy } from "react";

const docRoutes = [
  {
    path: "/docs/introduction",
    component: lazy(() => import("./DocIntro")),
  },
];

export default docRoutes;
