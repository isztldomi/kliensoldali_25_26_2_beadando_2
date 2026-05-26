import { useEffect } from "react";
import { useLogoutMutation } from "@/feature/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToast } from "@/feature/toast/toastSlice";

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout().unwrap();

        dispatch(
          addToast({
            type: "success",
            message: "Sikeres kijelentkezés",
          }),
        );

        navigate("/login", { replace: true });
      } catch (err) {
        console.error("logout failed", err);

        navigate("/login", { replace: true });
      }
    };

    doLogout();
  }, [logout, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      Logging out...
    </div>
  );
};
