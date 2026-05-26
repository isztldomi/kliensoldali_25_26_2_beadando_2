import { useState } from "react";
import { useCreateBookingMutation } from "@/feature/booking/bookingApi";
import type { CreateBookingRequestDto } from "@/feature/booking/bookingTypes";
import type { Timeslot } from "@/feature/table/tableTypes";
import { useDispatch } from "react-redux";
import { addToast } from "@/feature/toast/toastSlice";

interface BookingFormContainerProps {
  tableId?: number;
  selectedSlot: Timeslot | null;
  date: string;
}

export const BookingFormContainer = ({
  tableId,
  selectedSlot,
  date,
}: BookingFormContainerProps) => {
  const dispatch = useDispatch();
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const [form, setForm] = useState<
    Omit<CreateBookingRequestDto, "tableId" | "date" | "startTime" | "endTime">
  >({
    name: "",
    email: "",
    phone: "",
    headcount: 1,
    notes: "",
  });

  const inputStyle = {
    background: "var(--surface-1)",
    border: "1px solid var(--border)",
    color: "var(--text)",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tableId || !selectedSlot) return;

    const payload: CreateBookingRequestDto = {
      tableId,
      date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      ...form,
    };

    try {
      await createBooking(payload).unwrap();

      setForm({
        name: "",
        email: "",
        phone: "",
        headcount: 1,
        notes: "",
      });

      dispatch(
        addToast({
          type: "success",
          message: "Sikeres foglalás",
        }),
      );
    } catch (err) {
      console.error(err);
      dispatch(
        addToast({
          type: "error",
          message: "Sikertelen foglalás",
        }),
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-xl space-y-4"
      style={{
        width: "280px",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
      }}
    >
      <h2
        className="font-bold"
        style={{
          color: "var(--text)",
        }}
      >
        Foglalás
      </h2>

      {selectedSlot ? (
        <div className="rounded p-3" style={inputStyle}>
          <div>{date}</div>

          <div className="font-medium">
            {selectedSlot.startTime}
            {" - "}
            {selectedSlot.endTime}
          </div>
        </div>
      ) : (
        <div className="rounded p-3" style={inputStyle}>
          Válassz időpontot
        </div>
      )}

      <input
        required
        placeholder="Név"
        className="w-full p-2 rounded"
        style={inputStyle}
        value={form.name}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />

      <input
        required
        type="email"
        placeholder="Email"
        className="w-full p-2 rounded"
        style={inputStyle}
        value={form.email}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />

      <input
        required
        placeholder="Telefon"
        className="w-full p-2 rounded"
        style={inputStyle}
        value={form.phone}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            phone: e.target.value,
          }))
        }
      />

      <input
        required
        type="number"
        min={1}
        placeholder="Létszám"
        className="w-full p-2 rounded"
        style={inputStyle}
        value={form.headcount}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            headcount: Number(e.target.value),
          }))
        }
      />

      <textarea
        placeholder="Megjegyzés"
        rows={3}
        className="w-full p-2 rounded resize-none"
        style={inputStyle}
        value={form.notes}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            notes: e.target.value,
          }))
        }
      />

      <button
        disabled={!selectedSlot || isLoading}
        type="submit"
        className="w-full p-3 rounded disabled:opacity-50"
        style={{
          background: "var(--accent)",
          color: "var(--text)",
        }}
      >
        {isLoading ? "Foglalás..." : "Foglalás létrehozása"}
      </button>
    </form>
  );
};
