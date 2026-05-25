import type { Table } from "@/feature/table/tableTypes";
import { useEffect, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { RoomContainer } from "@/components/containers/RoomContainer";

interface AdminRoomPageProp {
  tablesData: Table[];
}

const ROOM_WIDTH = 800;
const ROOM_HEIGHT = 500;

export const AdminRoomPage = ({ tablesData }: AdminRoomPageProp) => {
  const [roomTables, setRoomTables] = useState<Table[]>(tablesData);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  useEffect(() => {
    setRoomTables(tablesData);
  }, [tablesData]);

  /* drag and drop */

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setRoomTables((prev) =>
      prev.map((table) => {
        if (table.id !== Number(active.id)) {
          return table;
        }

        return {
          ...table,
          position: {
            x: Math.max(
              0,
              Math.min(ROOM_WIDTH - 100, table.position.x + delta.x),
            ),
            y: Math.max(
              0,
              Math.min(ROOM_HEIGHT - 60, table.position.y + delta.y),
            ),
          },
        };
      }),
    );
  };

  const handleSelectTable = (id: number) => {
    setSelectedTableId(id);
  };

  return (
    <div>
      <div>AdminRoomPage</div>
      <div className="flex">
        <div>Selected table details</div>
        <div>
          <RoomContainer
            roomTables={roomTables}
            handleDragEnd={handleDragEnd}
            handleSelectTable={handleSelectTable}
            selectedTableId={selectedTableId}
          />
        </div>
      </div>
    </div>
  );
};
