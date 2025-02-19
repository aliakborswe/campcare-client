import SendEmail from "@/components/common/SendEmail";
import Banner from "./Banner";
import PopularCamps from "./PopularCamps";
import Review from "./Review";
import FAQ from "./FAQ";
import { Helmet } from "react-helmet-async";
import OurServices from "./OurServices";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | CampCare+</title>
      </Helmet>
      <Banner />
      <OurServices/>
      <PopularCamps />
      <Review />
      <SendEmail />
      <FAQ />
    </div>
  );
};

export default Home;
