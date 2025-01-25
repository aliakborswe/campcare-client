import SendEmail from "@/components/common/SendEmail";
import Banner from "./Banner";
import PopularCamps from "./PopularCamps";
import Review from "./Review";


const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularCamps/>
            <Review/>
            <SendEmail/>
        </div>
    );
};

export default Home;