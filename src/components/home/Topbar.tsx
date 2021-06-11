import FlexBox from "@component/atoms/FlexBox";
import XBox from "@component/atoms/XBox";
import XImage from "@component/atoms/XImage";
import {
  Button,
  Card,
  Container,
  MenuItem,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/system";
import clsx from "clsx";
import { debounce } from "lodash";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import topbarNavigations from "./topbarNavigations";

const fixedTopbarHeight = 64;
const normalTopbarHeight = 128;
// const sidenavWidth = 260;

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
  },

  // new code
  linkButton: {
    margin: "0px 0.25rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
}));

const Topbar = () => {
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTopbarFixed, setTopbarFixed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

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

  // const toggleSidenav = () => {
  //   setSidebarOpen(!isSidebarOpen);
  // };

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
          <Scroll
            to="intro1"
            duration={400}
            smooth={true}
            offset={isTopbarFixed ? (isMobile ? 0 : -fixedTopbarHeight) : -65}
          >
            <XImage
              src={isTopbarFixed ? "/logo.svg" : "/logo-white.svg"}
              height="36px"
              alt="logo"
              sx={{ cursor: "pointer" }}
            />
          </Scroll>

          <FlexBox sx={{ flexWrap: "wrap" }}>
            {topbarNavigations.map((item) =>
              item.children ? (
                <Box
                  position="relative"
                  sx={{
                    "&:hover": { "& .dropdown-menu": { display: "block" } },
                  }}
                  key={item.title}
                >
                  <Button className={classes.linkButton}>{item.title}</Button>
                  <Box
                    className="dropdown-menu"
                    display="none"
                    position="absolute"
                    top="100%"
                  >
                    <Card
                      elevation={6}
                      sx={{ minWidth: 120, marginTop: "0.8rem" }}
                    >
                      {item.children.map((child, ind) => (
                        <Link to={child.url} key={child.title}>
                          <a href={child.url}>
                            <MenuItem>{child.title}</MenuItem>
                          </a>
                        </Link>
                      ))}
                    </Card>
                  </Box>
                </Box>
              ) : item.sectionId ? (
                <Scroll
                  to={item.sectionId}
                  duration={400}
                  smooth={true}
                  key={item.title}
                  offset={
                    isTopbarFixed ? (isMobile ? 0 : -fixedTopbarHeight) : -65
                  }
                >
                  <Button className={classes.linkButton}>{item.title}</Button>
                </Scroll>
              ) : (
                <Link to={item.url || "/"} key={item.title}>
                  <a href={item.url}>
                    <Button
                      className={classes.linkButton}
                      variant={item.outlined ? "outlined" : "text"}
                      sx={{ borderRadius: item.outlined ? "300px" : "4px" }}
                    >
                      {item.title}
                    </Button>
                  </a>
                </Link>
              )
            )}
          </FlexBox>
        </Container>
      </div>
      <XBox
        sx={{ height: isTopbarFixed ? normalTopbarHeight : 0, width: "100%" }}
      ></XBox>
    </Fragment>
  );
};

export default Topbar;
