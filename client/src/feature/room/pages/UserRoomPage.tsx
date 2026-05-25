import type { Table } from "@/feature/table/tableTypes";
import { useEffect, useState } from "react";
import { RoomContainer } from "@/components/containers/RoomContainer";

interface UserRoomPageProp {
  tablesData: Table[];
}

export const UserRoomPage = ({ tablesData }: UserRoomPageProp) => {
  const [roomTables, setRoomTables] = useState<Table[]>(tablesData);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  useEffect(() => {
    setRoomTables(tablesData);
  }, [tablesData]);

  /* drag and drop */

  const handleSelectTable = (id: number) => {
    setSelectedTableId(id);
  };

  return (
    <div>
      <div>UserRoomPage</div>
      <div className="flex">
        <div>
          <RoomContainer
            roomTables={roomTables}
            handleSelectTable={handleSelectTable}
            selectedTableId={selectedTableId}
          />
        </div>
      </div>
    </div>
  );
};
