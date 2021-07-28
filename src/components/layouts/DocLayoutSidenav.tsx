import CustomAccordion from "@component/atoms/CustomAccordion";
import CustomBox from "@component/atoms/CustomBox";
import { H4 } from "@component/atoms/Typography";
import { docConstants } from "@data/constants";
import docNavigations from "@data/docNavigations";
import { Button } from "@material-ui/core";
import React from "react";
import ScrollBar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";

export interface DocLayoutSidenavProps {}

const DocLayoutSidenav: React.FC<DocLayoutSidenavProps> = () => {
  const renderList = (list: typeof docNavigations) => {
    return list.map((item) => {
      if (item.children) {
        return (
          <CustomAccordion
            title={item.title}
            buttonSx={{ pl: "1rem", ml: "-1rem" }}
            key={item.title}
          >
            <CustomBox sx={{ pl: "1rem" }}>
              {renderList(item.children)}
            </CustomBox>
          </CustomAccordion>
        );
      } else {
        return (
          <NavLink to={item.url} key={item.title}>
            <Button
              fullWidth
              sx={{
                justifyContent: "flex-start",
                pl: "1rem",
                ml: "-1rem",
                textAlign: "left",
              }}
            >
              {item.title}
            </Button>
          </NavLink>
        );
      }
    });
  };

  return (
    <ScrollBar>
      <CustomBox
        sx={{
          p: "1.5rem",
          // bgcolor: "white",
          width: docConstants.sidenavWidth,
          minHeight: "100vh",
          boxShadow: "elevation.12",
          "& .active": {
            color: "primary.main",
          },
        }}
      >
        <H4 fontWeight="500" mt="0.35rem" mb="1.5rem">
          DOCUMENTATION
        </H4>
        {/* <CustomImage
          src="/logo.svg"
          height="36px"
          alt="logo"
          sx={{ display: "block", mx: "auto", mb: "2rem" }}
        /> */}
        {renderList(docNavigations)}
      </CustomBox>
    </ScrollBar>
  );
};

export default DocLayoutSidenav;
