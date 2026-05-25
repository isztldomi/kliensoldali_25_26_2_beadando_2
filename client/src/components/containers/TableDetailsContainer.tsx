import {
  type ModifyTableDetailsRequestDto,
  type Table,
} from "@/feature/table/tableTypes";
import { COLORS, type Color } from "@/utils/table/tableColors";
import {
  getCategoryHuString,
  getTypeHuString,
} from "@/utils/table/tableHustring";
import { useEffect, useState } from "react";

interface TableDetailsContainerProps {
  table?: Table;
  onSubmit: (id: number, data: ModifyTableDetailsRequestDto) => void;
  onCreateClick: () => void;
  onDelete: (id: number) => void;
}

export const TableDetailsContainer = ({
  table,
  onSubmit,
  onCreateClick,
  onDelete,
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
        className="p-5 rounded-xl"
        style={{
          width: "320px",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
        }}
      >
        <button
          onClick={onCreateClick}
          className="w-full p-3 rounded-lg"
          style={{
            background: "var(--accent)",
            color: "var(--text)",
          }}
        >
          + Create table
        </button>
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
      <div className="grid grid-cols-2">
        <div>
          <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
            Edit table
          </h2>
        </div>
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
      </div>

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
          Típus
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
          <option value="snooker">{getTypeHuString("snooker")}</option>
          <option value="foosball">{getTypeHuString("foosball")}</option>
          <option value="air-hockey">{getTypeHuString("air-hockey")}</option>
        </select>
      </div>

      {/* CATEGORY */}
      <div>
        <label
          className="block mb-1 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Kategória
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
          <option value="competition">
            {getCategoryHuString("competition")}
          </option>
          <option value="normal">{getCategoryHuString("normal")}</option>
          <option value="kids">{getCategoryHuString("kids")}</option>
        </select>
      </div>

      {/* COLOR */}
      <div>
        <label
          className="block mb-1 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Szín
        </label>

        <select
          className="w-full rounded-lg p-2 outline-none"
          style={inputStyle}
          value={form.color}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              color: e.target.value as Color,
            }))
          }
        >
          {COLORS.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* STATUS */}
      <div>
        <label
          className="block mb-2 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Állapot ({form.status}/10)
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

        <span style={{ color: "var(--text)" }}>Rögzített</span>
      </label>
      <div>
        <label className="block mb-1 text-[var(--text-muted)]">Pozíció</label>

        <input
          disabled
          value={`X: ${Math.round(table.position.x)} px | Y: ${Math.round(table.position.y)} px`}
          className="w-full rounded border p-2"
          style={{
            background: "var(--surface-1)",
            borderColor: "var(--border)",
            color: "var(--text-muted)",
            opacity: 0.8,
          }}
        />
      </div>
      <button
        onClick={() => table && onDelete(table.id)}
        className="p-2 rounded bg-red-600"
      >
        Delete
      </button>
    </form>
  );
};
