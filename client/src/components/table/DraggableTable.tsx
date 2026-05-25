import type { Table } from "@/feature/table/tableTypes";
import { getCategoryBorder } from "@/utils/table/tableCategoryBorder";
import { getFootprint } from "@/utils/table/tableFootprint";
import { isOverlapping } from "@/utils/table/tableIsOverlapping";
import { getTableSize } from "@/utils/table/tableSize";
import { getStatusOpacity } from "@/utils/table/tableStatusOpacity";
import { useDraggable } from "@dnd-kit/core";

interface DraggableTableProps {
  table: Table;
  allTables: Table[];
  selected: boolean;
  onSelect: (id: number) => void;
}

export const DraggableTable = ({
  table,
  allTables,
  selected,
  onSelect,
}: DraggableTableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: table.id,
    disabled: table.isLocked,
  });

  const size = getTableSize(table.type);
  const opacity = getStatusOpacity(table.status);
  const border = getCategoryBorder(table.category);

  const footprint = getFootprint(table.type)!;

  const hasCollision = allTables.some((other) => {
    if (other.id === table.id) return false;

    const otherFootprint = getFootprint(other.type)!;
    return isOverlapping(table, other, footprint, otherFootprint);
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onSelect(table.id)}
      className="absolute flex items-center justify-center rounded-lg cursor-grab active:cursor-grabbing select-none shadow"
      style={{
        width: size!.width,
        height: size!.height,

        left: table.position.x,
        top: table.position.y,

        background: table.color,
        opacity,

        border,

        borderColor: hasCollision
          ? "var(--error)"
          : selected
            ? "var(--accent)"
            : undefined,

        transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
        willChange: "transform",
      }}
    >
      <div className="flex flex-col items-center justify-center text-white text-sm font-semibold">
        <span>{table.name}</span>
        <span className="text-xs opacity-70">{table.type}</span>
      </div>
    </div>
  );
};
