import type {
  ModifyTableDetailsRequestDto,
  Table,
} from "@/feature/table/tableTypes";
import { useEffect, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { RoomContainer } from "@/components/containers/RoomContainer";
import {
  useModifyTableMutation,
  useModifyTablePositionMutation,
} from "@/feature/table/tableApi";
import { ROOM_HEIGHT, ROOM_WIDTH } from "@/feature/room/roomTypes";
import { getFootprint } from "@/utils/table/tableFootprint";
import { getTableSize } from "@/utils/table/tableSize";
import { TableDetailsContainer } from "@/components/containers/TableDetailsContainer";

interface AdminRoomPageProp {
  tablesData: Table[];
}

export const AdminRoomPage = ({ tablesData }: AdminRoomPageProp) => {
  const [roomTables, setRoomTables] = useState<Table[]>(tablesData);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [modifyTablePosition] = useModifyTablePositionMutation();
  const [modifyTable] = useModifyTableMutation();

  const selectedTable =
    roomTables.find((t) => t.id === selectedTableId) ?? undefined;

  useEffect(() => {
    setRoomTables(tablesData);
  }, [tablesData]);

  /* drag and drop */

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    const table = roomTables.find((t) => t.id === Number(active.id));
    setSelectedTableId(table!.id);

    if (!table || table.isLocked) return;

    let updatedPosition: { x: number; y: number } | null = null;
    let updatedId: number | null = null;

    setRoomTables((prev) =>
      prev.map((table) => {
        if (table.id !== Number(active.id)) return table;

        updatedId = table.id;

        updatedPosition = {
          x: Math.max(
            0 + getFootprint(table.type)!,
            Math.min(
              ROOM_WIDTH -
                getTableSize(table.type)!.width! -
                getFootprint(table.type)!,
              table.position.x + delta.x,
            ),
          ),
          y: Math.max(
            0 + getFootprint(table.type)!,
            Math.min(
              ROOM_HEIGHT -
                getTableSize(table.type)!.height! -
                getFootprint(table.type)!,
              table.position.y + delta.y,
            ),
          ),
        };

        return {
          ...table,
          position: updatedPosition,
        };
      }),
    );

    if (updatedId && updatedPosition) {
      modifyTablePosition({
        id: updatedId,
        data: updatedPosition,
      });
    }
  };

  const handleSelectTable = (id: number) => {
    setSelectedTableId(id);
  };

  const handleModifyTable = async (
    id: number,
    data: ModifyTableDetailsRequestDto,
  ) => {
    await modifyTable({
      id,
      data,
    });

    setRoomTables((prev) =>
      prev.map((table) =>
        table.id === id
          ? {
              ...table,
              ...data,
            }
          : table,
      ),
    );

    setSelectedTableId(null);
  };

  return (
    <div>
      <div>AdminRoomPage</div>
      <div className="flex gap-6">
        <div>
          <TableDetailsContainer
            table={selectedTable}
            onSubmit={handleModifyTable}
          />
        </div>
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
