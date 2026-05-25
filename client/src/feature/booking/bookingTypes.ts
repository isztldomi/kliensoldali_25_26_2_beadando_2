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
  status: string;
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
