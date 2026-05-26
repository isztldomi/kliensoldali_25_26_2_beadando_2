import type { Table } from "@/feature/table/tableTypes";
import {
  getCategoryHuString,
  getTypeHuString,
} from "@/utils/table/tableHustring";

interface UserTableDetailsContainerProps {
  table?: Table;
}

export const UserTableDetailsContainer = ({
  table,
}: UserTableDetailsContainerProps) => {
  if (!table) {
    return (
      <div
        className="p-5 rounded-xl"
        style={{
          width: "320px",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          color: "var(--text)",
        }}
      >
        <h2 className="font-bold mb-2">Asztal adatok</h2>

        <p style={{ color: "var(--text-muted)" }}>
          Válassz egy asztalt a térképen
        </p>
      </div>
    );
  }

  const fieldStyle = {
    background: "var(--surface-1)",
    border: "1px solid var(--border)",
    color: "var(--text)",
  };

  return (
    <div
      className="p-5 rounded-xl space-y-4 shrink-0"
      style={{
        width: "320px",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        color: "var(--text)",
      }}
    >
      <h2 className="text-lg font-bold">Asztal részletei</h2>

      <div>
        <label className="block mb-1 text-sm text-[var(--text-muted)]">
          Név
        </label>

        <div className="p-2 rounded-lg" style={fieldStyle}>
          {table.name}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-[var(--text-muted)]">
          Típus
        </label>

        <div className="p-2 rounded-lg" style={fieldStyle}>
          {getTypeHuString(table.type)}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-[var(--text-muted)]">
          Kategória
        </label>

        <div className="p-2 rounded-lg" style={fieldStyle}>
          {getCategoryHuString(table.category)}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-[var(--text-muted)]">
          Szín
        </label>

        <div className="p-2 rounded-lg" style={fieldStyle}>
          {table.color}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-[var(--text-muted)]">
          Állapot
        </label>

        <div className="p-2 rounded-lg" style={fieldStyle}>
          {table.status}/10
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-[var(--text-muted)]">
          Rögzített
        </label>

        <div className="p-2 rounded-lg" style={fieldStyle}>
          {table.isLocked ? "Igen" : "Nem"}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-[var(--text-muted)]">
          Pozíció
        </label>

        <div className="p-2 rounded-lg" style={fieldStyle}>
          X: {Math.round(table.position.x)} px | Y:{" "}
          {Math.round(table.position.y)} px
        </div>
      </div>
    </div>
  );
};
