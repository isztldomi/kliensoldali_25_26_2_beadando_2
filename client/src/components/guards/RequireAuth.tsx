import { Navigate, Outlet } from "react-router-dom";
import { useAuthBootstrap } from "@/feature/auth/useAuthBootstrap";

export const RequiredAuth = () => {
  const { isAuthenticated, isLoading } = useAuthBootstrap();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="" replace />;
  }

  return <Outlet />;
};
