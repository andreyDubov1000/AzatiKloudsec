import { Dashboard, Extension, GppMaybe } from "@material-ui/icons";

const protectedLayoutSidenavNavigations = [
  {
    path: "/dashboard/risk-management",
    icon: Dashboard,
  },
  {
    path: "/incidents",
    icon: GppMaybe,
  },
  {
    path: "/integrations/aws",
    icon: Extension,
  },
];

export default protectedLayoutSidenavNavigations;
