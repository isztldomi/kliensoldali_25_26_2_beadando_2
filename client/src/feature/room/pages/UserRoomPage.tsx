import type { Table } from "@/feature/table/tableTypes";
import { useEffect, useState } from "react";
import { RoomContainer } from "@/components/containers/RoomContainer";
import { UserTableDetailsContainer } from "@/components/containers/UserTableDetailsContainer";
import { TableTimeslotsContainer } from "@/components/containers/TableTimeslotsContainer";

interface UserRoomPageProp {
  tablesData: Table[];
}

export const UserRoomPage = ({ tablesData }: UserRoomPageProp) => {
  const [roomTables, setRoomTables] = useState<Table[]>(tablesData);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [selectedTable, setSelectedTable] = useState<Table>();

  useEffect(() => {
    setRoomTables(tablesData);
  }, [tablesData]);

  const handleSelectTable = (id: number) => {
    setSelectedTableId(id);

    const table = roomTables.find((t) => t.id === id);

    setSelectedTable(table);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-6">
        <div>
          <UserTableDetailsContainer table={selectedTable} />
        </div>
        <div>
          <RoomContainer
            roomTables={roomTables}
            handleSelectTable={handleSelectTable}
            selectedTableId={selectedTableId}
          />
        </div>
        <div>
          <TableTimeslotsContainer tableId={selectedTableId ?? undefined} />
        </div>
      </div>
    </div>
  );
};
