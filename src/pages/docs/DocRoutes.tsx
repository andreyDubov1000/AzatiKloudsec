import { lazy } from "react";

const docRoutes = [
  {
    path: "/docs/how-to",
    component: lazy(() => import("./DocHowTo")),
  },
  {
    path: "/docs/introduction",
    component: lazy(() => import("./DocIntro")),
  },
];

export default docRoutes;
