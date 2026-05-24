import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getThemeFromCookie } from "@/cookie/themeCookie";

type Theme = "dark" | "light";

type ThemeState = {
  theme: Theme;
};

const initialState: ThemeState = {
  theme: getThemeFromCookie(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },

    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
