/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingInfo: any) => {
        const token = bookingInfo.token;
        return {
          url: "/bookings",
          method: "POST",
          body: bookingInfo,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getBooking: builder.query({
      query: (token) => ({
        url: "/my-bookings",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllBookings: builder.query({
      query: (token) => ({
        url: `/bookings`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingQuery,
  useGetAllBookingsQuery,
} = bookingApi;
