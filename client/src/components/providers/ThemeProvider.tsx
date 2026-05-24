import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  return <>{children}</>;
};
