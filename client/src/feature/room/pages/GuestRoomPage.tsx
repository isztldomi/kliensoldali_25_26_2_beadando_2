import type { Table } from "@/feature/table/tableTypes";

interface GuestRoomPageProp {
  tablesData: Table[];
}

export const GuestRoomPage = ({ tablesData }: GuestRoomPageProp) => {
  return (
    <div>
      <div>GuestRoomPage</div>
      {tablesData.map((table) => (
        <div key={table.id}>{table.name}</div>
      ))}
    </div>
  );
};
