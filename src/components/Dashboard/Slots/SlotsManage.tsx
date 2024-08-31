/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCreateSlotMutation,
  useGetSlotsQuery,
  useUpdateSlotMutation,
} from "@/redux/features/slot/slotApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetServicesQuery } from "@/redux/api/ServiceApi";
import { useAppSelector } from "@/redux/hook";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";

export enum SlotStatus {
  AVAILABLE = "available",
  BOOKED = "booked",
  CANCELLED = "cancelled",
}

const SlotsManage = () => {
  const { data: slots, refetch, isFetching } = useGetSlotsQuery(undefined);
  const [updateSlot] = useUpdateSlotMutation();
  const [createSlot] = useCreateSlotMutation();
  const { data: services } = useGetServicesQuery("");
  const { token } = useAppSelector((state) => state.user);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      service: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: any) => {
    const { service, date, startTime, endTime } = data;

    if (!service || !date || !startTime || !endTime) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const slotDetails = { service, date, startTime, endTime };

    try {
      await createSlot({ slotDetails, token }).unwrap();
      setIsModalOpen(false);
      toast.success("Slot created successfully.");
      refetch();
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err.data?.message || "Unknown error occurred");
    }
  };

  const handleUpdateSlotStatus = async (slotId: string, newStatus: SlotStatus) => {
    const slot = slots?.data?.find((slot: any) => slot._id === slotId);
    if (slot && slot.isBooked !== SlotStatus.BOOKED) {
      try {
        await updateSlot({ id: slotId, isBooked: newStatus, token }).unwrap();
        toast.success("Slot Status Updated Successfully");
        refetch();
      } catch (err: any) {
        console.error("Error:", err);
        toast.error(err.data?.message || "Unknown error occurred");
      }
    }
  };

  const getStatusColor = (status: SlotStatus) => {
    switch (status) {
      case SlotStatus.AVAILABLE:
        return "bg-green-100 text-green-800";
      case SlotStatus.BOOKED:
        return "bg-red-100 text-red-800";
      case SlotStatus.CANCELLED:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  return (
    <div className="p-4">
      <div className="px-8">
        <div className="text-center mx-auto">
          <h1 className="text-2xl font-bold mb-6">Slot Management</h1>
        </div>
        {/* Create Slot Modal */}
        <div className="flex justify-end">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="gap-2">
                <PlusIcon className="h-4 w-4" />
                Add New Slot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Slot</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  {/* Service Dropdown */}
                  <Select
                    {...register("service")}
                    onValueChange={(value) => setValue("service", value)}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services?.data?.map((service: any) => (
                        <SelectItem key={service._id} value={service._id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="date"
                    placeholder="Date"
                    {...register("date")}
                    required
                  />
                  <Input
                    type="time"
                    placeholder="Start Time"
                    {...register("startTime")}
                    required
                  />
                  <Input
                    type="time"
                    placeholder="End Time"
                    {...register("endTime")}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="mt-4">
                    Create Slot
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Manage Slots */}
      <main className="p-6">
        <Card>
          <CardContent className="relative">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead> Service Name</TableHead>
                  <TableHead> Date </TableHead>
                  <TableHead> Start Time </TableHead>
                  <TableHead> End Time </TableHead>
                  <TableHead> Status </TableHead>
                  <TableHead className="pl-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='bg-transparent'>
                {slots?.data?.map((slot: any) => {
                  const { _id, service, date, startTime, endTime, isBooked } = slot;
                  return (
                    <TableRow className='bg-transparent' key={_id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell> {new Date(date).toLocaleDateString()} </TableCell>
                      <TableCell> {startTime} </TableCell>
                      <TableCell>{endTime}</TableCell>

                      <TableCell

                      >
                        <Button
                          className={`px-3 py-1 text-center font-medium rounded-lg ${getStatusColor(isBooked)}`}>

                          {isBooked}
                        </Button>
                      </TableCell>

                      <TableCell className="text-center px-4 py-2 space-x-2">
                        <Button
                          className="dark:bg-red-200 dark:text-slate-950"
                          disabled={isBooked === SlotStatus.BOOKED}
                          onClick={() =>
                            handleUpdateSlotStatus(_id, SlotStatus.CANCELLED)
                          }
                        >
                          Set Cancelled
                        </Button>
                        <Button
                          className="dark:bg-green-200 dark:text-slate-950"
                          disabled={isBooked === SlotStatus.BOOKED}
                          onClick={() =>
                            handleUpdateSlotStatus(slot._id, SlotStatus.AVAILABLE)
                          }
                        >
                          Set Available
                        </Button>
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {isFetching ? (
              <div className="w-full h-full absolute top-0 left-0 skeleton opacity-[0.6] rounded-[10px] center">
                <span className="text-primaryMat">Loading...</span>
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SlotsManage;
