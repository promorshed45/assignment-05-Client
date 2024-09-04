/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetServiceByIdQuery, useGetSlotsByServiceIdQuery } from "@/redux/api/ServiceApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { deselectSlot, selectSlot } from "@/redux/features/slot/slotSlice";
import { Button } from "@/components/ui/button";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedSlots = useAppSelector((state) => state.slot.selectedSlots);

  // Fetch service details
  const { data: serviceData, isLoading: serviceLoading, error: serviceError } = useGetServiceByIdQuery(id!);
  const { _id, name, image, description, duration, price } = serviceData?.data || {};
  const { data: slotsData, isLoading: slotsLoading, error: slotsError } = useGetSlotsByServiceIdQuery(_id || '');

  // Fetch User Data
  const { user } = useAppSelector((state) => state.user); 
  
  const handleSlotClick = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      dispatch(deselectSlot(slot));
    } else {
      dispatch(selectSlot(slot));
    }
  };

  const handleBooking = async () => {
    if (selectedSlots.length === 0 || !serviceData || !user._id) {
      console.error("Missing booking information");
      return;
    }

    setIsBooking(true);
    navigate(`/booking/${_id}/${selectedSlots[0]}`);
  };

  const getButtonClass = (slot: any) => {
    if (selectedSlots.includes(slot._id)) return "bg-green-500 text-white shadow-lg";
    if (slot.isBooked === "available") return "text-white bg-blue-500 hover:bg-blue-700";
    return "bg-gray-300 text-gray-500 cursor-not-allowed";
  };

  if (serviceLoading || slotsLoading) {
    return <p>Loading service details...</p>;
  }

  if (serviceError || slotsError) {
    return <p>Error loading service or slots. Please try again later.</p>;
  }

  return (
    <div className="container mx-auto">
      <div
        className="relative w-full h-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6">
          <h1 className="text-3xl font-bold text-white text-center">{name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Service Details</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
          <div className="flex justify-between pt-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Price:</span> ${price}
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Duration:</span> {duration} mins
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="shadow-md rounded-md">
            <Calendar
              value={selectedDate}
              onChange={(value) => setSelectedDate(value as Date)}
              className="w-full text-center border-none rounded-md p-2"
              tileClassName={({ date }) =>
                selectedDate.toDateString() === date.toDateString()
                  ? "bg-green-500 text-white rounded-md"
                  : ""
              }
            />
          </div>
        </div>

        <div className="flex flex-col items-center pt-10 justify-top bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Available Slots</h2>
          <div className="grid grid-cols-2 gap-5">
            {slotsData?.data?.length > 0 ? (
              slotsData.data.map((slot: any) => (
                <Button
                  key={slot._id}
                  onClick={() => handleSlotClick(slot._id)}
                  disabled={slot.isBooked !== "available" || isBooking}
                  className={getButtonClass(slot)}
                >
                  {slot.startTime} - {slot.endTime}
                </Button>
              ))
            ) : (
              <p>No available slots for the selected date.</p>
            )}
          </div>
          {selectedSlots.length > 0 && (
            <div className="text-center mt-6">
              <Button
                onClick={handleBooking}
                className={isBooking ? "opacity-50 cursor-not-allowed" : ""}
                disabled={isBooking}
              >
                {isBooking ? "Booking..." : "Book This Service"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
