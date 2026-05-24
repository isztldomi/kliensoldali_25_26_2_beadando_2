export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
  createdAt: number;
  duration: number;
  progress: number;
};

export type ToastState = {
  toasts: Toast[];
};
