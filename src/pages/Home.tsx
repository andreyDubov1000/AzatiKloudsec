import Section1 from "@component/home/Section1";
import Section2 from "@component/home/Section2";
import Section3 from "@component/home/Section3";
import { Box } from "@material-ui/system";
import React from "react";

const Home = () => {
  return (
    <Box bgcolor="white">
      <Section1 />
      <Section2 />
      <Section3 />
    </Box>
  );
};

export default Home;
