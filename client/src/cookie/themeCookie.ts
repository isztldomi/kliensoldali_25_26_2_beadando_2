// themeCookie.ts
import Cookies from "js-cookie";

type Theme = "dark" | "light";

const COOKIE_NAME = "theme";

export const getThemeFromCookie = (): Theme => {
  const theme = Cookies.get(COOKIE_NAME);

  return theme === "light" || theme === "dark" ? theme : "dark";
};

export const saveThemeToCookie = (theme: Theme) => {
  Cookies.set(COOKIE_NAME, theme, {
    expires: 30,
    path: "/",
  });
};

export const setThemeCookie = (theme: Theme) => {
  Cookies.set(COOKIE_NAME, theme, {
    expires: 30,
    path: "/",
  });
};
