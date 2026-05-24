import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/state/store";
import { toggleTheme } from "@/feature/theme/themeSlice";
import { Sun, Moon } from "lucide-react";

export const ThemeButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className="
        rounded-lg
        p-2
        bg-[var(--surface-2)]
        border border-[var(--border)]
        hover:bg-[var(--surface-3)]
        transition-colors
        flex items-center justify-center
      "
    >
      {isDark ? <Sun size={30} /> : <Moon size={30} />}
    </button>
  );
};
