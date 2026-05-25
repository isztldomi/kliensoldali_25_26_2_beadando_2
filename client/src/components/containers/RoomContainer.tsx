import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Table } from "@/feature/table/tableTypes";
import { ROOM_HEIGHT, ROOM_WIDTH } from "@/feature/room/roomTypes";
import { DraggableTable } from "../table/DraggableTable";

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
        className="relative border rounded-lg overflow-hidden"
        style={{
          width: ROOM_WIDTH,
          height: ROOM_HEIGHT,
          background: "var(--surface-2)",
          borderColor: "var(--border)",
        }}
      >
        {roomTables.map((table) => (
          <DraggableTable
            key={table.id}
            table={table}
            allTables={roomTables}
            selected={selectedTableId === table.id}
            onSelect={handleSelectTable}
          />
        ))}
      </div>
    </DndContext>
  );
};
