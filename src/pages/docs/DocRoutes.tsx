import { lazy } from "react";

const docRoutes = [
  {
    path: "/docs/introduction",
    component: lazy(() => import("./DocIntro")),
  },
  {
    path: "/docs/aws",
    component: lazy(() => import("./DocIntroAws")),
  },
];

export default docRoutes;
