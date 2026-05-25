import type { Table } from "@/feature/table/tableTypes";

export const getTableSize = (type: Table["type"]) => {
  switch (type) {
    case "snooker":
      return { width: 190, height: 100 };
    case "air-hockey":
      return { width: 140, height: 70 };
    case "foosball":
      return { width: 120, height: 60 };
  }
};
