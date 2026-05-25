import { useState } from "react";
import type { CreateTableRequestDto } from "@/feature/table/tableTypes";
import { COLORS, type Color } from "@/utils/table/tableColors";

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTableRequestDto) => void;
}

export const CreateTableModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateTableModalProps) => {
  const [form, setForm] = useState<CreateTableRequestDto>({
    name: "",
    type: "foosball",
    category: "normal",
    color: "#22c55e",
    status: 10,
    position: {
      x: 100,
      y: 100,
    },
    isLocked: false,
  });

  if (!isOpen) return null;

  const inputStyle = {
    background: "var(--surface-1)",
    color: "var(--text)",
    border: "1px solid var(--border)",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: "rgba(0,0,0,.6)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[420px] rounded-xl p-6 space-y-4"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
        }}
      >
        <h2>Create Table</h2>

        <input
          className="w-full p-2 rounded"
          style={inputStyle}
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />

        <select
          className="w-full p-2 rounded"
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
          <option value="air-hockey">Air hockey</option>
        </select>

        <select
          className="w-full p-2 rounded"
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

        <select
          className="w-full p-2 rounded"
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

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 p-2 rounded"
            style={{
              border: "1px solid var(--border)",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 p-2 rounded"
            style={{
              background: "var(--accent)",
            }}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
