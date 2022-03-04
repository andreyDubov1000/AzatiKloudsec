import CustomBox from "@component/atoms/CustomBox";
import { H4 } from "@component/atoms/Typography";
import { SecondMenu } from '@component/elements';
import { docConstants } from "@data/constants";
import docNavigations from "@data/docNavigations";
import React from "react";
import ScrollBar from "react-perfect-scrollbar";

export interface DocLayoutSidenavProps {}

const DocLayoutSidenav: React.FC<DocLayoutSidenavProps> = () => {
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
        <SecondMenu items={docNavigations} />
      </CustomBox>
    </ScrollBar>
  );
};

export default DocLayoutSidenav;
