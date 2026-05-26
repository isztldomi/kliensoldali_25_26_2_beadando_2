import { useGetBookingsMyQuery } from "@/feature/booking/bookingApi";
import { BookingStatus, type Booking } from "@/feature/booking/bookingTypes";
import { User, Phone, TicketPercent, NotebookPen } from "lucide-react";

export const MeBookingPage = () => {
  const { data: bookings, isLoading, isError } = useGetBookingsMyQuery();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("hu-HU");

  const statusColor = (status: Booking["status"]) => {
    switch (status) {
      case BookingStatus.Accepted:
        return "#16a34a";
      case BookingStatus.Declined:
        return "#dc2626";
      default:
        return "#f59e0b";
    }
  };

  if (isLoading) {
    return <div style={{ color: "var(--text)" }}>Betöltés...</div>;
  }

  if (isError) {
    return (
      <div style={{ color: "red" }}>Hiba történt a foglalások betöltésekor</div>
    );
  }

  return (
    <div className="p-6 space-y-4" style={{ color: "var(--text)" }}>
      <h1 className="text-xl font-bold">Foglalásaim</h1>

      {!bookings?.length ? (
        <div style={{ color: "var(--text-muted)" }}>Nincsenek foglalásaid</div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-xl"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{b.tableName}</div>

                  <div
                    className="flex flex-col px-3"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "14px",
                    }}
                  >
                    <span>{formatDate(b.date)}</span>
                    <span>
                      {b.startTime} - {b.endTime}
                    </span>
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
                <div className="flex gap-3 items-center">
                  <User /> {b.name} ({b.email})
                </div>

                <div className="flex gap-3 items-center">
                  <Phone /> {b.phone}
                </div>

                <div className="flex gap-3 items-center">
                  <TicketPercent /> {b.headcount} fő
                </div>

                {b.notes && (
                  <div
                    className="flex gap-3 items-center"
                    style={{
                      color: "var(--text-muted)",
                      marginTop: "4px",
                    }}
                  >
                    <NotebookPen /> {b.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
