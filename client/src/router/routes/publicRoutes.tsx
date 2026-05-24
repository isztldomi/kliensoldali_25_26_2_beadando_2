import { HomePage } from "@/feature/base/pages/HomePage";
import { NotFoundPage } from "@/feature/base/pages/NotFoundPage";
import type { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
