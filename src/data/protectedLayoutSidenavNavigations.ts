import {
  Assignment,
  Dashboard,
  Extension,
  FindInPage,
  GppBad,
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
    title: "Security Exceptions",
    path: "/security-exceptions",
    icon: GppBad,
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
