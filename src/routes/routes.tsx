import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/about/About";
import AvailableCamps from "@/pages/availableCamps/AvailableCamps";
import Home from "@/pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router";


const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/camps" element={<AvailableCamps />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AllRoutes;