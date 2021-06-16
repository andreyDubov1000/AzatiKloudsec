import Footer from "@component/home/Footer";
import Section1 from "@component/home/Section1";
import Section2 from "@component/home/Section2";
import Section3 from "@component/home/Section3";
import Section5 from "@component/home/Section5";
import { Box } from "@material-ui/system";

const Home = () => {
  return (
    <Box bgcolor="white">
      <Section1 />
      <Section3 />
      <Section5 />
      <Section2 />
      <Footer />
    </Box>
  );
};

export default Home;
