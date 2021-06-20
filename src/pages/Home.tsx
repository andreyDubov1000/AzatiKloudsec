import DevTeam from "@component/home/DevTeam";
import Footer from "@component/home/Footer";
import Introduction from "@component/home/Introduction";
import Pricing from "@component/home/Pricing";
import Testimonial from "@component/home/Testimonial";
import { Box } from "@material-ui/system";

const Home = () => {
  return (
    <Box bgcolor="white">
      <Introduction />
      <Testimonial />
      <Pricing />
      <DevTeam />
      <Footer />
    </Box>
  );
};

export default Home;
