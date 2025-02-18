/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "@/components/common/Spinner";
import useRole from "@/hooks/useRole";
import { Navigate, useLocation } from "react-router";

const CheckRole = ({ children, roles }: { children: React.ReactNode, roles: string[] }) => {
  const [role, roleLoading] = useRole();


  
  const location = useLocation;
  if ( roleLoading) return <Spinner />;

  if ( roles.includes(role as any as string)) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default CheckRole;
