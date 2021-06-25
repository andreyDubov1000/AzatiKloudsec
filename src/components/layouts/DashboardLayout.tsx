import CustomBox from "@component/atoms/CustomBox";
import Loader from "@component/atoms/Loader";
import Auth from "@component/auth/Auth";
import AuthGuard from "@component/auth/AuthGuard";
import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
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
            overflow: "auto",
            p: "1rem",
            height: "100vh",
          }}
        >
          <Suspense fallback={<Loader />}>
            <Switch>
              <AuthGuard
                path="/"
                component={lazy(() => import("@page/Dashboard"))}
              />
            </Switch>
          </Suspense>
        </CustomBox>
      </CustomBox>
    </Auth>
  );
};

export default DashboardLayout;
