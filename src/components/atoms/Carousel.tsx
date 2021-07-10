import { IconButton } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { CSSProperties } from "@material-ui/styles";
import clsx from "clsx";
import {
  ButtonBack,
  ButtonNext,
  DotGroup,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, { Fragment } from "react";
import StyledCarousel from "./Carousel.style";

export interface CarouselProps {
  naturalSlideWidth?: number;
  naturalSlideHeight?: number;
  totalSlides: number;
  visibleSlides?: number;
  currentSlide?: number;
  isIntrinsicHeight?: boolean;
  hasMasterSpinner?: boolean;
  infinite?: boolean;
  autoPlay?: boolean;
  step?: number;
  interval?: number;
  showDots?: boolean;
  showArrow?: boolean;
  showArrowOnHover?: boolean;
  dotClass?: string;
  dotColor?: string;
  dotGroupMarginTop?: string;
  spacing?: string;
  arrowButtonColor?: "primary" | "secondary";
  arrowButtonClass?: string;
  leftButtonClass?: string;
  rightButtonClass?: string;
  leftButtonStyle?: CSSProperties;
  rightButtonStyle?: CSSProperties;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  naturalSlideWidth,
  naturalSlideHeight,
  totalSlides,
  visibleSlides,
  currentSlide,
  isIntrinsicHeight,
  hasMasterSpinner,
  infinite,
  autoPlay,
  step,
  interval,
  showDots,
  showArrow,
  showArrowOnHover,
  dotClass,
  dotColor,
  dotGroupMarginTop,
  spacing,
  arrowButtonClass,
  leftButtonClass,
  rightButtonClass,
  leftButtonStyle,
  rightButtonStyle,
}) => {
  return (
    <StyledCarousel
      naturalSlideWidth={naturalSlideWidth || 100}
      naturalSlideHeight={naturalSlideHeight || 125}
      totalSlides={totalSlides}
      visibleSlides={visibleSlides}
      isIntrinsicHeight={isIntrinsicHeight}
      hasMasterSpinner={hasMasterSpinner}
      infinite={infinite}
      isPlaying={autoPlay}
      step={step}
      interval={interval}
      currentSlide={currentSlide}
      spacing={spacing}
      dotColor={dotColor}
      showDots={showDots}
      dotGroupMarginTop={dotGroupMarginTop}
      showArrowOnHover={showArrowOnHover}
    >
      <Slider className="slider">
        {React.Children.map(children, (child, ind) => (
          <Slide index={ind}>{child}</Slide>
        ))}
      </Slider>

      {showDots && (
        <DotGroup
          className={clsx("dot-group", dotClass)}
          renderDots={(props: any) => renderDots({ ...props, step })}
        />
      )}

      {showArrow && (
        <Fragment>
          <IconButton
            className={clsx(
              "arrow-button",
              "left-arrow-button",
              arrowButtonClass,
              leftButtonClass
            )}
            LinkComponent={ButtonBack}
            style={leftButtonStyle || {}}
          >
            <ArrowBack fontSize="small" color="inherit" />
          </IconButton>
          <IconButton
            className={clsx(
              "arrow-button",
              "right-arrow-button",
              arrowButtonClass,
              rightButtonClass
            )}
            LinkComponent={ButtonNext}
            // color={arrowButtonColor}
            style={rightButtonStyle || {}}
          >
            <ArrowForward fontSize="small" color="inherit" />
          </IconButton>
        </Fragment>
      )}
    </StyledCarousel>
  );
};

const renderDots = ({
  step,
  currentSlide,
  visibleSlides,
  totalSlides,
  carouselStore,
}: any) => {
  const dots = [];
  const total = totalSlides - visibleSlides + 1;

  for (let i = 0; i < total; i += step) {
    dots.push(
      <div
        key={i}
        className={clsx({
          dot: true,
          "dot-active": currentSlide === i,
        })}
        onClick={() =>
          carouselStore.setStoreState({
            currentSlide: i,
            autoPlay: false,
          })
        }
      />
    );

    if (total - i - 1 < step && total - i - 1 !== 0) {
      dots.push(
        <div
          key={i + total}
          className={clsx({
            dot: true,
            "dot-active": currentSlide === totalSlides - visibleSlides,
          })}
          onClick={() =>
            carouselStore.setStoreState({
              currentSlide: totalSlides - visibleSlides,
              autoPlay: false,
            })
          }
        />
      );
    }
  }
  return dots;
};

Carousel.defaultProps = {
  naturalSlideWidth: 100,
  naturalSlideHeight: 125,
  totalSlides: 10,
  visibleSlides: 5,
  isIntrinsicHeight: true,
  hasMasterSpinner: false,
  infinite: false,
  autoPlay: false,
  step: 1,
  interval: 2000,
  showDots: true,
  showArrow: false,
  dotGroupMarginTop: "2rem",
  spacing: "1.5rem",
  arrowButtonColor: "secondary",
};

export default Carousel;
