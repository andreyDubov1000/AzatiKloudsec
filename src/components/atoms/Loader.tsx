import React from "react";
import CustomBox from "./CustomBox";

const Loader = () => {
  return (
    <CustomBox
      sx={{
        display: "flex",
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
    </CustomBox>
  );
};

export default Loader;
