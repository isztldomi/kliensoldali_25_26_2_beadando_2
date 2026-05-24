import { Navigate, Outlet } from "react-router-dom";
import { useAuthBootstrap } from "@/feature/auth/useAuthBootstrap";

export const RequiredAdmin = () => {
  const { user, isAuthenticated, isLoading } = useAuthBootstrap();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || user?.role == "user") {
    return <Navigate to="" replace />;
  }

  return <Outlet />;
};
