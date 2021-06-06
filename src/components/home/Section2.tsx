import { Container, Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const Section2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <section className="section">
      <Container>
        <div
          className={clsx({
            "max-w-600 text-center mx-auto mb-14": true,
            "mb-8": isMobile,
          })}
        >
          <h1 className="mb-2 m-0 text-28">Why we are different?</h1>
          <p>
            A collection of textile samples lay spread out on the table - Samsa
            was a travelling salesman - and above it there hung a picture that
            he had recently cut out of an illustrated.
          </p>
        </div>

        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item sm={6} xs={12}>
            <div>
              <img
                src="/assets/images/resource-1.svg"
                alt="resource"
                className="w-full"
              />
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <h3 className="font-semibold mb-2">Great Resource</h3>
            <p className="max-w-400">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et.
            </p>
          </Grid>
          <Grid item sm={6} xs={12}>
            <h3 className="font-semibold mb-2">Creative Team</h3>
            <p className="max-w-400">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et.
            </p>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div>
              <img
                src="/assets/images/team-1.svg"
                alt="resource"
                className="w-full"
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Section2;
