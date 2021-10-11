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
    path: "/docs/KS_AWS_S3_00066",
    component: lazy(() => import("./KS_AWS_S3_00066")),
  },
  {
    path: "/docs/KS_AWS_ACCESS_ANALYZER_00121",
    component: lazy(() => import("./KS_AWS_ACCESS_ANALYZER_00121")),
  },
  {
    path: "/docs/KS_AWS_ACM_00117",
    component: lazy(() => import("./KS_AWS_ACM_00117")),
  },
  {
    path: "/docs/KS_AWS_ACM_00118",
    component: lazy(() => import("./KS_AWS_ACM_00118")),
  },
  {
    path: "/docs/KS_AWS_ACM_00119",
    component: lazy(() => import("./KS_AWS_ACM_00119")),
  },
  {
    path: "/docs/KS_AWS_ATHENA_00107",
    component: lazy(() => import("./KS_AWS_ATHENA_00107")),
  },
  {
    path: "/docs/KS_AWS_CLOUDFORMATION_00092",
    component: lazy(() => import("./KS_AWS_CLOUDFORMATION_00092")),
  },
  {
    path: "/docs/KS_AWS_CLOUDWATCH_00093",
    component: lazy(() => import("./KS_AWS_CLOUDWATCH_00093")),
  },
  {
    path: "/docs/KS_AWS_COMPREHEND_00124",
    component: lazy(() => import("./KS_AWS_COMPREHEND_00124")),
  },
  {
    path: "/docs/KS_AWS_CT_00082",
    component: lazy(() => import("./KS_AWS_CT_00082")),
  },
  {
    path: "/docs",
    component: () => <Redirect to="/docs/introduction" />,
  },
];

export default docRoutes;
