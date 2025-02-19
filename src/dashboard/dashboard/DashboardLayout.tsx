/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { toggleSidebarCollapse } from "@/features/dashboard/sidebarSlice";
import Sidebar from "./Sidebar";
import { useTheme } from "@/providers/theme-provider";
import { Menu, Moon, Sun } from "lucide-react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const { setTheme, theme } = useTheme();

  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { isCollapsed } = useAppSelector((state) => state.dashboardSidebar);
  const handleMenuBarClick = () => {
    dispatch(toggleSidebarCollapse());
    if (!isCollapsed) {
      sidebarRef.current?.classList.add("hide");
      mainRef.current?.classList.add("active");
      overlayRef.current?.classList.add("hidden");
    } else {
      sidebarRef.current?.classList.remove("hide");
      mainRef.current?.classList.remove("active");
      overlayRef.current?.classList.remove("hidden");
    }
  };

  const handleOverlayClick = () => {
    mainRef.current?.classList.add("active");
    overlayRef.current?.classList.add("hidden");
    sidebarRef.current?.classList.add("hide");
    dispatch(toggleSidebarCollapse());
  };

  useEffect(() => {
    if (window.innerWidth <= 767) {
      handleMenuBarClick();
      handleOverlayClick();
    }
  }, []);

  return (
    <div className='dashboard pb-[110px] !font-inter text-sm sm:pb-[0px] mx-auto'>
      {/* Sidebar */}
      <Sidebar
        overlayRef={overlayRef}
        handleOverlayClick={handleOverlayClick}
        sidebarRef={sidebarRef}
      />
      <main
        ref={mainRef}
        className='dashboard-body min-h-screen max-w-full bg-background transition-all '
      >
        <div className='sticky left-0 top-0 z-20 flex h-[80px] items-center bg-[#EEDBEE] dark:bg-[#222222] justify-between shadow-md px-6 py-4'>
          <button
            onClick={handleMenuBarClick}
            type='button'
            className='text-[25px]'
          >
            <Menu />
          </button>
          <div>
            <button
              onClick={() =>
                theme === "light" ? setTheme("dark") : setTheme("light")
              }
              className='flex justify-center items-center'
            >
              {theme === "light" ? (
                <Sun className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              ) : (
                <Moon className='rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              )}
            </button>
          </div>
        </div>

        <div className='min-h-[calc(100vh-60px-80px)] text-sm lg:text-base '>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
