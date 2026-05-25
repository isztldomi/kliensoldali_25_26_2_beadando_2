import type {
  CreateTableRequestDto,
  ModifyTableDetailsRequestDto,
  Table,
} from "@/feature/table/tableTypes";
import { useEffect, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { RoomContainer } from "@/components/containers/RoomContainer";
import {
  useCreateTableMutation,
  useDeleteTableMutation,
  useModifyTableMutation,
  useModifyTablePositionMutation,
} from "@/feature/table/tableApi";
import { ROOM_HEIGHT, ROOM_WIDTH } from "@/feature/room/roomTypes";
import { getFootprint } from "@/utils/table/tableFootprint";
import { getTableSize } from "@/utils/table/tableSize";
import { TableDetailsContainer } from "@/components/containers/TableDetailsContainer";
import { CreateTableModal } from "@/components/modals/CreateTableModal";
import { useDispatch } from "react-redux";
import { addToast } from "@/feature/toast/toastSlice";

interface AdminRoomPageProp {
  tablesData: Table[];
}

export const AdminRoomPage = ({ tablesData }: AdminRoomPageProp) => {
  const dispatch = useDispatch();
  const [roomTables, setRoomTables] = useState<Table[]>(tablesData);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [modifyTablePosition] = useModifyTablePositionMutation();
  const [modifyTable] = useModifyTableMutation();
  const [createTable] = useCreateTableMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteTable] = useDeleteTableMutation();

  const [selectedTable, setSelectedTable] = useState<Table | undefined>();

  useEffect(() => {
    setRoomTables(tablesData);
  }, [tablesData]);

  /* drag and drop */

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    const table = roomTables.find((t) => t.id === Number(active.id));

    if (table) {
      setSelectedTable(table);
      setSelectedTableId(table.id);
    }

    if (!table || table.isLocked) return;

    const updatedPosition = {
      x: Math.max(
        getFootprint(table.type)!,
        Math.min(
          ROOM_WIDTH -
            getTableSize(table.type)!.width! -
            getFootprint(table.type)!,
          table.position.x + delta.x,
        ),
      ),
      y: Math.max(
        getFootprint(table.type)!,
        Math.min(
          ROOM_HEIGHT -
            getTableSize(table.type)!.height! -
            getFootprint(table.type)!,
          table.position.y + delta.y,
        ),
      ),
    };

    setRoomTables((prev) =>
      prev.map((t) =>
        t.id === table.id ? { ...t, position: updatedPosition } : t,
      ),
    );

    modifyTablePosition({
      id: table.id,
      data: updatedPosition,
    });
  };

  const handleSelectTable = (id: number) => {
    setSelectedTableId(id);

    const table = roomTables.find((t) => t.id === id);

    setSelectedTable(table);
  };

  const handleModifyTable = async (
    id: number,
    data: ModifyTableDetailsRequestDto,
  ) => {
    try {
      await modifyTable({ id, data }).unwrap();

      setRoomTables((prev) =>
        prev.map((table) => (table.id === id ? { ...table, ...data } : table)),
      );

      dispatch(
        addToast({
          type: "success",
          message: "Sikeres módosítás",
        }),
      );

      setSelectedTableId(null);
      setSelectedTable(undefined);
    } catch (err) {
      dispatch(
        addToast({
          type: "error",
          message: "Sikertelen módosítás",
        }),
      );
    }
  };

  const handleCreateTable = async (data: CreateTableRequestDto) => {
    try {
      const payload = {
        ...data,
        position: {
          x: getFootprint(data.type)!,
          y: getFootprint(data.type)!,
        },
      };

      const created = await createTable(payload).unwrap();

      setRoomTables((prev) => prev.map((t) => (t.id === -1 ? created : t)));

      dispatch(
        addToast({
          type: "success",
          message: "Sikeres létrehozás",
        }),
      );

      setSelectedTable(created);
      setSelectedTableId(created.id);

      setIsCreateModalOpen(false);
    } catch (err) {
      dispatch(
        addToast({
          type: "error",
          message: "Sikertelen létrehozás",
        }),
      );
    }
  };

  const handleDeleteTable = async (id: number) => {
    try {
      await deleteTable({ id }).unwrap();

      setRoomTables((prev) => prev.filter((table) => table.id !== id));

      dispatch(
        addToast({
          type: "success",
          message: "Sikeres törlés",
        }),
      );

      if (selectedTableId === id) {
        setSelectedTableId(null);
        setSelectedTable(undefined);
      }
    } catch (err) {
      dispatch(
        addToast({
          type: "error",
          message: "Sikertelen törlés",
        }),
      );
    }
  };

  return (
    <div>
      <div className="flex gap-6">
        <div>
          <TableDetailsContainer
            table={selectedTable}
            onSubmit={handleModifyTable}
            onCreateClick={() => setIsCreateModalOpen(true)}
            onDelete={handleDeleteTable}
          />
          <CreateTableModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateTable}
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
