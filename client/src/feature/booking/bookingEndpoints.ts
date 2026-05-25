export const bookingRoutes = {
  my: "bookings/my",
  bookings: "bookings",
  statusById: (id: number) => `bookings/${id}/status`,
};
