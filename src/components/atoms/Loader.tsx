import React from "react";
import CustomBox from "./CustomBox";
import { H5 } from "./Typography";

interface LoaderProps {
  title?: string;
}

const Loader: React.FC<LoaderProps> = ({ title }) => {
  return (
    <CustomBox
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div className="loader-wraper">
        <div className="gradient-circle">
          <div className="white-circle"></div>
        </div>
        <img src="/logo.svg" alt="logo" className="loader-image" />
      </div>

      {title && <H5 mt="0.5rem">{title}</H5>}
    </CustomBox>
  );
};

export default Loader;
