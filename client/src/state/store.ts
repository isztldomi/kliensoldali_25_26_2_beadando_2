import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/feature/base/baseApi";
import themeReducer from "@/feature/theme/themeSlice";
import toastReducer from "@/feature/toast/toastSlice";
import { setThemeCookie } from "@/cookie/themeCookie";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    theme: themeReducer,
    toast: toastReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

store.subscribe(() => {
  const theme = store.getState().theme.theme;
  setThemeCookie(theme);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
