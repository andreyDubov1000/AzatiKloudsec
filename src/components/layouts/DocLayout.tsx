import CustomBox from "@component/atoms/CustomBox";
import Loader from "@component/atoms/Loader";
import AuthGuard from "@component/auth/AuthGuard";
import DocLayoutSidenav from "@component/layouts/DocLayoutSidenav";
import docRoutes from "@page/docs/DocRoutes";
import React, { Suspense } from "react";
import ScrollBar from "react-perfect-scrollbar";
import { Switch } from "react-router-dom";

export interface DocLayoutProps {}

const DocLayout: React.FC<DocLayoutProps> = () => {
  return (
    <CustomBox
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <DocLayoutSidenav />

      <CustomBox
        sx={{
          flex: "1 1 0",
          position: "relative",
          "& .code": {
            bgcolor: "grey.200",
            p: "0.125rem 0.25rem",
            borderRadius: 1,
          },
        }}
      >
        <ScrollBar>
          <Suspense fallback={<Loader />}>
            <Switch>
              {docRoutes.map((item) => (
                <AuthGuard {...item} key={item.path} />
              ))}
            </Switch>
          </Suspense>
        </ScrollBar>
      </CustomBox>
    </CustomBox>
  );
};

export default DocLayout;
