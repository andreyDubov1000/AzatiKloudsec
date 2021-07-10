import { landingConstants } from "@data/constants";
import { styled } from "@material-ui/core/styles";

const TopbarWrapper = styled("div")(({ theme: { palette, ...theme } }) => ({
  "& .topbar": {
    height: landingConstants.normalTopbarHeight,
    display: "flex",
    alignItems: "center",
    background: "transparent",
    color: palette.primary.contrastText,
    transition: "height 250ms cubic-bezier(0.17, 0.67, 0.83, 0.67)",
  },
  "& .topbar-fixed": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    color: palette.text.primary,
    height: landingConstants.fixedTopbarHeight,
    background: palette.background.paper,
    boxShadow: theme.shadows[3],
    zIndex: 999,
  },

  "& .button-link": {
    margin: "0px 0.25rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
}));

export default TopbarWrapper;
