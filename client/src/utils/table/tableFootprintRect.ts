import type { Table } from "@/feature/table/tableTypes";
import { getTableSize } from "./tableSize";

export const getFootprintRect = (table: Table, footprint: number) => {
  const size = getTableSize(table.type)!;

  return {
    x1: table.position.x - footprint,
    y1: table.position.y - footprint,
    x2: table.position.x + size.width + footprint,
    y2: table.position.y + size.height + footprint,
  };
};
