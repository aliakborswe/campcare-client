import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router";


const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AllRoutes;