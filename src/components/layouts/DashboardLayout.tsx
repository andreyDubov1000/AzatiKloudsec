import CustomBox from "@component/atoms/CustomBox";
import Loader from "@component/atoms/Loader";
import Auth from "@component/auth/Auth";
import AuthGuard from "@component/auth/AuthGuard";
import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { protectedRoutes } from "routes";
import DashboardSidenav from "./DashboardSidenav";
// import AuthGuard from "./auth/AuthGuard";
// import Loader from "./components/Loader";
// import DashboardSidenav from "./components/DashboardSidenav";
// import Footer from "app/components/Footer";

const DashboardLayout = () => {
  return (
    <Auth>
      <CustomBox sx={{ height: "100vh", display: "flex", overflow: "hidden" }}>
        <DashboardSidenav />

        <CustomBox
          sx={{
            flex: "1 1 0",
            position: "relative",
          }}
        >
          <Suspense fallback={<Loader />}>
            <Switch>
              {protectedRoutes.map((item, ind) => (
                <AuthGuard
                  path={item.path}
                  component={item.component}
                  key={item.path}
                />
              ))}
            </Switch>
          </Suspense>
        </CustomBox>
      </CustomBox>
    </Auth>
  );
};

export default DashboardLayout;
