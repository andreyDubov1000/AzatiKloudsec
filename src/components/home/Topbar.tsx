import XBox from "@component/atoms/XBox";
import { Button, Container, Theme, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/system";
import clsx from "clsx";
import { debounce } from "lodash";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

const fixedTopbarHeight = 64;
const normalTopbarHeight = 128;
const sidenavWidth = 260;

const useStyles = makeStyles(({ palette, ...theme }: Theme) => ({
  topbarNormal: {
    height: normalTopbarHeight,
    display: "flex",
    alignItems: "center",
    background: "transparent",
    color: palette.primary.contrastText,
    transition: "height 250ms cubic-bezier(0.17, 0.67, 0.83, 0.67)",
  },
  topbarFixed: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    color: palette.text.primary,
    height: fixedTopbarHeight,
    background: palette.background.paper,
    boxShadow: theme.shadows[3],
    zIndex: 999,
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      bottom: 0,
      right: "unset",
      width: sidenavWidth,
      left: (props: any) => (props.isSidebarOpen ? 0 : -sidenavWidth),
      alignItems: "flex-start",
      overflow: "auto",
      transition: "all 250ms cubic-bezier(0.17, 0.67, 0.83, 0.67)",
    },
  },

  // new code
  linkButton: {
    margin: "0px 0.25rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
}));

const Topbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTopbarFixed, setTopbarFixed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles({ isSidebarOpen });

  let scrollableElement =
    document.querySelector(".scrollable-content") || window;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollListener = useCallback(
    debounce(({ target: { scrollTop } }: any) => {
      let scrollY = scrollTop || window.scrollY;
      scrollY > 128 ? setTopbarFixed(true) : setTopbarFixed(false);
    }, 18),
    []
  );

  const toggleSidenav = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    scrollableElement.addEventListener("scroll", scrollListener);
    return () => {
      scrollableElement.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener, scrollableElement]);

  useEffect(() => {
    if (isMobile) {
      setTopbarFixed(true);
      scrollableElement.removeEventListener("scroll", scrollListener);
    } else scrollableElement.addEventListener("scroll", scrollListener);
  }, [isMobile, scrollListener, scrollableElement]);

  return (
    <Fragment>
      <div
        className={clsx({
          [classes.topbarNormal]: true,
          [classes.topbarFixed]: isTopbarFixed,
        })}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={isTopbarFixed ? "/logo.svg" : "/logo-white.svg"}
            height="36px"
            alt="logo"
          />

          <Box sx={{ display: "flex" }}>
            <Scroll
              to="intro1"
              duration={400}
              smooth={true}
              onClick={toggleSidenav}
            >
              <Button className={classes.linkButton}>Home</Button>
            </Scroll>
            <Scroll
              to="services1"
              smooth={true}
              duration={400}
              onClick={toggleSidenav}
              offset={isTopbarFixed ? (isMobile ? 0 : -fixedTopbarHeight) : -65}
            >
              <Button className={classes.linkButton}>Services</Button>
            </Scroll>
            <Scroll
              to="pricing"
              smooth={true}
              duration={400}
              onClick={toggleSidenav}
              offset={isTopbarFixed ? (isMobile ? 0 : -fixedTopbarHeight) : -65}
            >
              <Button className={classes.linkButton}>Pricing</Button>
            </Scroll>
            <Scroll
              to="testimonial2"
              smooth={true}
              duration={400}
              onClick={toggleSidenav}
              offset={isTopbarFixed ? (isMobile ? 0 : -fixedTopbarHeight) : -65}
            >
              <Button className={classes.linkButton}>Reviews</Button>
            </Scroll>
            <Scroll
              to="contact1"
              smooth={true}
              duration={400}
              onClick={toggleSidenav}
              offset={
                isTopbarFixed
                  ? isMobile
                    ? -80
                    : -(fixedTopbarHeight + 80)
                  : -145
              }
            >
              <Button className={classes.linkButton}>Contact</Button>
            </Scroll>
            <Link to="/login" onClick={toggleSidenav}>
              <Button className={classes.linkButton}>Login</Button>
            </Link>
          </Box>
        </Container>
      </div>
      <XBox
        sx={{ height: isTopbarFixed ? normalTopbarHeight : 0, width: "100%" }}
      ></XBox>
    </Fragment>
  );
};

export default Topbar;
