import type { Table } from "@/feature/table/tableTypes";

export const getFootprint = (type: Table["type"]) => {
  switch (type) {
    case "snooker":
      return 50;
    case "air-hockey":
      return 40;
    case "foosball":
      return 30;
  }
};
