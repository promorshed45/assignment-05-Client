/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { jwtDecode } from "jwt-decode";
import { useGetServiceByIdQuery, useGetSingleSlotsByIdQuery } from "@/redux/api/ServiceApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toast } from "sonner";
import { clearSlots } from "@/redux/features/slot/slotSlice";

// Define the structure of your decoded token
interface DecodedToken {
    userId: string;
    name: string;
    email: string;
}

const BookingPage = () => {
    const { serviceId, slotId } = useParams<{ serviceId: string; slotId: string; }>();
    const { data: serviceData } = useGetServiceByIdQuery(serviceId!);
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.user);
    const { data: slotData } = useGetSingleSlotsByIdQuery(slotId!);
    const [createBooking] = useCreateBookingMutation();

    // Decode the token to get user details
    let decodedToken: DecodedToken | null = null;
    if (token) {
        decodedToken = jwtDecode<DecodedToken>(token);
    }

    // const {
    //   register,
    //   formState: { errors },
    // } = useForm<FormData>({
    //   defaultValues: {
    //     userName: decodedToken?.name || "Programming Hero", // Use the name from decoded token
    //     email: decodedToken?.email || "", // Use the email from decoded token
    //     timeSlot: slotData?.data?.startTime || "",
    //   },
    // });

    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async () => {
        const bookingInfo = {
            serviceId: serviceData?.data?._id,
            slotId: slotId,
            customer: decodedToken?.userId,
            token: token,
        };

        try {
            const res = await createBooking(bookingInfo).unwrap();
            console.log(res);
            if (res.success) {
                window.location.href = res.data.paymentSession.payment_url;
                toast.success("Payment successful",{
                    duration: 15000,
                })
                dispatch(clearSlots());

                // Redirect to success page after payment
                // navigate("/success");
            } else {
                console.error("Order creation failed:", res.message);
            }
        } catch (error) {
            console.log(error);
            console.error("Payment failed:", error);
            toast.error("Payment failed",)
        }
    };

    return (
        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side: Selected Service and Slots */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-4">{serviceData?.data?.name}</h2>
                <img
                    src={serviceData?.data?.image}
                    alt={serviceData?.data?.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Selected Slots:</h3>
                <div className="p-4 bg-blue-100 rounded-lg">
                    <p className="text-lg font-semibold">
                        {slotData?.data?.startTime} - {slotData?.data?.endTime}
                    </p>
                </div>
            </div>

            {/* Right Side: User Information Form */}
            <div className="flex-1 p-6 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="userName" className="block text-lg font-medium">
                            Name
                        </label>
                        <input
                            defaultValue={decodedToken?.name}
                            id="userName"
                            {...register("userName", { required: true })}
                            type="text"
                            className="w-full p-2 border rounded-lg"
                        />
                        {errors.userName && (
                            <p className="text-red-500">Name is Required</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium">
                            Email
                        </label>
                        <input
                            defaultValue={decodedToken?.email}
                            id="email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[^@]+@[^@]+\.[^@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            className="w-full p-2 border rounded-lg"
                        />
                        {errors.email && <p className="text-red-500">Email is Required</p>}
                    </div>
                    <div>
                        <label htmlFor="timeSlot" className="block text-lg font-medium">
                            Time Slot
                        </label>
                        <input
                            id="timeSlot"
                            {...register("timeSlot")}
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            readOnly
                            value={slotData?.data?.startTime || ""}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[#30415A] text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Pay Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
