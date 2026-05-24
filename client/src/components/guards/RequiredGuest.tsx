import { Navigate, Outlet } from "react-router-dom";
import { useAuthBootstrap } from "@/feature/auth/useAuthBootstrap";

export const RequiredGuest = () => {
  const { isAuthenticated, isLoading } = useAuthBootstrap();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isAuthenticated) {
  //   return <Navigate to="/room" replace />;
  // }

  return <Outlet />;
};
