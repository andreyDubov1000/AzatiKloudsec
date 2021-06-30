import CustomBox from "@component/atoms/CustomBox";
import CustomImage from "@component/atoms/CustomImage";
import { MenuItem } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import {
  Assignment,
  CloudUpload,
  Dashboard,
  Extension,
  People,
  PersonAdd,
} from "@material-ui/icons";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SidenavMenuItem = styled(MenuItem)({
  justifyContent: "center",
  borderRadius: "4px",
  height: 40,
  width: 40,
  fontSize: "1.5rem",
  marginBottom: "0.25rem",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.16)",
  },
});

const DashboardSidenav = () => {
  const { pathname } = useLocation();
  // const history = useHistory();
  // const { store } = useContext(AppContext);
  // const { user } = store;
  // const isPublisher = user?.user_type === "publisher";

  // const handleSignOut = async () => {
  //   await signOut();
  //   history.push("/signin");
  // };

  console.log(pathname);

  return (
    <CustomBox
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "primary.main",
        color: "white",
        height: "100vh",
        width: 64,
        py: "1rem",
        overflow: "auto",
        "& .active": {
          "& > *": {
            bgcolor: "rgba(255, 255, 255, 0.16)",
          },
        },
      }}
    >
      <NavLink to="/dashboard">
        <CustomImage
          src="/logo-white.svg"
          alt="logo"
          width="100%"
          sx={{ display: "block", mx: "auto", mb: "2rem", px: "1rem" }}
        />
      </NavLink>

      <NavLink activeClassName="active" to="/integrations">
        <SidenavMenuItem>
          <Dashboard fontSize="inherit" />
          {/* <Box ml="0.75rem">Dashboard</Box> */}
        </SidenavMenuItem>
      </NavLink>
      <NavLink activeClassName="active" to="/book/add">
        <SidenavMenuItem>
          <CloudUpload fontSize="inherit" />
          {/* <Box ml="0.75rem">Upload Book</Box> */}
        </SidenavMenuItem>
      </NavLink>
      <NavLink activeClassName="active" to="/books">
        <SidenavMenuItem>
          <Assignment fontSize="inherit" />
          {/* <Box ml="0.75rem">Book List</Box> */}
        </SidenavMenuItem>
      </NavLink>
      <NavLink activeClassName="active" to="/authors/add">
        <SidenavMenuItem>
          <PersonAdd fontSize="inherit" />
          {/* <Box ml="0.75rem">Add Author</Box> */}
        </SidenavMenuItem>
      </NavLink>
      <NavLink activeClassName="active" to="/authors">
        <SidenavMenuItem>
          <People fontSize="inherit" />
          {/* <Box ml="0.75rem">Author List</Box> */}
        </SidenavMenuItem>
      </NavLink>
      <NavLink activeClassName="active" to="/bank-account">
        <SidenavMenuItem>
          <Extension fontSize="inherit" />
          {/* <Box ml="0.75rem">Bank Account</Box> */}
        </SidenavMenuItem>
      </NavLink>
    </CustomBox>
  );
};

export default DashboardSidenav;
