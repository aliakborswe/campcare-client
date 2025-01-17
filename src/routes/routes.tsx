
import DashboardLayout from "@/dashboard/dashboard/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/about/About";
import AvailableCamps from "@/pages/availableCamps/AvailableCamps";
import Home from "@/pages/home/Home";
import { ThemeProvider } from "@/providers/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router";


const AppRoutes = () => {
    return (
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='/camps' element={<AvailableCamps />} />
              <Route path='/about' element={<About />} />
            </Route>
          </Routes>
          {/* Dashboard routes */}
          <Routes>
            <Route path='/dashboard' element={<DashboardLayout />}>
              {/* <Route index element={<Dashboard />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
};

export default AppRoutes;