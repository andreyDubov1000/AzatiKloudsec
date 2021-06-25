import CustomBox from "@component/atoms/CustomBox";
import CustomImage from "@component/atoms/CustomImage";
import { MenuItem } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import {
  AccountBalance,
  Assignment,
  CloudUpload,
  Dashboard,
  People,
  PersonAdd,
} from "@material-ui/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";

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
      }}
    >
      <Link to="/dashboard">
        <CustomImage
          src="/logo-white.svg"
          alt="logo"
          width="100%"
          sx={{ display: "block", mx: "auto", mb: "2rem", px: "1rem" }}
        />
      </Link>

      <Link to="/">
        <SidenavMenuItem sx={{ bgcolor: "rgba(255, 255, 255, 0.16)" }}>
          <Dashboard fontSize="inherit" />
          {/* <Box ml="0.75rem">Dashboard</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/book/add">
        <SidenavMenuItem>
          <CloudUpload fontSize="inherit" />
          {/* <Box ml="0.75rem">Upload Book</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/books">
        <SidenavMenuItem>
          <Assignment fontSize="inherit" />
          {/* <Box ml="0.75rem">Book List</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/authors/add">
        <SidenavMenuItem>
          <PersonAdd fontSize="inherit" />
          {/* <Box ml="0.75rem">Add Author</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/authors">
        <SidenavMenuItem>
          <People fontSize="inherit" />
          {/* <Box ml="0.75rem">Author List</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/bank-account">
        <SidenavMenuItem>
          <AccountBalance fontSize="inherit" />
          {/* <Box ml="0.75rem">Bank Account</Box> */}
        </SidenavMenuItem>
      </Link>

      {/* ------------------------------------ */}

      <Link to="/books">
        <SidenavMenuItem>
          <Assignment fontSize="inherit" />
          {/* <Box ml="0.75rem">Book List</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/authors/add">
        <SidenavMenuItem>
          <PersonAdd fontSize="inherit" />
          {/* <Box ml="0.75rem">Add Author</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/authors">
        <SidenavMenuItem>
          <People fontSize="inherit" />
          {/* <Box ml="0.75rem">Author List</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/bank-account">
        <SidenavMenuItem>
          <AccountBalance fontSize="inherit" />
          {/* <Box ml="0.75rem">Bank Account</Box> */}
        </SidenavMenuItem>
      </Link>
    </CustomBox>
  );
};

export default DashboardSidenav;
