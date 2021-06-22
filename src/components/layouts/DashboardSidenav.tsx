import CustomBox from "@component/atoms/CustomBox";
import CustomImage from "@component/atoms/CustomImage";
import { Box, MenuItem } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import {
  AccountBalance,
  Assignment,
  CloudUpload,
  Dashboard,
  People,
  PersonAdd,
} from "@material-ui/icons";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

type DashboardSidenavProps = {
  toggleDashboardSidenav?: () => any;
};

const SidenavMenuItem = styled(MenuItem)({
  borderRadius: "4px",
  paddingTop: "10px",
  paddingBottom: "10px",
  marginBottom: "0.25rem",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.16)",
  },
});

const DashboardSidenav: React.FC<DashboardSidenavProps> = ({
  toggleDashboardSidenav,
}) => {
  // const history = useHistory();
  // const { store } = useContext(AppContext);
  // const { user } = store;
  // const isPublisher = user?.user_type === "publisher";

  const handleLinkClick = () => {
    if (toggleDashboardSidenav) toggleDashboardSidenav();
  };

  // const handleSignOut = async () => {
  //   await signOut();
  //   history.push("/signin");
  // };

  return (
    <CustomBox
      sx={{
        background:
          "linear-gradient(rgba(34, 42, 69, 0.96), rgba(34, 42, 69, 0.96)), url(/assets/images/backgrounds/sidenav-bg-dark.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        color: "white",
        height: "100vh",
        p: "1rem",
        width: 260,
        overflow: "auto",
      }}
    >
      <Link to="/">
        <CustomImage
          src="/logo.svg"
          alt="logo"
          sx={{ display: "block", mx: "auto", height: 44, mb: "2rem" }}
        />
      </Link>

      <Box>
        <Link to="/">
          <SidenavMenuItem onClick={handleLinkClick}>
            <Dashboard fontSize="small" />
            <Box ml="0.75rem">Dashboard</Box>
          </SidenavMenuItem>
        </Link>
        <Link to="/book/add">
          <SidenavMenuItem onClick={handleLinkClick}>
            <CloudUpload fontSize="small" />
            <Box ml="0.75rem">Upload Book</Box>
          </SidenavMenuItem>
        </Link>
        <Link to="/books">
          <SidenavMenuItem onClick={handleLinkClick}>
            <Assignment fontSize="small" />
            <Box ml="0.75rem">Book List</Box>
          </SidenavMenuItem>
        </Link>
        {/* {isPublisher && ( */}
        <Fragment>
          <Link to="/authors/add">
            <SidenavMenuItem onClick={handleLinkClick}>
              <PersonAdd fontSize="small" />
              <Box ml="0.75rem">Add Author</Box>
            </SidenavMenuItem>
          </Link>
          <Link to="/authors">
            <SidenavMenuItem onClick={handleLinkClick}>
              <People fontSize="small" />
              <Box ml="0.75rem">Author List</Box>
            </SidenavMenuItem>
          </Link>
        </Fragment>
        {/* )} */}
        <Link to="/bank-account">
          <SidenavMenuItem onClick={handleLinkClick}>
            <AccountBalance fontSize="small" />
            <Box ml="0.75rem">Bank Account</Box>
          </SidenavMenuItem>
        </Link>
      </Box>
    </CustomBox>
  );
};

export default DashboardSidenav;
