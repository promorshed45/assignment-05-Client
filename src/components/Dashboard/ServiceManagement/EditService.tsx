import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IService } from "@/type/service";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { PencilIcon } from "lucide-react";
import { toast } from "sonner";
import { useUpdateServiceMutation } from '@/redux/api/ServiceApi';

type TValues = {
  name: string;
  description: string;
  price: number;
  duration: number;
};



const EditService = ({ data }: IService) => {
  const [updateService] = useUpdateServiceMutation();

  // Initialize the form methods
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TValues>({
    defaultValues: {
      name: data.name || '',
      description: data.description || '',
      price: data.price || 0,
      duration: data.duration || 0,
    },
  });

  // Handle form submission
  const onSubmit = async (values: TValues) => {
    try {
      await updateService(values).unwrap();
      toast.success('Service updated successfully!');
    } catch (error) {
      toast.error('Failed to update service.');
    }
  };

  // Get error message for a specific field
  const getErrorMessage = (field: keyof TValues) => {
    return errors[field]?.message as string;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <PencilIcon className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Service Details</DialogTitle>
          <DialogDescription>
            Fill out the form to update the service.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  placeholder="Enter service name"
                  className="col-span-3"
                  {...field}
                />
              )}
            />
            {errors.name && <p className="text-red-600 col-span-4">{getErrorMessage("name")}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="description"
                  placeholder="Enter service description"
                  className="col-span-3"
                  {...field}
                />
              )}
            />
            {errors.description && <p className="text-red-600 col-span-4">{getErrorMessage("description")}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">Duration</Label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Input
                  id="duration"
                  type="number"
                  className="col-span-3"
                  {...field}
                />
              )}
            />
            {errors.duration && <p className="text-red-600 col-span-4">{getErrorMessage("duration")}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter service price"
                  className="col-span-3"
                  {...field}
                />
              )}
            />
            {errors.price && <p className="text-red-600 col-span-4">{getErrorMessage("price")}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" id="close_service">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save Service</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditService;
