import { RequiredGuest } from "@/components/guards/RequiredGuest";
import { RequiredAuth } from "@/components/guards/RequireAuth";
import { RequiredAdmin } from "@/components/guards/RequireAdmin";
import { LoginPage } from "@/feature/auth/pages/LoginPage";
import { LogoutPage } from "@/feature/auth/pages/LogoutPage";

export const authRoutes = [
  {
    element: <RequiredGuest />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      // {
      //   path: "/registration",
      //   element: <RegistrationPage />,
      // },
    ],
  },
  {
    element: <RequiredAuth />,
    children: [
      {
        path: "/logout",
        element: <LogoutPage />,
      },
    ],
  },
  {
    element: <RequiredAdmin />,
    children: [],
  },
];
