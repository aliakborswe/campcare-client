import { LogIn, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "@/assets/svg/logo.svg";
import ActiveLink from "./ActiveLink";
import { Button } from "../ui/button";
import { useTheme } from "@/providers/theme-provider";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const { setTheme, theme } = useTheme();
  const { user, logOut } = useAuth();



  const toggleMenu = () => setShowMenu(!showMenu);

  // hide manage my profile
  const hideProfile = () => setProfile(false);

  const navigate = useNavigate();
  // handle logout button
  const handleLogout = async () => {
    try {
      await logOut();
      setProfile(false);
      navigate("/");
      toast.success("Logout Success!");
    } catch (err: any) {
      toast.error(err.message || "Logout Failed");
    }
  };

  return (
    <header className='bg-[#EEDBEE] dark:bg-[#222222] sticky top-0'>
      <div className='container mx-auto px-2.5 py-1'>
        <nav className='flex flex-row gap-6 justify-between items-center'>
          <div className='flex items-center'>
            {/* mobile menu icon */}
            <div onClick={toggleMenu} className='lg:hidden'>
              {showMenu == true ? <X size={36} /> : <Menu size={36} />}
            </div>
            <Link to='/' className='flex gap-2 items-center justify-start'>
              <img src={logo} alt='logo' className='w-12' />
              <p className={` font-bold text-xl hidden md:block`}>CampCare+</p>
            </Link>
          </div>
          <div
            className={`${
              showMenu ? "block" : "hidden"
            } lg:block absolute  lg:static top-[58px] left-2.5 p-4 rounded-xl  bg-white border lg:border-none shadow-md lg:shadow-none lg:bg-transparent`}
          >
            <div className='flex flex-col lg:flex-row gap-6 text-base font-medium text-foreground w-full'>
              <div onClick={hideProfile}>
                <ActiveLink to='/'>Home</ActiveLink>
              </div>
              <div onClick={hideProfile}>
                <ActiveLink to='/camps'>Available Camps</ActiveLink>
              </div>
              <div onClick={hideProfile}>
                <ActiveLink to='/about'>About</ActiveLink>
              </div>
            </div>
          </div>

          <div className='flex items-center  gap-6 text-base font-semibold [&_a]:flex [&_a]:gap-1 '>
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
            {user !== null ? (
              <div className='relative '>
                <div className='relative'>
                  <img
                    onClick={() => setProfile(!profile)}
                    src={
                      user?.photoURL ||
                      "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                    }
                    className='w-10 aspect-square rounded-full '
                    alt='photo'
                  />
                  {profile && (
                    <div className='absolute top-[50px] border-2  w-36 flex flex-col justify-center p-2 space-y-2 bg-white text-black right-0 rounded-xl shadow-md '>
                      <p className='text-sm cursor-not-allowed'>
                        {user?.displayName || "Name not found"}
                      </p>
                      <div onClick={hideProfile}>
                        <ActiveLink to='/dashboard'>Dashboard</ActiveLink>
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant={"destructive"}
                        size={"sm"}
                        className='flex items-center gap-1 '
                      >
                        <LogOut />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <ActiveLink to='/login'>
                <Button
                  variant={"default"}
                  className='flex items-center gap-1 hover:bg-primary'
                >
                  <LogIn />
                  Join US
                </Button>
              </ActiveLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
