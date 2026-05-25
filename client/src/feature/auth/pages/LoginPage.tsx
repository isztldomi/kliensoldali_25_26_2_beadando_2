import { useState } from "react";
import { useLoginMutation } from "@/feature/auth/authApi";
import type { LoginRequestDto } from "../authTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToast } from "@/feature/toast/toastSlice";

const initialLoginForm: LoginRequestDto = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState<LoginRequestDto>(initialLoginForm);

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(loginForm).unwrap();
      console.log(res);

      dispatch(
        addToast({
          type: "success",
          message: "Sikeres bejelentkezés",
        }),
      );

      navigate("/room");
    } catch (error) {
      console.log(error);
      dispatch(
        addToast({
          type: "error",
          message: "Sikertelen bejelentkezés",
        }),
      );
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 border border-[var(--border)] bg-[var(--surface-2)] rounded-lg w-80"
      >
        <h1 className="text-xl font-bold">Bejelentkezés</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={handleChange}
          className="p-2 rounded bg-[var(--surface-1)] border border-[var(--border)]"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={handleChange}
          className="p-2 rounded bg-[var(--surface-1)] border border-[var(--border)]"
        />

        {/* error && <div className="text-red-500 text-sm">Login failed</div> */}

        <button
          type="submit"
          disabled={isLoading}
          className="p-2 rounded bg-[var(--surface-1)] border border-[var(--border)] hover:bg-[var(--surface-3)] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="flex flex-col gap-1 text-xs">
          <span>
            <p>Demo admin:</p>
            <p>admin@example.com admin</p>
          </span>
          <span>
            <p>Demo user:</p>
            <p>user@example.com password</p>
          </span>
        </div>
      </form>
    </div>
  );
};
