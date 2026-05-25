import type { Table } from "@/feature/table/tableTypes";
import { getTableSize } from "./tableSize";

export const getBodyRect = (table: Table) => {
  const size = getTableSize(table.type)!;

  return {
    x1: table.position.x,
    y1: table.position.y,
    x2: table.position.x + size.width,
    y2: table.position.y + size.height,
  };
};
