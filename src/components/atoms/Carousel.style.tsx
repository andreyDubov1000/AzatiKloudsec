import { styled } from "@material-ui/core/styles";
import { CarouselProvider, CarouselProviderProps } from "pure-react-carousel";

type StyledCarouselProps = {
  spacing?: string;
  showDots?: boolean;
  dotColor?: string;
  dotGroupMarginTop?: string;
  showArrowOnHover?: boolean;
};

const StyledCarousel = styled(
  ({
    spacing,
    showDots,
    dotColor,
    dotGroupMarginTop,
    showArrowOnHover,
    ...rest
  }: CarouselProviderProps & StyledCarouselProps) => (
    <CarouselProvider {...rest} />
  )
)<StyledCarouselProps>(({ theme: { palette, breakpoints }, ...props }) => ({
  position: "relative",
  minWidth: 0,

  "& .focusRing___1airF.carousel__slide-focus-ring": {
    outline: "none !important",
  },

  "& .carousel__inner-slide": {
    margin: "auto",
    width: `calc(100% - ${props.spacing || "0px"})`,
  },

  "&:hover .arrow-button": {
    display: "block",
  },

  "& .slider": {
    marginLeft: `calc(-1 * ${props.spacing || "0px"} / 2)`,
    marginRight: `calc(-1 * ${props.spacing || "0px"} / 2)`,
  },

  "& .dot-group": {
    display: "flex",
    justifyContent: "center",
    marginTop: props.dotGroupMarginTop || "0px",
  },

  "& .dot": {
    position: "relative",
    height: 16,
    width: 16,
    borderRadius: 300,
    margin: "0.25rem",
    cursor: "pointer",
    border: `1px solid
        ${props.dotColor || palette.primary.main}`,

    "&:after": {
      position: "absolute",
      content: '" "',
      height: 9,
      width: 9,
      top: "50%",
      left: "50%",
      borderRadius: 300,
      transform: "translate(-50%, -50%) scaleX(0)",
      background: props.dotColor || palette.primary.main,
    },
  },

  "& .dot-active": {
    "&:after": {
      transform: "translate(-50%, -50%) scaleX(1)",
    },
  },

  "& .arrow-button": {
    display: props.showArrowOnHover ? "none" : "block",
    position: "absolute",
    transform: "translateY(-50%)",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    background: palette.secondary.main,
    color: palette.secondary.contrastText,
    top: `calc(
          50% - ${props.showDots ? props.dotGroupMarginTop : "0px"}
        )`,

    "&:disabled": {
      background: palette.text.disabled,
      color: palette.secondary.main,
    },
    "&:hover:not(:disabled)": {
      background: palette.secondary.main,
      color: palette.secondary.contrastText,
    },

    [breakpoints.down("xs")]: {
      display: "block !important",
    },
  },

  "& .right-arrow-button": {
    right: "-22px",
  },
  "& .left-arrow-button": {
    left: "-22px",
  },

  [breakpoints.down("md")]: {
    "& .right-arrow-button": {
      right: "-16px",
    },
    "& .left-arrow-button": {
      left: "-16px",
    },
  },
}));

export default StyledCarousel;
