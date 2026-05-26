import { baseApi } from "@/feature/base/baseApi";
import type {
  CreateBookingRequestDto,
  Booking,
} from "@/feature/booking/bookingTypes";
import { bookingRoutes } from "@/feature/booking/bookingEndpoints";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookingsMy: builder.query<Booking[], void>({
      query: () => bookingRoutes.my,
      providesTags: ["Bookings"],
    }),
    getBookings: builder.query<Booking[], void>({
      query: () => bookingRoutes.bookings,
      providesTags: ["Bookings"],
    }),
    createBooking: builder.mutation<Booking, CreateBookingRequestDto>({
      query: (body) => ({
        url: bookingRoutes.bookings,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bookings", "Timeslot"],
    }),
    setStatus: builder.mutation<Booking, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: bookingRoutes.statusById(id),
        method: "PATCH",
        status,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBookingsMyQuery,
  useGetBookingsQuery,
  useCreateBookingMutation,
  useSetStatusMutation,
} = bookingApi;
