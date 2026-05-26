import type { Table } from "@/feature/table/tableTypes";
import { RoomContainer } from "@/components/containers/RoomContainer";

interface GuestRoomPageProp {
  tablesData: Table[];
}

export const GuestRoomPage = ({ tablesData }: GuestRoomPageProp) => {
  return (
    <div>
      <div className="flex">
        <div>
          <RoomContainer roomTables={tablesData} />
        </div>
      </div>
    </div>
  );
};
