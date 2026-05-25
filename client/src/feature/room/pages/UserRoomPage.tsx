import type { Table } from "@/feature/table/tableTypes";

interface UserRoomPageProp {
  tablesData: Table[];
}

export const UserRoomPage = ({ tablesData }: UserRoomPageProp) => {
  return (
    <div>
      <div>UserRoomPage</div>
      {tablesData.map((table) => (
        <div key={table.id}>{table.name}</div>
      ))}
    </div>
  );
};
