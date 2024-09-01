/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/redux/hook";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import { Card, CardContent } from "@/components/ui/card";

const BookingList: React.FC = () => {
  const { token } = useAppSelector((state) => state.user);
  const { data: bookings, isLoading, isError } = useGetAllBookingsQuery(token);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users Bookings</h1>
      <main className="p-6">
        <Card>
          <CardContent className="relative">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time Slot</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='bg-transparent'>
                {bookings?.data?.map((booking: any) => {
                  const { _id, customer, service, slot } = booking;
                  return (
                    <TableRow className='bg-transparent' key={_id}>
                      <TableCell className="font-medium"> {customer?.name || "N/A"} </TableCell>
                      <TableCell>{service?.name || "N/A"}</TableCell>
                      <TableCell>{slot?.date || "N/A"}</TableCell>
                      <TableCell>
                        <div
                          className={`py-2 rounded-md text-center font-semibold text-white ${slot.isBooked === 'confirm'
                              ? 'bg-green-500'
                              : slot.isBooked === 'pending'
                                ? 'bg-orange-500'
                                : slot.isBooked === 'cancelled'
                                  ? 'bg-red-500'
                                  : slot.isBooked === 'booked'
                                    ? 'bg-blue-500'
                                    : ''
                            }`}
                        >
                          {slot.isBooked}
                        </div>
                      </TableCell>


                      <TableCell>
                        {slot.startTime || "Time Not Available"}
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BookingList;
