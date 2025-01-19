import Spinner from "@/components/common/Spinner";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const isAuthenticated = Boolean(user?.email);

  if (loading) return <Spinner />;

  return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
