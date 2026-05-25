import {
  type ModifyTableDetailsRequestDto,
  type Table,
} from "@/feature/table/tableTypes";
import { useEffect, useState } from "react";

interface TableDetailsContainerProps {
  table?: Table;
  onSubmit: (id: number, data: ModifyTableDetailsRequestDto) => void;
}

export const TableDetailsContainer = ({
  table,
  onSubmit,
}: TableDetailsContainerProps) => {
  const [form, setForm] = useState<ModifyTableDetailsRequestDto>({
    name: "",
    type: "",
    category: "",
    color: "",
    status: 10,
    isLocked: false,
  });

  useEffect(() => {
    if (!table) return;

    setForm({
      name: table.name,
      type: table.type,
      category: table.category,
      color: table.color,
      status: table.status,
      isLocked: table.isLocked,
    });
  }, [table]);

  if (!table) {
    return (
      <div
        className="p-4 rounded-lg border"
        style={{
          width: "320px",
          background: "var(--surface-2)",
          borderColor: "var(--border)",
          color: "var(--text-muted)",
        }}
      >
        No table selected
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(table.id, form);
  };

  const inputStyle = {
    background: "var(--surface-1)",
    color: "var(--text)",
    border: "1px solid var(--border)",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-xl space-y-4 shadow shrink-0"
      style={{
        width: "320px",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        color: "var(--text)",
      }}
    >
      <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
        Edit table
      </h2>

      {/* NAME */}
      <div>
        <label
          className="block mb-1 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Name
        </label>

        <input
          className="w-full rounded-lg p-2 outline-none"
          style={inputStyle}
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      </div>

      {/* TYPE */}
      <div>
        <label
          className="block mb-1 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Type
        </label>

        <select
          className="w-full rounded-lg p-2 outline-none"
          style={inputStyle}
          value={form.type}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              type: e.target.value,
            }))
          }
        >
          <option value="snooker">Snooker</option>
          <option value="foosball">Foosball</option>
          <option value="air-hockey">Air Hockey</option>
        </select>
      </div>

      {/* CATEGORY */}
      <div>
        <label
          className="block mb-1 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Category
        </label>

        <select
          className="w-full rounded-lg p-2 outline-none"
          style={inputStyle}
          value={form.category}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
        >
          <option value="competition">Competition</option>
          <option value="normal">Normal</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      {/* COLOR */}
      <div>
        <label
          className="block mb-1 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Color
        </label>

        <input
          className="w-full rounded-lg p-2 outline-none"
          style={inputStyle}
          value={form.color}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              color: e.target.value,
            }))
          }
        />
      </div>

      {/* STATUS */}
      <div>
        <label
          className="block mb-2 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Status ({form.status}/10)
        </label>

        <input
          type="range"
          min={1}
          max={10}
          value={form.status}
          className="w-full cursor-pointer"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              status: Number(e.target.value),
            }))
          }
        />
      </div>

      {/* LOCK */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.isLocked}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              isLocked: e.target.checked,
            }))
          }
        />

        <span style={{ color: "var(--text)" }}>Locked</span>
      </label>

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full rounded-lg p-3 font-medium transition-opacity hover:opacity-80"
        style={{
          background: "var(--accent)",
          color: "var(--text)",
        }}
      >
        Save changes
      </button>
    </form>
  );
};
