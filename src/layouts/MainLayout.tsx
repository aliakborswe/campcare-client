import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className='bg-background'>
      <Header />
      <div className='min-h-screen mt-16'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
