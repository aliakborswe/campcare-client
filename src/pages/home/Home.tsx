import SendEmail from "@/components/common/SendEmail";
import Banner from "./Banner";
import PopularCamps from "./PopularCamps";
import Review from "./Review";
import FAQ from "./FAQ";


const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularCamps/>
            <Review/>
            <SendEmail/>
            <FAQ/>
        </div>
    );
};

export default Home;