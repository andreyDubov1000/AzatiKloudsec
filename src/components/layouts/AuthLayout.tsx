import FlexBox from "@component/atoms/CustomFlexBox";
import { Box, Card, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import AuthLayoutWrapper from "./AuthLayout.style";

type AuthLayoutProps = {
  greetingText: string;
  imgUrl?: string;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  greetingText,
  imgUrl,
  children,
}) => {
  return (
    <AuthLayoutWrapper>
      <Card className="card">
        <Grid container>
          <Grid item md={7} sm={7} xs={12}>
            <div className="card-left">
              <img src={imgUrl} width="100%" alt="welcome" />
            </div>
          </Grid>
          <Grid item md={5} sm={5} xs={12}>
            <div className="card-title">{greetingText}</div>
            <Box maxWidth="64px" mx="auto" mb="0rem">
              <Link to="/">
                <img src="/logo.svg" width="100%" alt="logo" />
              </Link>
            </Box>
            <FlexBox
              sx={{
                flexDirection: "column",
                alignItems: "center",
                p: { xs: "0rem 1rem 1rem", sm: "0rem 2rem 2rem" },
              }}
            >
              {children}
            </FlexBox>
          </Grid>
        </Grid>
      </Card>
    </AuthLayoutWrapper>
  );
};

AuthLayout.defaultProps = {
  imgUrl: "/assets/images/login-welcome.svg",
};

export default AuthLayout;
