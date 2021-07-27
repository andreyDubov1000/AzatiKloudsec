import { Assignment, Dashboard, Extension, GppMaybe } from "@material-ui/icons";

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
    title: "Documentation",
    path: "/docs/introduction",
    icon: Assignment,
  },
];

export default protectedLayoutSidenavNavigations;
