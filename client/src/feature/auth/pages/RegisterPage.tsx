import { useState } from "react";
import { useRegisterMutation } from "@/feature/auth/authApi";
import type { RegisterRequestDto } from "../authTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToast } from "@/feature/toast/toastSlice";

const initialRegisterForm: RegisterRequestDto = {
  name: "",
  email: "",
  password: "",
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] =
    useState<RegisterRequestDto>(initialRegisterForm);

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await register(registerForm).unwrap();

      dispatch(
        addToast({
          type: "success",
          message: "Sikeres regisztráció",
        }),
      );

      console.log(res);

      navigate("/login"); // vagy "/room", ha auto-login lesz később
    } catch (error) {
      console.log(error);

      dispatch(
        addToast({
          type: "error",
          message: "Sikertelen regisztráció",
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
        <h1 className="text-xl font-bold">Regisztráció</h1>

        <input
          name="name"
          type="text"
          placeholder="Name"
          value={registerForm.name}
          onChange={handleChange}
          className="p-2 rounded bg-[var(--surface-1)] border border-[var(--border)]"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={registerForm.email}
          onChange={handleChange}
          className="p-2 rounded bg-[var(--surface-1)] border border-[var(--border)]"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={registerForm.password}
          onChange={handleChange}
          className="p-2 rounded bg-[var(--surface-1)] border border-[var(--border)]"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="p-2 rounded bg-[var(--surface-1)] border border-[var(--border)] hover:bg-[var(--surface-3)] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};
