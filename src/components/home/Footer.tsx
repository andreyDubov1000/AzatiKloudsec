import FlexBox from "@component/atoms/FlexBox";
import { H5 } from "@component/atoms/Typography";
import XImage from "@component/atoms/XImage";
import { Container, Grid, Theme } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase";
import { alpha } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(({ palette, ...theme }: Theme) => ({
  section: {
    paddingTop: "5rem",
    paddingBottom: "5rem",
    color: palette.primary.contrastText,
    backgroundImage: `linear-gradient(${alpha(palette.primary.main, 0.85)}, ${
      palette.primary.main
    })`,
  },
  logo: {
    letterSpacing: 2.5,
  },
  rippleLink: {
    width: "100%",
    justifyContent: "flex-start",
    marginLeft: "-1rem",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    textTransform: "capitalize",
  },
}));

const Footer = () => {
  const classes = useStyles();
  const productLink = ["feature", "use cases", "pricing"];
  const supportLink = ["Blog", "FAQ", "Support"];
  const companyLink = ["About", "Privacy Policy", "Terms of Service"];

  return (
    <section className={classes.section} id="footer">
      <Container>
        <Grid container spacing={3}>
          <Grid item md={2} xs={6}>
            <H5 mb="1rem">PRODUCT</H5>

            {productLink.map((item, ind) => (
              <TouchRipple className={classes.rippleLink} key={ind}>
                {item}
              </TouchRipple>
            ))}
          </Grid>
          <Grid item md={2} xs={6}>
            <H5 mb="1rem">SUPPORT</H5>

            {supportLink.map((item, ind) => (
              <TouchRipple className={classes.rippleLink} key={ind}>
                {item}
              </TouchRipple>
            ))}
          </Grid>
          <Grid item md={2} xs={6}>
            <H5 mb="1rem">COMPANY</H5>

            {companyLink.map((item, ind) => (
              <TouchRipple className={classes.rippleLink} key={ind}>
                {item}
              </TouchRipple>
            ))}
          </Grid>
          <Grid item md={2} xs={6}>
            <H5 mb="1rem">FEATURES</H5>

            {productLink.map((item, ind) => (
              <TouchRipple className={classes.rippleLink} key={ind}>
                {item}
              </TouchRipple>
            ))}
          </Grid>
          <Grid item md={2} xs={6}>
            <H5 mb="1rem">FREQUENT LINKS</H5>

            {supportLink.map((item, ind) => (
              <TouchRipple className={classes.rippleLink} key={ind}>
                {item}
              </TouchRipple>
            ))}
          </Grid>
          <Grid item md={2} xs={6}>
            <FlexBox
              sx={{ flexDirection: "column", alignItems: "center", width: 84 }}
            >
              <XImage
                src="logo-white.svg"
                alt="KloudSec"
                width="64px"
                sx={{ mb: "1rem" }}
              />

              <FlexBox>
                {socialLinks.map((item, ind) => (
                  <XImage
                    src={item.imgUrl}
                    alt="social-icon"
                    width="20px"
                    height="20px"
                    sx={{ mx: "0.25rem", cursor: "pointer" }}
                    key={ind}
                  />
                ))}
              </FlexBox>
            </FlexBox>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

const socialLinks = [
  {
    imgUrl: "/assets/images/facebook.svg",
  },
  {
    imgUrl: "/assets/images/twitter.svg",
  },
  {
    imgUrl: "/assets/images/youtube.svg",
  },
];

export default Footer;
