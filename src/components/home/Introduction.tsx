import CustomBox from "@component/atoms/CustomBox";
import FlexBox from "@component/atoms/CustomFlexBox";
import { H1, Paragraph } from "@component/atoms/Typography";
import { Button, Container, Grid, Theme } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link as Scroll } from "react-scroll";
import Topbar from "./Topbar";

const useStyles = makeStyles(({ palette, ...theme }: Theme) => ({
  section: {
    // backgroundImage: "linear-gradient(#6E5BFF, #5727C2)",
    backgroundImage: `linear-gradient(to left, ${alpha(
      palette.primary.main,
      0.85
    )}, ${palette.primary.dark})`,
    paddingBottom: "5rem",
  },
}));

const Introduction = () => {
  const classes = useStyles();

  return (
    <section className={classes.section} id="intro1">
      <Topbar />

      <Container sx={{ color: "white" }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item sm={6} xs={12}>
            <CustomBox>
              <H1 mb="1.5rem" fontSize="36px" letterSpacing={1.1}>
                Automate your cloud infrastructure <br /> security from commit
                to <br /> deployment
              </H1>
            </CustomBox>

            <Paragraph fontSize="17px" color="whitesmoke" mb="1.5rem">
              Scan your cloud infrastructure and enforce the security of your
              entire assets.
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
                  color="primary"
                  sx={{
                    m: "0.5rem",
                    px: "1.5rem",
                    borderRadius: 300,
                    boxShadow: "0px 11px 10px rgba(0, 0, 0, 0.18)",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
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
                }}
              >
                Schedule A Demo
              </Button>
            </FlexBox>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div>
              <img src="/assets/images/intro.svg" alt="intro" width="100%" />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Introduction;
