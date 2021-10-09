import { lazy } from "react";

const otherRoutes = [
  {
    path: "/careers",
    component: lazy(() => import("./Careers")),
  },
  {
    path: "/about-us",
    component: lazy(() => import("./About")),
  },
  {
    path: "/faq",
    component: lazy(() => import("./FAQ")),
  },
  {
    path: "/privacy-policy",
    component: lazy(() => import("./PrivacyPolicy")),
  },
  {
    path: "/terms-of-service",
    component: lazy(() => import("./TermsOfService")),
  },
];

export default otherRoutes;
