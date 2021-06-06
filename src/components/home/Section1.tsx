import XBox from "@component/XBox";
import { Button, Container, Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link as Scroll } from "react-scroll";
import Topbar from "./Topbar";

const useStyles = makeStyles(({ palette, ...theme }: Theme) => ({
  section: {
    backgroundImage: "linear-gradient(#6E5BFF, #5727C2)",
    paddingBottom: "5rem",
  },
}));

const Section1 = () => {
  const classes = useStyles();

  return (
    <section className={classes.section} id="intro1">
      <Topbar />

      <Container sx={{ color: "white" }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item sm={6} xs={12}>
            <XBox>
              <Typography variant="h4" letterSpacing={1.1} gutterBottom>
                Automate your infrastructure <br /> security from commit to{" "}
                <br /> cloud
              </Typography>
            </XBox>

            <Typography variant="body1" gutterBottom>
              Streamline cloud security and enforce policies throughout the
              entire development lifecycle.
            </Typography>

            <div className="flex">
              <Scroll
                to="contact1"
                duration={400}
                smooth={true}
                offset={-2 * 128}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: "1rem" }}
                >
                  Get Service
                </Button>
              </Scroll>
              <a
                href="https://www.fiverr.com/shahalihridoy"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    borderColor: "rgba(255,255,255,0.53)",
                    color: "white",
                  }}
                >
                  Fiverr
                </Button>
              </a>
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div>
              <img
                src="/assets/images/business-1.svg"
                alt="business1"
                width="100%"
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Section1;
