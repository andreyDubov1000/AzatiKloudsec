import { Container, Grid } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React from "react";

const Section2 = () => {
  return (
    <Box py="5rem">
      <Container>
        <Grid container spacing={4}>
          {[...new Array(12)].map((item, ind) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={ind}>
              <img
                src="/assets/images/demo-company.png"
                width="100%"
                alt="demo-company"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section2;
