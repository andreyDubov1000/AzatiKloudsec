import Carousel from "@component/atoms/Carousel";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React from "react";
import CustomerStory from "./CustomerStory";

const Section3 = () => {
  return (
    <Box py="5rem" id="customers">
      <Container>
        <Carousel totalSlides={4} visibleSlides={1} autoPlay>
          <CustomerStory />
          <CustomerStory />
          <CustomerStory />
          <CustomerStory />
        </Carousel>
      </Container>
    </Box>
  );
};

export default Section3;
