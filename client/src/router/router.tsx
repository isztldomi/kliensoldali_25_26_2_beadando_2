import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { publicRoutes } from "@/router/routes/publicRoutes";
import { authRoutes } from "@/router/routes/authRoutes";
import { protectedRoutes } from "@/router/routes/protectedRoutes";
import { AppLayout } from "@/components/layouts/AppLayout";

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [...publicRoutes, ...protectedRoutes, ...authRoutes],
      },
    ],
  },
]);
