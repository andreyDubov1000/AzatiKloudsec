import { lazy } from "react";
import { Redirect } from "react-router-dom";

const docRoutes = [
  {
    path: "/docs/introduction",
    component: lazy(() => import("./DocIntro")),
  },
  {
    path: "/docs/aws/introduction",
    component: lazy(() => import("./DocIntroAws")),
  },
  {
    path: "/docs",
    component: () => <Redirect to="/docs/introduction" />,
  },
];

export default docRoutes;
