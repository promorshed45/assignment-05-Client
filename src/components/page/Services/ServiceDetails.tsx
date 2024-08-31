/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetServiceByIdQuery,
  useGetSlotsByServiceIdQuery,
} from "@/redux/api/ServiceApi";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { deselectSlot, selectSlot } from "@/redux/features/slot/slotSlice";
import { Button } from "../../ui/button";

// Header Component
const Header = ({ title, imageUrl }: { title: string, imageUrl: string }) => {
  return (
    <div className="relative w-full h-64 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6">
        <h1 className="text-3xl font-bold text-white text-center">{title}</h1>
        <div />
      </div>
    </div>
  );
};

// Service Info Component
const ServiceInfo = ({ description, price, duration }: { description: string, price: number, duration: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Service Details</h2>
    <p className="text-gray-700 leading-relaxed">{description}</p>
    <div className="flex justify-between pt-3">
      <p className="text-gray-700 leading-relaxed"> <span className="font-semibold"> Price: </span> ${price}</p>
      <p className="text-gray-700 leading-relaxed"> <span className="font-semibold"> Duration: </span>  {duration} mins</p>
    </div>
  </div>
);

// Slot Booking Component
const SlotBooking = ({
  slotsData,
  selectedSlots,
  isBooking,
  handleSlotClick,
  handleBooking,
}: any) => (
  <div className="flex flex-col items-center pt-10 justify-top bg-gray-100 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Available Slots</h2>
    <div>
      {slotsData?.data?.map((slot: any) => (
        <Button
          key={slot._id}
          onClick={() => handleSlotClick(slot._id)}
          disabled={
            slot.isBooked === "booked" ||
            isBooking ||
            slot.isBooked === "cancelled"
          }
          className={`${selectedSlots.includes(slot._id)
            ? "bg-green-500 text-white shadow-lg"
            : slot.isBooked === "available"
              ? "text-white bg-blue-500  hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {slot.startTime} - {slot.endTime}
        </Button>
      ))}
    </div>
    {selectedSlots.length > 0 && (
      <div className="text-center mt-6">
        <Button
          onClick={handleBooking}
          className={`${isBooking ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={isBooking}
        >
          Book This Service
        </Button>
      </div>
    )}
  </div>
);

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate] = useState(new Date());
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedSlots = useAppSelector((state) => state.slot.selectedSlots);

  const {    data: serviceData,
    isLoading: isServiceLoading,
    isError: isServiceError,
  } = useGetServiceByIdQuery(id!);

  const {
    data: slotsData,
    isLoading: isSlotsLoading,
    isError: isSlotsError,
  } = useGetSlotsByServiceIdQuery(serviceData?.data?._id);

  const { user } = useAppSelector((state) => state.user);

  const handleSlotClick = (slotId: string) => {
    if (selectedSlots.includes(slotId)) {
      dispatch(deselectSlot(slotId));
    } else {
      dispatch(selectSlot(slotId));
    }
  };

  const handleBooking = async () => {
    if (selectedSlots.length === 0 || !serviceData || !user.userId) {
      console.error("Missing booking information");
      return;
    }

    setIsBooking(true);
    navigate(`/booking/${serviceData.data._id}/${selectedSlots[0]}`);
  };

  if (isServiceLoading || isSlotsLoading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (isServiceError || isSlotsError) {
    return (
      <div className="text-center text-lg text-red-500">
        Error loading service details or slots
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Header imageUrl={serviceData?.data?.image} title={serviceData?.data?.name} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5">
        <div>
          <ServiceInfo description={serviceData?.data?.description} price={serviceData?.data?.price} duration={serviceData?.data?.duration} />
        </div>

        <div className="flex justify-center">
          <div className="shadow-md rounded-md">
            <Calendar
              value={selectedDate}
              className="w-full text-center border-none rounded-md p-2"
              tileClassName={({ date }) =>
                selectedDate.toDateString() === date.toDateString()
                  ? "bg-green-500 text-white rounded-md"
                  : ""
              }
            />
          </div>


        </div>
        <SlotBooking
          slotsData={slotsData}
          selectedSlots={selectedSlots}
          isBooking={isBooking}
          handleSlotClick={handleSlotClick}
          handleBooking={handleBooking}
        />
      </div>
    </div>
  );
};

export default ServiceDetails;
