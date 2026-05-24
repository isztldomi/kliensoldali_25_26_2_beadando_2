import { Outlet } from "react-router-dom";
import { Header } from "@/components/headers/Header";

export function AppLayout() {
  return (
    <>
      <Header />
      <main className="p-5">
        <Outlet />
      </main>
    </>
  );
}
