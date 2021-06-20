import Carousel from "@component/atoms/Carousel";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React from "react";
import CustomerStory from "./CustomerStory";

const Testimonial = () => {
  return (
    <Box py="5rem" id="testimonial">
      <Container>
        <Carousel totalSlides={1} visibleSlides={1} autoPlay>
          <CustomerStory />
        </Carousel>
      </Container>
    </Box>
  );
};

export default Testimonial;
