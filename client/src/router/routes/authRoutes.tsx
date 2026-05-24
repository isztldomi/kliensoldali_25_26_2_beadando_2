import { RequiredGuest } from "@/components/guards/RequiredGuest";
import { RequiredAuth } from "@/components/guards/RequireAuth";
import { RequiredAdmin } from "@/components/guards/RequireAdmin";
import { LoginPage } from "@/feature/auth/pages/LoginPage";
import { LogoutPage } from "@/feature/auth/pages/LogoutPage";
import { RegisterPage } from "@/feature/auth/pages/RegisterPage";

export const authRoutes = [
  {
    element: <RequiredGuest />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
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
