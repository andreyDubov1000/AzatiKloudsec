import CustomBox from "@component/atoms/CustomBox";
import Loader from "@component/atoms/Loader";
import Auth from "@component/auth/Auth";
import AuthGuard from "@component/auth/AuthGuard";
import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import DashboardSidenav from "./DashboardSidenav";
import DashboardTopbar from "./DashboardTopbar";
// import AuthGuard from "./auth/AuthGuard";
// import Loader from "./components/Loader";
// import DashboardSidenav from "./components/DashboardSidenav";
// import Footer from "app/components/Footer";

const DashboardLayout = () => {
  return (
    <Auth>
      <CustomBox sx={{ height: "100vh", display: "flex", overflow: "hidden" }}>
        <CustomBox sx={{ display: { xs: "none", md: "unset" } }}>
          <DashboardSidenav />
        </CustomBox>

        <CustomBox sx={{ flex: "1 1 0", overflow: "hidden" }}>
          <DashboardTopbar />

          <CustomBox
            sx={{
              p: "1rem",
              overflow: "auto",
              height: { xs: "calc(100vh - 56px)", md: "calc(100vh - 64px)" },
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
          {/* <Drawer open={sidenavOpen} onClose={toggleDashboardSidenav}>
            <DashboardSidenav toggleDashboardSidenav={toggleDashboardSidenav} />
          </Drawer> */}

          {/* <Box className={classes.pageContainer}>
          <Suspense fallback={<Loader />}>
            <Switch>
              {rootRoutes.map((item, ind) => (
                <AuthGuard key={ind} {...item} />
              ))}
            </Switch>
          </Suspense>
        </Box> */}
        </CustomBox>
        {/* <Footer /> */}
      </CustomBox>
    </Auth>
  );
};

export default DashboardLayout;
