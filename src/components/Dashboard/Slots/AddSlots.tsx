// components/AddSlotModal.tsx
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import Swal from "sweetalert2";
import { useCreateSlotMutation } from "@/redux/api/SlotApi";
import { useGetServicesQuery } from "@/redux/api/servicesApi";
import { useAppSelector } from "@/redux/hooks";

interface AddSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [service, setService] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [createSlot] = useCreateSlotMutation();
  const { data: services } = useGetServicesQuery("");
  const { token } = useAppSelector((state) => state.user);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!service || !date || !startTime || !endTime) {
      Swal.fire({
        title: "Error!",
        text: "Please fill out all fields before submitting.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await createSlot({ service, date, startTime, endTime, token }).unwrap();
      onClose();
      Swal.fire({
        title: "Success!",
        text: "Slot created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      onSuccess();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error creating the slot.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button onClick={() => onClose()} className="mb-4">
          Create New Slot
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Slot</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <Select value={service} onValueChange={(value) => setService(value)} required>
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
            <Input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <Input type="time" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            <Input type="time" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-4">Create Slot</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSlotModal;
