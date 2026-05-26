import { useState } from "react";
import { useGetTableTimesLotsQuery } from "@/feature/table/tableApi";
import type { Timeslot } from "@/feature/table/tableTypes";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { BookingFormContainer } from "./BookingFormContainer";

interface TableTimeslotsContainerProps {
  tableId?: number;
}

export const TableTimeslotsContainer = ({
  tableId,
}: TableTimeslotsContainerProps) => {
  const [selectedSlot, setSelectedSlot] = useState<Timeslot | null>(null);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedDate = selectedDate.toISOString().split("T")[0];

  const dayName = new Intl.DateTimeFormat("hu-HU", {
    weekday: "long",
  }).format(selectedDate);

  const today = new Date().toISOString().split("T")[0];

  const isToday = formattedDate === today;

  const { data: timeslots, isLoading } = useGetTableTimesLotsQuery(
    {
      id: tableId!,
      date: formattedDate,
    },
    {
      skip: !tableId,
    },
  );

  const changeDay = (days: number) => {
    setSelectedSlot(null);

    setSelectedDate((prev) => {
      const next = new Date(prev);

      next.setDate(next.getDate() + days);

      return next;
    });
  };

  if (!tableId) {
    return (
      <div
        className="p-5 rounded-xl"
        style={{
          width: "280px",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          color: "var(--text)",
        }}
      >
        Válassz egy asztalt
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6">
      <div
        className="p-5 rounded-xl"
        style={{
          width: "280px",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="mb-4">
          <h2
            className="font-bold mb-3"
            style={{
              color: "var(--text)",
            }}
          >
            Időpontok
          </h2>

          <div className="flex items-center gap-2">
            <button
              disabled={isToday}
              onClick={() => changeDay(-1)}
              className="px-3 py-2 rounded transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
              }}
            >
              <ArrowBigLeft size={18} />
            </button>

            <div
              className="flex-1 text-center py-2 rounded"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            >
              <div className="font-medium">{formattedDate}</div>

              <div
                className="text-sm capitalize"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                {dayName}
              </div>
            </div>

            <button
              onClick={() => changeDay(1)}
              className="px-3 py-2 rounded transition-opacity hover:opacity-80"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
              }}
            >
              <ArrowBigRight size={18} />
            </button>
          </div>
        </div>

        {isLoading && (
          <div
            style={{
              color: "var(--text-muted)",
            }}
          >
            Betöltés...
          </div>
        )}

        {!isLoading && (
          <div className="space-y-2 max-h-[700px] overflow-y-auto">
            {timeslots?.length ? (
              timeslots.map((slot) => {
                const isSelected = selectedSlot?.startTime === slot.startTime;

                return (
                  <button
                    key={slot.startTime}
                    disabled={!slot.isAvailable}
                    onClick={() => setSelectedSlot(slot)}
                    className="w-full rounded-lg p-3 text-left transition"
                    style={{
                      background: isSelected
                        ? "var(--accent)"
                        : slot.isAvailable
                          ? "var(--surface-1)"
                          : "#7f1d1d",

                      color: "var(--text)",

                      opacity: slot.isAvailable ? 1 : 0.6,

                      border: isSelected
                        ? "2px solid var(--accent)"
                        : "1px solid var(--border)",
                    }}
                  >
                    <div className="font-medium">
                      {slot.startTime} - {slot.endTime}
                    </div>

                    <div
                      className="text-sm"
                      style={{
                        color: "var(--text-muted)",
                      }}
                    >
                      {slot.isAvailable ? "Szabad" : "Foglalt"}
                    </div>
                  </button>
                );
              })
            ) : (
              <div
                className="text-center py-5"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                Nincs elérhető időpont
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <BookingFormContainer
          tableId={tableId}
          selectedSlot={selectedSlot}
          date={formattedDate}
        />
      </div>
    </div>
  );
};
