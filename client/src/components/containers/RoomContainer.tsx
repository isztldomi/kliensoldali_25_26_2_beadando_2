import { DndContext, useDraggable, type DragEndEvent } from "@dnd-kit/core";
import type { Table } from "@/feature/table/tableTypes";

const ROOM_WIDTH = 800;
const ROOM_HEIGHT = 500;

const TABLE_WIDTH = 100;
const TABLE_HEIGHT = 60;

interface RoomContainerProps {
  roomTables: Table[];
  handleDragEnd: (event: DragEndEvent) => void;
  handleSelectTable: (id: number) => void;
  selectedTableId: number | null;
}

export const RoomContainer = ({
  roomTables,
  handleDragEnd,
  handleSelectTable,
  selectedTableId,
}: RoomContainerProps) => {
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className="relative border rounded-lg bg-gray-100 overflow-hidden"
        style={{
          width: ROOM_WIDTH,
          height: ROOM_HEIGHT,
        }}
      >
        {roomTables.map((table) => (
          <DraggableTable
            key={table.id}
            table={table}
            selected={selectedTableId === table.id}
            onSelect={handleSelectTable}
          />
        ))}
      </div>
    </DndContext>
  );
};

interface DraggableTableProps {
  table: Table;
  selected: boolean;
  onSelect: (id: number) => void;
}

const DraggableTable = ({ table, selected, onSelect }: DraggableTableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: table.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onSelect(table.id)}
      className="absolute flex items-center justify-center rounded-lg border-2 cursor-grab select-none shadow"
      style={{
        width: TABLE_WIDTH,
        height: TABLE_HEIGHT,
        left: table.position.x,
        top: table.position.y,
        background: table.color,
        borderColor: selected ? "#2563eb" : "transparent",
        transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
      }}
    >
      {table.name}
    </div>
  );
};
