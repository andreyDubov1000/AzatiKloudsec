import CustomAccordion from "@component/atoms/CustomAccordion";
import CustomBox from "@component/atoms/CustomBox";
import CustomImage from "@component/atoms/CustomImage";
import Sidenav from "@component/atoms/Sidenav";
import topbarNavigations from "@data/topbarNavigations";
import { Button, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

export interface LandingSidenavProps {
  isTopbarFixed: boolean;
  isMobile: boolean;
  fixedTopbarHeight: number;
}

const LandingSidenav: React.FC<LandingSidenavProps> = ({
  isTopbarFixed,
  isMobile,
  fixedTopbarHeight,
}) => {
  const [isSidenavOpen, setSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setSidenavOpen((open) => !open);
  };

  return (
    <Sidenav
      width="75%"
      open={isSidenavOpen}
      toggleSidenav={toggleSidenav}
      handle={
        <IconButton sx={{ position: "absolute", left: "0.25rem" }}>
          <Menu
            sx={{
              color: isTopbarFixed ? "inherit" : "primary.contrastText",
            }}
          />
        </IconButton>
      }
    >
      <CustomBox sx={{ p: "1rem", width: "100%" }}>
        <Scroll
          to="intro1"
          duration={400}
          smooth={true}
          offset={isTopbarFixed ? (isMobile ? 0 : -fixedTopbarHeight) : -65}
          onClick={toggleSidenav}
        >
          <CustomImage
            src="/logo.svg"
            height="36px"
            alt="logo"
            sx={{ display: "block", mx: "auto", mb: "2rem" }}
          />
        </Scroll>

        {topbarNavigations.map((item, ind) =>
          item.children ? (
            <CustomAccordion
              title={item.title}
              buttonSx={{ mb: "0.25rem" }}
              key={item.title}
            >
              <CustomBox sx={{ bgcolor: "grey.100" }}>
                {item.children.map((child) =>
                  child.extlink ? (
                    <a
                      href={child.extlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={child.title}
                    >
                      <Button
                        fullWidth
                        sx={{ justifyContent: "flex-start", mb: "0.25rem" }}
                        onClick={toggleSidenav}
                      >
                        {child.title}
                      </Button>
                    </a>
                  ) : (
                    <Link to={`${child.url}`} key={child.title}>
                      <Button
                        fullWidth
                        sx={{ justifyContent: "flex-start", mb: "0.25rem" }}
                        onClick={toggleSidenav}
                      >
                        {child.title}
                      </Button>
                    </Link>
                  )
                )}
              </CustomBox>
            </CustomAccordion>
          ) : item.sectionId ? (
            <Scroll
              to={item.sectionId}
              duration={400}
              smooth={true}
              key={item.title}
              offset={isTopbarFixed ? (isMobile ? 0 : -fixedTopbarHeight) : -65}
              onClick={toggleSidenav}
            >
              <Button
                fullWidth
                sx={{ justifyContent: "flex-start", mb: "0.25rem" }}
              >
                {item.title}
              </Button>
            </Scroll>
          ) : (
            <Link to={item.url || "/"} key={item.title}>
              <Button
                fullWidth
                sx={{ justifyContent: "flex-start", mb: "0.25rem" }}
                onClick={toggleSidenav}
              >
                {item.title}
              </Button>
            </Link>
          )
        )}
      </CustomBox>
    </Sidenav>
  );
};

export default LandingSidenav;
