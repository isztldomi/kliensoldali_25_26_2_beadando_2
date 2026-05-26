export const BookingStatus = {
  Pending: "pending",
  Accepted: "accepted",
  Declined: "declined",
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface Booking {
  id: number;
  tableId: number;
  tableName: string;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  name: string;
  email: string;
  phone: string;
  headcount: number;
  notes: string;
  status: BookingStatus;
}

export interface CreateBookingRequestDto {
  tableId: number;
  date: string;
  startTime: string;
  endTime: string;
  name: string;
  email: string;
  phone: string;
  headcount: number;
  notes: string;
}
