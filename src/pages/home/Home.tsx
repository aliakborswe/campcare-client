import SendEmail from "@/components/common/SendEmail";
import Banner from "./Banner";
import PopularCamps from "./PopularCamps";


const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularCamps/>
            <SendEmail/>
        </div>
    );
};

export default Home;