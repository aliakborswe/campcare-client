import SendEmail from "@/components/common/SendEmail";
import Banner from "./Banner";
import PopularCamps from "./PopularCamps";
import Review from "./Review";
import FAQ from "./FAQ";
import { Helmet } from "react-helmet-async";
import OurServices from "./OurServices";
import WorkingProcess from "./WorkingProcess";
import Comprehensive from "./Comprehensive";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | CampCare+</title>
      </Helmet>
      <Banner />
      <WorkingProcess/>
      <PopularCamps />
      <OurServices/>
      <Review />
      <SendEmail />
      <FAQ />
      <Comprehensive/>
    </div>
  );
};

export default Home;
