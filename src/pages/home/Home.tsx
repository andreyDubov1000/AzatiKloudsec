import PageTitle from "@component/atoms/PageTitle";
import DevTeam from "@component/home/DevTeam";
import Footer from "@component/home/Footer";
import Introduction from "@component/home/Introduction";
import Pricing from "@component/home/Pricing";
import ScheduleDemo from "@component/home/ScheduleDemo";
import Testimonial from "@component/home/Testimonial";
import { Box } from "@material-ui/system";

const Home = () => {
  return (
    <Box bgcolor="white">
      <PageTitle title="KloudSec" />
      <Introduction />
      <Testimonial />
      <Pricing />
      <ScheduleDemo />
      <DevTeam />
      <Footer />
    </Box>
  );
};

export default Home;
