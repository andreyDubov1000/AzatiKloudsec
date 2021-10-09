import CustomImage from "@component/atoms/CustomImage";
import { Container, Grid } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React from "react";

const DevTeam = () => {
  return (
    <Box py="5rem" id="products">
      <Container>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {compnayLogoList.map((item, ind) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={ind}>
              <CustomImage
                src={item}
                width="100%"
                alt="company"
                sx={{ display: "block", maxWidth: 100, mx: "auto" }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const compnayLogoList = [
  "/assets/images/company/Cloudinit_Logo.png",
  "/assets/images/company/mangrove.svg",
  "/assets/images/company/logo-amcs-mail.png",
];

export default DevTeam;
