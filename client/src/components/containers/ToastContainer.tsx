import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/state/store";
import { removeToast, updateToastProgress } from "@/feature/toast/toastSlice";
import { X } from "lucide-react";

const TOAST_DURATION = 5000;

type TimerState = {
  start: number;
  remaining: number;
  rafId?: number;
  paused: boolean;
};

export const ToastContainer = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  const timers = useRef<Record<string, TimerState>>({});

  // =========================
  // START / RESUME TIMER
  // =========================
  const startTimer = (id: string) => {
    const now = Date.now();

    if (!timers.current[id]) {
      timers.current[id] = {
        start: now,
        remaining: TOAST_DURATION,
        paused: false,
      };
    }

    const timer = timers.current[id];

    timer.paused = false;
    timer.start = now - (TOAST_DURATION - timer.remaining);

    const tick = () => {
      const t = timers.current[id];
      if (!t || t.paused) return;

      const elapsed = Date.now() - t.start;
      const progress = Math.min((elapsed / TOAST_DURATION) * 100, 100);

      dispatch(updateToastProgress({ id, progress }));

      if (progress >= 100) {
        dispatch(removeToast(id));
        delete timers.current[id];
        return;
      }

      t.rafId = requestAnimationFrame(tick);
    };

    timer.rafId = requestAnimationFrame(tick);
  };

  // =========================
  // PAUSE TIMER
  // =========================
  const pauseTimer = (id: string) => {
    const timer = timers.current[id];
    if (!timer) return;

    timer.paused = true;

    if (timer.rafId) {
      cancelAnimationFrame(timer.rafId);
    }

    //eslint-disable-next-line react-hooks/rules-of-hooks
    const elapsed = Date.now() - timer.start;
    timer.remaining = Math.max(TOAST_DURATION - elapsed, 0);
  };

  // =========================
  // INIT NEW TOASTS
  // =========================
  useEffect(() => {
    toasts.forEach((t) => {
      if (!timers.current[t.id]) {
        startTimer(t.id);
      }
    });
  }, [toasts]);

  // =========================
  // RENDER
  // =========================
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onMouseEnter={() => pauseTimer(toast.id)}
          onMouseLeave={() => startTimer(toast.id)}
          className={`
            relative overflow-hidden
            px-4 py-3 pr-8 rounded shadow min-w-[250px]
            transition-all duration-200
            ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-gray-700"
            }
          `}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => {
              cancelAnimationFrame(timers.current[toast.id]?.rafId!);
              delete timers.current[toast.id];
              dispatch(removeToast(toast.id));
            }}
            className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition"
          >
            <X size={30} />
          </button>

          {/* TEXT */}
          <div className="relative z-10 pr-4">{toast.message}</div>

          {/* PROGRESS BAR */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[var(--toast-progress-track)]">
            <div
              className="h-full bg-[var(--toast-progress)] transition-all duration-75"
              style={{ width: `${toast.progress ?? 0}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
