import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import Sidenav from "@component/atoms/Sidenav";
import { H5, H6 } from "@component/atoms/Typography";
import AWSIcon from "@component/icons/AWSIcon";
import { Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";

const Integration = () => {
  const [sidenavOpen, setSidenavOpen] = useState(false);

  const toggleSidenav = async () => {
    setSidenavOpen(!sidenavOpen);
  };

  return (
    <CustomBox>
      <CustomFlexBox
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <CustomFlexBox
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <IconButton sx={{ bgcolor: "grey.100", p: "0.5rem", mr: "1rem" }}>
            <AWSIcon fontSize="large" />
          </IconButton>
          <H5>AWS Read Only</H5>
        </CustomFlexBox>

        <Sidenav
          open={sidenavOpen}
          position="right"
          width="40%"
          toggleSidenav={toggleSidenav}
          handle={
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "300px" }}
            >
              ADD ACCOUNT
            </Button>
          }
        >
          <CustomBox sx={{ p: "2rem 4rem" }}>
            <IconButton onClick={toggleSidenav}>
              <Close fontSize="small" />
            </IconButton>

            <H6>Add an Account</H6>
          </CustomBox>
        </Sidenav>
      </CustomFlexBox>
    </CustomBox>
  );
};

export default Integration;
