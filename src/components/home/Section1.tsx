import FlexBox from "@component/atoms/FlexBox";
import { H1, Paragraph } from "@component/atoms/Typography";
import XBox from "@component/atoms/XBox";
import { Button, Container, Grid, Theme } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link as Scroll } from "react-scroll";
import Topbar from "./Topbar";

const useStyles = makeStyles(({ palette, ...theme }: Theme) => ({
  section: {
    // backgroundImage: "linear-gradient(#6E5BFF, #5727C2)",
    backgroundImage: `linear-gradient(${alpha(palette.primary.main, 0.85)}, ${
      palette.primary.main
    })`,
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
              <H1 mb="1.5rem" fontSize="36px" letterSpacing={1.1}>
                Automate your infrastructure <br /> security from commit to{" "}
                <br /> cloud
              </H1>
            </XBox>

            <Paragraph fontSize="17px" color="whitesmoke" mb="1.5rem">
              Streamline cloud security and enforce policies throughout the
              entire development lifecycle.
            </Paragraph>

            <FlexBox sx={{ m: "-0.5rem", flexWrap: "wrap" }}>
              <Scroll
                to="contact1"
                duration={400}
                smooth={true}
                offset={-2 * 128}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  sx={{
                    m: "0.5rem",
                    px: "1.5rem",
                    borderRadius: 300,
                    // whiteSpace: "pre",
                  }}
                >
                  Get Started For Free
                </Button>
              </Scroll>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  borderColor: "rgba(255,255,255,0.53)",
                  color: "white",
                  px: "1.5rem",
                  m: "0.5rem",
                  borderRadius: 300,
                  // whiteSpace: "pre",
                }}
              >
                Schedule A Demo
              </Button>
            </FlexBox>
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
