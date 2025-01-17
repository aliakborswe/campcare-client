import DashboardLayout from "@/dashboard/dashboard/DashboardLayout";
import BaseLayout from "@/layouts/BaseLayout";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/about/About";
import Login from "@/pages/auth/Login";
import AvailableCamps from "@/pages/availableCamps/AvailableCamps";
import Home from "@/pages/home/Home";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
    return (
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/camps' element={<AvailableCamps />} />
            <Route path='/about' element={<About />} />
          </Route>
          {/* Dashboard routes */}
          <Route path='/dashboard' element={<DashboardLayout />}>
            {/* <Route index element={<Dashboard />} /> */}
          </Route>
          {/* Auth route with base layout */}
          <Route path="/" element={<BaseLayout/>}>
            <Route path="/login" element={<Login/>}/>
          </Route>
        </Routes>
    );
};

export default AppRoutes;