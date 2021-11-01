import FlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import { H5 } from "@component/atoms/Typography";
import { Container, Grid } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase";
import { alpha, styled } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

const Section = styled("section")(({ theme: { palette } }) => ({
  paddingTop: "5rem",
  paddingBottom: "5rem",
  color: palette.primary.contrastText,
  backgroundImage: `linear-gradient(to left, ${alpha(
    palette.primary.main,
    0.95
  )}, ${palette.primary.dark})`,

  "& .logo": {
    letterSpacing: 2.5,
  },

  "& .ripple-link": {
    width: "100%",
    justifyContent: "flex-start",
    marginLeft: "-1rem",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    textTransform: "capitalize",
    textAlign: "left",
  },
}));

const Footer = () => {
  return (
    <Section id="footer">
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid item md={2} xs={6}>
            <H5 mb="1rem">PRODUCT</H5>
            <Link to="/">
              <TouchRipple className="ripple-link">Features</TouchRipple>
            </Link>
            <Link to="/">
              <TouchRipple className="ripple-link">Use Cases</TouchRipple>
            </Link>
            <Scroll to="pricing" duration={400} smooth={true}>
              <TouchRipple className="ripple-link">Pricing</TouchRipple>
            </Scroll>
          </Grid>

          <Grid item md={2} xs={6}>
            <H5 mb="1rem">SUPPORT</H5>
            {supportLink.map((item, ind) =>
              item.extLink ? (
                <a
                  href={item.extLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={ind}
                >
                  <TouchRipple className="ripple-link" key={ind}>
                    {item.title}
                  </TouchRipple>
                </a>
              ) : (
                <Link to={`${item.url}`} key={ind}>
                  <TouchRipple className="ripple-link">
                    {item.title}
                  </TouchRipple>
                </Link>
              )
            )}
          </Grid>

          <Grid item md={2} xs={6}>
            <H5 mb="1rem">COMPANY</H5>
            {companyLink.map((item, ind) => (
              <Link to={item.url} key={ind}>
                <TouchRipple className="ripple-link">{item.title}</TouchRipple>
              </Link>
            ))}
          </Grid>

          <Grid item md={2} xs={6}>
            <FlexBox
              sx={{ flexDirection: "column", alignItems: "center", width: 84 }}
            >
              <CustomImage
                src="logo-white.svg"
                alt="KloudSec"
                height="44px"
                sx={{ mb: "1rem" }}
              />
              <FlexBox>
                {socialLinks.map((item, ind) => (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={ind}
                  >
                    <CustomImage
                      src={item.imgUrl}
                      alt="social-icon"
                      width="20px"
                      height="20px"
                      sx={{ mx: "0.25rem" }}
                    />
                  </a>
                ))}
              </FlexBox>
            </FlexBox>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};

const supportLink = [
  {
    title: "Blog",
    extLink: "https://kloudsec.medium.com",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
  {
    title: "Support",
    url: "/",
  },
];

const companyLink = [
  {
    title: "About",
    url: "/about-ur",
  },
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    title: "Terms of Service",
    url: "/terms-of-service",
  },
];

const socialLinks = [
  {
    imgUrl: "/assets/images/github.svg",
    url: "https://github.com/CloudinitFrance",
  },
  {
    imgUrl: "/assets/images/twitter.svg",
    url: "https://twitter.com/cloudinit",
  },
  {
    imgUrl: "/assets/images/youtube.svg",
    url: "https://www.youtube.com/`",
  },
];

export default Footer;
