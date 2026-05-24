import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ToastState } from "@/feature/toast/toastTypes";

const initialState: ToastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toasts.push({
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        ...action.payload,
      });
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },

    clearToasts: (state) => {
      state.toasts = [];
    },

    updateToastProgress: (
      state,
      action: PayloadAction<{ id: string; progress: number }>,
    ) => {
      const toast = state.toasts.find((t) => t.id === action.payload.id);
      if (toast) {
        toast.progress = action.payload.progress;
      }
    },
  },
});

export const { addToast, removeToast, clearToasts, updateToastProgress } =
  toastSlice.actions;

export default toastSlice.reducer;
