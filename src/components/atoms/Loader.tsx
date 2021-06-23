import React from "react";
import CustomBox from "./CustomBox";

const Loader = () => {
  return (
    <CustomBox
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
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
