import CustomBox from "@component/atoms/CustomBox";
import FlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import { landingConstants } from "@data/constants";
import {
  Button,
  Card,
  Container,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { ArrowDropDown } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import clsx from "clsx";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import topbarNavigations from "../../data/topbarNavigations";
import LandingSidenav from "./LandingSidenav";
import TopbarWrapper from "./Topbar.style";

const Topbar = () => {
  const [isTopbarFixed, setTopbarFixed] = useState(false);
  const [navList, setNavList] = useState(topbarNavigations);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { normalTopbarHeight, fixedTopbarHeight } = landingConstants;

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

  useEffect(() => {
    const tokenString = localStorage.getItem("token");

    if (tokenString) {
      const list = topbarNavigations.filter(
        (item) => !["/login", "/signup"].includes(item.url || "")
      );

      list.push({
        title: "Dashboard",
        url: "/dashboard/risk-management",
        outlined: true,
      });

      setNavList(list);
    }
  }, []);

  return (
    <TopbarWrapper>
      <div
        className={clsx({
          topbar: true,
          "topbar-fixed": isTopbarFixed,
        })}
      >
        {/* Mobile Topbar */}
        <FlexBox
          sx={{
            display: {
              sm: "flex",
              md: "none",
            },
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <LandingSidenav
            isTopbarFixed={isTopbarFixed}
            isMobile={isMobile}
            fixedTopbarHeight={fixedTopbarHeight}
          />

          <Scroll
            to="intro1"
            duration={400}
            smooth={true}
            offset={isTopbarFixed ? (isMobile ? 0 : -fixedTopbarHeight) : -65}
          >
            <CustomImage
              src={isTopbarFixed ? "/logo.svg" : "/logo-white.svg"}
              height="36px"
              alt="logo"
              sx={{ display: "block" }}
            />
          </Scroll>
        </FlexBox>

        {/* Desktop Topbar */}
        <Container
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
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
            <CustomImage
              src={isTopbarFixed ? "/logo.svg" : "/logo-white.svg"}
              height="36px"
              alt="logo"
              sx={{ cursor: "pointer" }}
            />
          </Scroll>

          <FlexBox sx={{ flexWrap: "wrap" }}>
            {navList.map((item, ind) =>
              item.children ? (
                <Box
                  position="relative"
                  sx={{
                    "&:hover": { "& .dropdown-menu": { display: "block" } },
                  }}
                  key={item.title}
                >
                  <Button
                    className="button-link"
                    sx={{ pr: "0.5rem !important" }}
                  >
                    {item.title}
                    <ArrowDropDown fontSize="small" sx={{ ml: "2px" }} />
                  </Button>
                  <Box
                    className="dropdown-menu"
                    display="none"
                    position="absolute"
                    top="100%"
                  >
                    <Card
                      elevation={6}
                      sx={{ minWidth: 120, marginTop: "0.8rem", py: "0.25rem" }}
                    >
                      {item.children.map((child, ind) => (
                        <Link to={child.url} key={child.title}>
                          <MenuItem>{child.title}</MenuItem>
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
                  <Button className="button-link">{item.title}</Button>
                </Scroll>
              ) : (
                <Link to={item.url || "/"} key={item.title}>
                  <Button
                    className="button-link"
                    variant={item.outlined ? "outlined" : "text"}
                    sx={{
                      borderRadius: item.outlined ? "300px" : "4px",
                      marginRight:
                        ind === topbarNavigations.length - 1
                          ? "0px !important"
                          : "0.25rem",
                    }}
                  >
                    {item.title}
                  </Button>
                </Link>
              )
            )}
          </FlexBox>
        </Container>
      </div>
      <CustomBox
        sx={{ height: isTopbarFixed ? normalTopbarHeight : 0, width: "100%" }}
      ></CustomBox>
    </TopbarWrapper>
  );
};

export default Topbar;
