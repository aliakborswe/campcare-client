import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { ArrowUpFromDot } from "lucide-react";
import { Outlet } from "react-router";

const MainLayout = () => {
  const handleScroll = ()=>{
    window.scrollTo({ top: 0, left: 0 ,  behavior: 'smooth' });
  }
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <Outlet />
      </main>
      <Footer />
      <div onClick={handleScroll} className="bg-primary fixed bottom-4 right-4 p-2 rounded-full text-white ">
        <ArrowUpFromDot />
      </div>
    </>
  );
};

export default MainLayout;
