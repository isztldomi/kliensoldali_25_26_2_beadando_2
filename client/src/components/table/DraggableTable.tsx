import type { Table } from "@/feature/table/tableTypes";
import { bodyInFootprint } from "@/utils/table/tableBodyInFootprint";
import { getBodyRect } from "@/utils/table/tableBodyReact";
import { getCategoryBorder } from "@/utils/table/tableCategoryBorder";
import { getFootprint } from "@/utils/table/tableFootprint";
import { getFootprintRect } from "@/utils/table/tableFootprintRect";
import {
  getCategoryHuString,
  getTypeHuString,
} from "@/utils/table/tableHustring";
import { getTableSize } from "@/utils/table/tableSize";
import { getStatusOpacity } from "@/utils/table/tableStatusOpacity";
import { useDraggable } from "@dnd-kit/core";

interface DraggableTableProps {
  table: Table;
  allTables: Table[];
  selected?: boolean;
  onSelect?: (id: number) => void;
  draggable?: boolean;
}

export const DraggableTable = ({
  table,
  allTables,
  selected,
  onSelect,
  draggable = false,
}: DraggableTableProps) => {
  const dnd = draggable
    ? useDraggable({
        id: table.id,
        disabled: table.isLocked,
      })
    : null;

  const { attributes, listeners, setNodeRef, transform } = dnd ?? {
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
  };

  const size = getTableSize(table.type);
  const baseOpacity = getStatusOpacity(table.status);
  const categoryBorder = getCategoryBorder(table.category);

  const myFootprint = getFootprint(table.type)!;
  const myFootprintRect = getFootprintRect(table, myFootprint);

  const hasCollision = allTables.some((other) => {
    if (other.id === table.id) return false;

    const otherBodyRect = getBodyRect(other);

    return bodyInFootprint(otherBodyRect, myFootprintRect);
  });

  const effectiveOpacity = hasCollision
    ? Math.max(0.25, baseOpacity * 0.6)
    : baseOpacity;

  return (
    <div
      ref={setNodeRef}
      className="absolute"
      style={{
        left: table.position.x,
        top: table.position.y,
        transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
        willChange: "transform",
      }}
    >
      <div
        className="absolute rounded-md pointer-events-none"
        style={{
          left: -myFootprint,
          top: -myFootprint,
          width: size!.width + myFootprint * 2,
          height: size!.height + myFootprint * 2,

          background: hasCollision
            ? "color-mix(in srgb, var(--error) 15%, transparent)"
            : "", //color-mix(in srgb, var(--border) 10%, transparent)

          border: hasCollision ? "1px solid var(--error)" : "", //1px dashed var(--border)
        }}
      />

      <div
        {...listeners}
        {...attributes}
        onClick={() => onSelect?.(table.id)}
        className="relative flex items-center justify-center rounded-lg select-none shadow-md transition-all"
        style={{
          width: size!.width,
          height: size!.height,

          background: table.color,
          opacity: effectiveOpacity,

          border: table.isLocked ? "2px dashed var(--accent)" : categoryBorder,

          outline: selected ? "2px solid var(--accent)" : undefined,
          outlineOffset: "2px",

          cursor: draggable && !table.isLocked ? "grab" : "pointer",

          color: "var(--text)",
        }}
      >
        <div className="flex flex-col items-center justify-center text-sm font-semibold">
          <span>{table.name}</span>

          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {getTypeHuString(table.type)}
          </span>

          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {getCategoryHuString(table.category)}
          </span>
        </div>
      </div>
    </div>
  );
};
