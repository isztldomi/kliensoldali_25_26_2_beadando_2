import type { Table } from "@/feature/table/tableTypes";
import { getTableSize } from "./tableSize";

export const isOverlapping = (
  a: Table,
  b: Table,
  paddingA: number,
  paddingB: number,
) => {
  const ax1 = a.position.x - paddingA;
  const ay1 = a.position.y - paddingA;
  const ax2 = a.position.x + getTableSize(a.type)!.width + paddingA;
  const ay2 = a.position.y + getTableSize(a.type)!.height + paddingA;

  const bx1 = b.position.x - paddingB;
  const by1 = b.position.y - paddingB;
  const bx2 = b.position.x + getTableSize(b.type)!.width + paddingB;
  const by2 = b.position.y + getTableSize(b.type)!.height + paddingB;

  return !(ax2 < bx1 || ax1 > bx2 || ay2 < by1 || ay1 > by2);
};
