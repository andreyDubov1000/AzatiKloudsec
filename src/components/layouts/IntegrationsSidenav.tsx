import CustomBox from "@component/atoms/CustomBox";
import { H4 } from "@component/atoms/Typography";
import integrationsNavigations from "@data/integrationNavigations";
import { Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React from "react";
import ScrollBar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  display: "block",
  marginTop: "0.75rem",
  marginBottom: "0.75rem",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const IntegrationsSidenav = () => {
  return (
    <ScrollBar>
      <CustomBox
        sx={{
          p: "1.5rem",
          minHeight: "100vh",
          minWidth: 260,
          "& .active": {
            color: "primary.main",
          },
        }}
      >
        <H4 fontWeight="500" mt="0.35rem">
          INTEGRATIONS
        </H4>

        {integrationsNavigations.map((item) => (
          <CustomBox sx={{ mt: "2rem" }} key={item.title}>
            <Typography color="grey.500">{item.title}</Typography>
            {item.navlist.map((nav) => (
              <StyledNavLink to={nav.path} key={nav.title}>
                {nav.title}
              </StyledNavLink>
            ))}
          </CustomBox>
        ))}
      </CustomBox>
    </ScrollBar>
  );
};

export default IntegrationsSidenav;
