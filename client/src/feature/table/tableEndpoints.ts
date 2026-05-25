export const tableRoutes = {
  tables: "tables",
  table: (id: number) => `tables/${id}`,
  position: (id: number) => `tables/${id}/position`,
  timeslots: (id: number, date?: string) =>
    date ? `tables/${id}/timeslots?date=${date}` : `tables/${id}/timeslots`,
};
