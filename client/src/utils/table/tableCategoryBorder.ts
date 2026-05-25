import type { Table } from "@/feature/table/tableTypes";

export const getCategoryBorder = (category: Table["category"]) => {
  switch (category) {
    case "competition":
      return "3px solid var(--accent)";
    case "normal":
      return "2px solid var(--border)";
    case "kids":
      return "2px dashed var(--accent)";
  }
};
