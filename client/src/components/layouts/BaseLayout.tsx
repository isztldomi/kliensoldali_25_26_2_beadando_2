import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";
import { useAuthBootstrap } from "@/feature/auth/useAuthBootstrap";

export function BaseLayout() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const { isLoading } = useAuthBootstrap();

  return (
    <div className={`theme-transition ${theme === "light" ? "light" : ""}`}>
      <div className="min-h-screen bg-[var(--surface-1)] text-[var(--text)]">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
