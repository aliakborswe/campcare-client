import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { ArrowUpFromDot } from "lucide-react";
import { Outlet } from "react-router";

const MainLayout = () => {
  const handleScroll = ()=>{
    window.scrollTo({ top: 0, left: 0 ,  behavior: 'smooth' });
  }
  return (
    <div>
      <Header />
      <div className='min-h-screen mt-16'>
        <Outlet />
      </div>
      <Footer />
      <div onClick={handleScroll} className="bg-primary fixed bottom-4 right-4 p-2 rounded-full text-white ">
        <ArrowUpFromDot />
      </div>
    </div>
  );
};

export default MainLayout;
