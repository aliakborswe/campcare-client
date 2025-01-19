import AddCamp from "@/dashboard/admin/AddCamp";
import AdminProfile from "@/dashboard/admin/AdminProfile";
import ManageCamp from "@/dashboard/admin/ManageCamp";
import ManageRegisteredCamp from "@/dashboard/admin/ManageRegisteredCamp";
import DashboardLayout from "@/dashboard/dashboard/DashboardLayout";
import Analytics from "@/dashboard/user/Analytics";
import PaymentHistory from "@/dashboard/user/PaymentHistory";
import RegisteredCamps from "@/dashboard/user/RegisteredCamps";
import UserProfile from "@/dashboard/user/UserProfile";
import ErrorPage from "@/error-page";
import BaseLayout from "@/layouts/BaseLayout";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/about/About";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AvailableCamps from "@/pages/availableCamps/AvailableCamps";
import Home from "@/pages/home/Home";
import { Route, Routes } from "react-router";
import PrivateRoute from "./PrivetRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='camps' element={<AvailableCamps />} />
        <Route path='about' element={<About />} />
      </Route>
      {/* Auth route with base layout */}
      <Route element={<BaseLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      {/* Dashboard routes && private route */}
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* <Route index element={<div>Dashboard</div>} /> */}
        {/* user routes */}
        <Route path='analytics' element={<Analytics />} />
        <Route path='user-profile' element={<UserProfile />} />
        <Route path='registered-camp' element={<RegisteredCamps />} />
        <Route path='payment-history' element={<PaymentHistory />} />
        {/* admin routes */}
        <Route path='admin-profile' element={<AdminProfile />} />
        <Route path='add-camp' element={<AddCamp />} />
        <Route path='manage-camp' element={<ManageCamp />} />
        <Route
          path='manage-registered-camp'
          element={<ManageRegisteredCamp />}
        />
      </Route>
      {/* error route without header and footer */}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
