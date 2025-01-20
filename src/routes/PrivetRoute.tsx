import Spinner from "@/components/common/Spinner";
import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("User from private route", user);

  if (loading) return <Spinner />;
  if(user){
    return children;
  } 

  return  <Navigate to='/login' state={{ from: location }} replace />;
}

export default PrivateRoute;
