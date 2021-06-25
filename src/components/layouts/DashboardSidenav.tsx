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
import { Link } from "react-router-dom";

type DashboardSidenavProps = {
  toggleDashboardSidenav?: () => any;
};

const SidenavMenuItem = styled(MenuItem)({
  justifyContent: "center",
  borderRadius: "4px",
  height: 36,
  width: 36,
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "secondary.dark",
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
        <SidenavMenuItem onClick={handleLinkClick}>
          <Dashboard fontSize="small" />
          {/* <Box ml="0.75rem">Dashboard</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/book/add">
        <SidenavMenuItem onClick={handleLinkClick}>
          <CloudUpload fontSize="small" />
          {/* <Box ml="0.75rem">Upload Book</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/books">
        <SidenavMenuItem onClick={handleLinkClick}>
          <Assignment fontSize="small" />
          {/* <Box ml="0.75rem">Book List</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/authors/add">
        <SidenavMenuItem onClick={handleLinkClick}>
          <PersonAdd fontSize="small" />
          {/* <Box ml="0.75rem">Add Author</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/authors">
        <SidenavMenuItem onClick={handleLinkClick}>
          <People fontSize="small" />
          {/* <Box ml="0.75rem">Author List</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/bank-account">
        <SidenavMenuItem onClick={handleLinkClick}>
          <AccountBalance fontSize="small" />
          {/* <Box ml="0.75rem">Bank Account</Box> */}
        </SidenavMenuItem>
      </Link>

      {/* ------------------------------------ */}

      <Link to="/books">
        <SidenavMenuItem onClick={handleLinkClick}>
          <Assignment fontSize="small" />
          {/* <Box ml="0.75rem">Book List</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/authors/add">
        <SidenavMenuItem onClick={handleLinkClick}>
          <PersonAdd fontSize="small" />
          {/* <Box ml="0.75rem">Add Author</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/authors">
        <SidenavMenuItem onClick={handleLinkClick}>
          <People fontSize="small" />
          {/* <Box ml="0.75rem">Author List</Box> */}
        </SidenavMenuItem>
      </Link>
      <Link to="/bank-account">
        <SidenavMenuItem onClick={handleLinkClick}>
          <AccountBalance fontSize="small" />
          {/* <Box ml="0.75rem">Bank Account</Box> */}
        </SidenavMenuItem>
      </Link>
    </CustomBox>
  );
};

export default DashboardSidenav;
