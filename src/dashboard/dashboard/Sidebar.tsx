
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { createElement } from "react";
import { BadgeDollarSign, ClipboardPlus, LayoutDashboard, NotepadText, SquareKanban, UserRoundCog } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import logo from "@/assets/svg/logo.svg"
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";


type Props = {
  overlayRef: React.RefObject<HTMLDivElement>;
  handleOverlayClick: () => void;
  sidebarRef: React.RefObject<HTMLDivElement>;
};

const Sidebar = ({ overlayRef, handleOverlayClick, sidebarRef }: Props) => {
  const { logOut } = useAuth();

  const isAdmin = false

  const navigate = useNavigate();
  // handle logout button
    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
        toast.success("Logout Success!");
      } catch (err: any) {
        toast.error(err.message || "Logout Failed");
      }
    };
  return (
    <>
      <div
        ref={sidebarRef}
        className='dashboard-sidebar fixed left-0 top-0 z-40 box-border h-full overflow-hidden shadow-md bg-background transition-all'
      >
        <div className='h-[calc(100dvh-80px)] overflow-y-auto overflow-x-hidden '>
          {/* logo */}
          <SidebarLogo to='/' image={logo} label='CampCare+' />
          {isAdmin ? (
            <>
              {/* admin sidebar menu */}
              <ul className='mt-6 border-b border-[#eee] pb-4 text-base font-medium'>
                <SidebarLink
                  label='Admin Profile'
                  icon={UserRoundCog}
                  to='admin-profile'
                />
                <SidebarLink
                  label='Add Camp'
                  icon={ClipboardPlus}
                  to='add-camp'
                />
                <SidebarLink
                  label='Manage Camp'
                  icon={SquareKanban}
                  to='manage-camp'
                />
                <SidebarLink
                  label='Manage Register Camp'
                  icon={NotepadText}
                  to='manage-registered-camp'
                />
              </ul>
            </>
          ) : (
            <>
              {/* user sidebar menu */}
              <ul className='mt-6 border-b border-[#eee] pb-4 text-base font-medium'>
                <SidebarLink
                  label='Analytics'
                  icon={LayoutDashboard}
                  to='analytics'
                />
                <SidebarLink
                  label='User Profile'
                  icon={UserRoundCog}
                  to='user-profile'
                />
                <SidebarLink
                  label='Registered Camps'
                  icon={NotepadText}
                  to='registered-camp'
                />
                <SidebarLink
                  label='Payment History'
                  icon={BadgeDollarSign}
                  to='payment-history'
                />
              </ul>
            </>
          )}
        </div>
        <div className='h-[150px] space-y-4 px-3 pt-3'>
          <Button
            onClick={handleLogout}
            variant={"destructive"}
            className='w-full'
          >
            Logout
          </Button>
        </div>
      </div>
      <div
        onClick={handleOverlayClick}
        ref={overlayRef}
        className='fixed left-0 top-0 z-30 h-full w-full bg-black/50 md:hidden'
      ></div>
    </>
  );
};
export default Sidebar;

export const SidebarLink = (props: {
  label: string;
  to: string;
  icon: any;
}) => {
  const { label, to, icon } = props;
  return (
    <li className="group mb-1">
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          cn(
            isActive ? "text-primary" : "",
            "flex items-center gap-x-2 px-4 py-3  hover:text-secondary"
          )
        }
      >
        {icon &&
          createElement(icon, {
            className: "flex-shrink-0 text-[20px]",
          } as any)}
        <span className="whitespace-nowrap">{label}</span>
      </NavLink>
    </li>
  );
};

type MenuItem = {
  label: string;
  icon: any;
  to: string;
};

export const SidebarMenu = (props: { menu: MenuItem[] }) => {
  const { menu } = props;
  return (
    <>
      {menu.map((item) => {
        return (
          <SidebarLink
            key={item.label}
            label={item.label}
            icon={item.icon}
            to={item.to}
          />
        );
      })}
    </>
  );
};


export const SidebarLogo = (props: {
  label: string;
  to: string;
  image: any;
}) => {
  const { label, to, image } = props;
  return (
      <NavLink
        to={to}
        end
        className=
            "flex min-h-[60px] items-center gap-5 rounded-md pt-4 pl-3  hover:bg-primary/90 "
      >
        {image &&
          (<img src={image} alt="logo" className="w-12" /> as any)}
        <span className='whitespace-nowrap font-bold text-xl'>{label}</span>
      </NavLink>
  );
};


