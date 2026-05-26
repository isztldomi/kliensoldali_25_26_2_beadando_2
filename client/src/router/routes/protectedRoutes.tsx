import { RequiredAdmin } from "@/components/guards/RequireAdmin";
import { RequiredAuth } from "@/components/guards/RequireAuth";
import { AllBookingPage } from "@/feature/booking/pages/AllBookingPage";
import { MeBookingPage } from "@/feature/booking/pages/MeBookingPage";
import type { RouteObject } from "react-router-dom";

export const protectedRoutes: RouteObject[] = [
  {
    element: <RequiredAuth />,
    children: [
      {
        path: "/reservation/me",
        element: <MeBookingPage />,
      },
    ],
  },
  {
    element: <RequiredAdmin />,
    children: [
      {
        path: "/reservation/all",
        element: <AllBookingPage />,
      },
    ],
  },
];
