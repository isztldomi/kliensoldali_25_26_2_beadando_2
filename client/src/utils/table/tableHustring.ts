import type { Table } from "@/feature/table/tableTypes";

export const getCategoryHuString = (category: Table["category"]) => {
  switch (category) {
    case "competition":
      return "Verseny";
    case "normal":
      return "Normál";
    case "kids":
      return "Gyerek";
  }
};

export const getTypeHuString = (type: Table["type"]) => {
  switch (type) {
    case "snooker":
      return "Biliárd";
    case "air-hockey":
      return "Léghoki";
    case "foosball":
      return "Csocsó";
  }
};
