
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user?.email);



  return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
