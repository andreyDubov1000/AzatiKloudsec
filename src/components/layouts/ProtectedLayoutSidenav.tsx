import CustomBox from "@component/atoms/CustomBox";
import CustomImage from "@component/atoms/CustomImage";
import protectedLayoutSidenavNavigations from "@data/protectedLayoutSidenavNavigations";
import { MenuItem, Tooltip } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React from "react";
import ScrollBar from "react-perfect-scrollbar";
import { Link, NavLink } from "react-router-dom";

const SidenavMenuItem = styled(MenuItem)({
  justifyContent: "center",
  borderRadius: "4px",
  height: 44,
  width: 44,
  fontSize: "1.75rem",
  marginBottom: "0.25rem",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.16)",
  },
});

const ProtectedLayoutSidenav = () => {
  // const history = useHistory();
  // const { store } = useContext(AppContext);
  // const { user } = store;
  // const isPublisher = user?.user_type === "publisher";

  // const handleSignOut = async () => {
  //   await signOut();
  //   history.push("/signin");
  // };

  return (
    <CustomBox
      sx={{
        "& .scroll-bar": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          bgcolor: "primary.main",
          height: "100vh",
          width: 64,
          minWidth: 64,
          py: "1rem",
        },
        "& .active": {
          "& > *": {
            bgcolor: "rgba(255, 255, 255, 0.16)",
          },
        },
      }}
    >
      <ScrollBar className="scroll-bar">
        <Link to="/dashboard/risk-management">
          <CustomImage
            src="/logo-white.svg"
            alt="logo"
            width="100%"
            sx={{ display: "block", mx: "auto", mb: "2rem", px: "1rem" }}
          />
        </Link>

        {protectedLayoutSidenavNavigations.map((item) => (
          <NavLink activeClassName="active" to={item.path} key={item.path}>
            <Tooltip title={item.title} placement="right">
              <SidenavMenuItem>
                <item.icon fontSize="inherit" />
              </SidenavMenuItem>
            </Tooltip>
          </NavLink>
        ))}
      </ScrollBar>
    </CustomBox>
  );
};

export default ProtectedLayoutSidenav;
