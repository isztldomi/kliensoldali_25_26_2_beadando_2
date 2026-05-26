import {
  useGetBookingsQuery,
  useSetStatusMutation,
} from "@/feature/booking/bookingApi";
import { BookingStatus, type Booking } from "@/feature/booking/bookingTypes";
import { addToast } from "@/feature/toast/toastSlice";
import { User, Mail, Phone, TicketPercent, NotebookPen } from "lucide-react";
import { useDispatch } from "react-redux";

export const AllBookingPage = () => {
  const dispatch = useDispatch();
  const { data: bookings, isLoading } = useGetBookingsQuery();
  const [setStatus, { isLoading: isUpdating }] = useSetStatusMutation();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("hu-HU");

  const statusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.Accepted:
        return "#16a34a";
      case BookingStatus.Declined:
        return "#dc2626";
      default:
        return "#f59e0b";
    }
  };

  const handleStatus = async (id: number, status: BookingStatus) => {
    try {
      await setStatus({ id, status }).unwrap();
      if (status == BookingStatus.Accepted) {
        dispatch(
          addToast({
            type: "success",
            message: "Sikeres elfogadás",
          }),
        );
      } else {
        dispatch(
          addToast({
            type: "success",
            message: "Sikeres elutasítás",
          }),
        );
      }
    } catch (err) {
      console.error(err);
      if (status == BookingStatus.Accepted) {
        dispatch(
          addToast({
            type: "error",
            message: "Sikertelen elfogadás",
          }),
        );
      } else {
        dispatch(
          addToast({
            type: "error",
            message: "Sikertelen elutasítás",
          }),
        );
      }
    }
  };

  if (isLoading) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="p-6 space-y-4" style={{ color: "var(--text)" }}>
      {!bookings?.length ? (
        <div style={{ color: "var(--text-muted)" }}>Nincs foglalás</div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b: Booking) => (
            <div
              key={b.id}
              className="p-4 rounded-xl"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{b.tableName}</div>

                  <div
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "13px",
                    }}
                  >
                    {formatDate(b.date)} • {b.startTime} - {b.endTime}
                  </div>
                </div>

                <div
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    background: statusColor(b.status),
                    color: "white",
                  }}
                >
                  {b.status}
                </div>
              </div>

              <div className="mt-2 text-sm">
                <div className="flex gap-3">
                  <User /> {b.name}
                </div>
                <div className="flex gap-3">
                  <Mail /> {b.email}
                </div>
                <div className="flex gap-3">
                  <Phone /> {b.phone}
                </div>
                <div className="flex gap-3">
                  <TicketPercent /> {b.headcount} fő
                </div>

                {b.notes && (
                  <div
                    className="flex gap-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <NotebookPen /> {b.notes}
                  </div>
                )}
              </div>

              {b.status === BookingStatus.Pending && (
                <div className="flex gap-2 mt-3">
                  <button
                    disabled={isUpdating}
                    onClick={() => handleStatus(b.id, BookingStatus.Accepted)}
                    className="px-3 py-1 rounded"
                    style={{
                      background: "#16a34a",
                      color: "white",
                    }}
                  >
                    Elfogadás
                  </button>

                  <button
                    disabled={isUpdating}
                    onClick={() => handleStatus(b.id, BookingStatus.Declined)}
                    className="px-3 py-1 rounded"
                    style={{
                      background: "#dc2626",
                      color: "white",
                    }}
                  >
                    Elutasítás
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
