/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { format } from "date-fns";
import { useGetBookingQuery } from "@/redux/api/bookingApi";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hook";

const UserOverview = () => {
  const { user, token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookingQuery(token);

  console.log(user);

  // const bookingData = data?.data;
  // console.log(bookingData);

  if (!user || user.role !== "user") {
    navigate("/");
    return null;
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  // const pastBookings = bookingData?.filter(
  //   (booking:any) => new Date(booking.slot.date) < new Date()
  // );
  const bookingData = data?.data?.filter(
    (booking:any) => new Date(booking.slot.date) >= new Date()
  );

  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
    <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">User Dashboard</h1>
  
    {/* Overview Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      {/* Account Info */}
      <Card className="bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-4">Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            <strong>Name:</strong> {user?.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user?.email}
          </p>
          <Button
            onClick={() => navigate("/dashboard/update-profile")}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500 transition-all"
          >
            Update Profile
          </Button>
        </CardContent>
      </Card>
  
      {/* Next Service Slot */}
      {bookingData.length > 0 && (
        <Card className="bg-white shadow-lg rounded-lg p-6 relative">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold mb-4">Next Service Slot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold mb-2">{bookingData[0].service.name}</p>
            <Countdown
              date={new Date(bookingData[0].slot.date)}
              renderer={renderCountdown}
              className="text-lg text-gray-600"
            />
          </CardContent>
        </Card>
      )}

        
      {/* Past Bookings */}
      <Card className="lg:col-span-3 bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-4">Past Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingData?.map((booking: any) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.service.name}</TableCell>
                  <TableCell>{format(new Date(booking.slot.date), "yyyy-MM-dd")}</TableCell>
                  <TableCell>{booking.slot.isBooked ? 'Completed' : 'Pending'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  
    {/* Upcoming Bookings */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookingData?.map((booking: any) => (
          <Card key={booking._id} className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{booking.service.name}</h3>
            <p className="text-lg mb-4">
              {format(new Date(booking.slot.date), "yyyy-MM-dd")} {booking.slot.startTime}
            </p>
            <Countdown
              date={new Date(bookingData[0].slot.date)}
              renderer={renderCountdown}
              className="text-lg text-gray-600"
            />
          </Card>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default UserOverview;
