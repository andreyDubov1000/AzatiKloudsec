import {
  Assignment,
  Dashboard,
  Extension,
  FindInPage,
  GppMaybe,
} from "@material-ui/icons";

const protectedLayoutSidenavNavigations = [
  {
    title: "Risk Management",
    path: "/dashboard/risk-management",
    icon: Dashboard,
  },
  {
    title: "Incidents",
    path: "/incidents",
    icon: GppMaybe,
  },
  {
    title: "Integrations",
    path: "/integrations/aws",
    icon: Extension,
  },
  {
    title: "Scans",
    path: "/scans/aws",
    icon: FindInPage,
  },
  {
    title: "Documentation",
    path: "/docs",
    icon: Assignment,
  },
];

export default protectedLayoutSidenavNavigations;
