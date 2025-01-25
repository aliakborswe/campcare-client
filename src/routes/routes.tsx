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
import CheckRole from "./CheckRole";
import CampDetails from "@/pages/campDetails/CampDetails";
import Dashboard from "@/dashboard/dashboard/Dashboard";
import Payment from "@/dashboard/user/Payment";
import UpdateCamp from "@/dashboard/admin/UpdateCamp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='camps' element={<AvailableCamps />} />
        <Route path='camps/:id' element={<CampDetails />} />
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
        <Route index element={<Dashboard />} />
        {/* user routes */}
        <Route path='analytics' element={<Analytics />} />
        <Route path='user-profile' element={<UserProfile />} />
        <Route path='registered-camp' element={<RegisteredCamps />} />
        <Route path='payment/:participantId' element={<Payment />} />
        <Route path='payment-history' element={<PaymentHistory />} />
        {/* admin routes */}
        <Route
          path='admin-profile'
          element={
            <CheckRole roles={["admin"]}>
              <AdminProfile />
            </CheckRole>
          }
        />
        <Route
          path='add-camp'
          element={
            <CheckRole roles={["admin"]}>
              <AddCamp />
            </CheckRole>
          }
        />
        <Route
          path='update-camp/:id'
          element={
            <CheckRole roles={["admin"]}>
              <UpdateCamp />
            </CheckRole>
          }
        />
        <Route
          path='manage-camp'
          element={
            <CheckRole roles={["admin"]}>
              <ManageCamp />
            </CheckRole>
          }
        />
        <Route
          path='manage-registered-camp'
          element={
            <CheckRole roles={["admin"]}>
              <ManageRegisteredCamp />
            </CheckRole>
          }
        />
      </Route>
      {/* error route without header and footer */}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
