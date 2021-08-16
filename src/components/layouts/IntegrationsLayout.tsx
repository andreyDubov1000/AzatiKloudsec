import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import Loader from "@component/atoms/Loader";
import AuthGuard from "@component/auth/AuthGuard";
import integrationRoutes from "@page/integration/integrationRoutes";
import React, { Suspense } from "react";
import ScrollBar from "react-perfect-scrollbar";
import { Switch } from "react-router-dom";
import IntegrationsSidenav from "./IntegrationsSidenav";

const IntegrationsLayout = () => {
  return (
    <CustomFlexBox>
      <IntegrationsSidenav />
      <CustomBox
        sx={{
          p: "1rem",
          bgcolor: "white",
          flex: "1 1 0",
          height: "100vh",
        }}
      >
        <ScrollBar>
          <Suspense fallback={<Loader />}>
            <Switch>
              {integrationRoutes.map((item, ind) => (
                <AuthGuard {...item} key={item.path} />
              ))}
            </Switch>
          </Suspense>
        </ScrollBar>
      </CustomBox>
    </CustomFlexBox>
  );
};

export default IntegrationsLayout;
