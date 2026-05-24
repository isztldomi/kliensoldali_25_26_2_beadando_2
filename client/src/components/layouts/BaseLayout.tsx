import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <div className="theme-transition">
      <div className="min-h-screen bg-[var(--surface-1)] text-[var(--text)]">
        <Outlet />
      </div>
    </div>
  );
}
