/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { PencilIcon } from "lucide-react";
import { toast } from "sonner";
import { useUpdateServiceMutation } from "@/redux/api/ServiceApi";
import { useAppSelector } from "@/redux/hook";
import { useNavigate } from "react-router";

type TValues = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  duration: number;
};

const UpdateServiceData = ({ service }: any) => {
  const [updateService] = useUpdateServiceMutation();
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors }, } = useForm<TValues>({
    defaultValues: {
      _id: service._id || "",
      name: service.name || "",
      image: service.image || "",
      description: service.description || "",
      price: service.price || 0,
      duration: service.duration || 0,
    },
  });

  const onSubmit = async (updatedService: TValues) => {
    try {
      const payload = {
        ...updatedService,
        price: Number(updatedService.price),
        duration: Number(updatedService.duration),
      };

      await updateService({ id: updatedService._id.toString(), token, payload }).unwrap();
      toast.success("Service updated successfully!", {
        duration: 2000,
      });
      navigate('/dashboard/service-management');
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service.");
    }
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
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
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
            {errors.name && (
              <p className="text-red-600 col-span-4">{errors.name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Controller
              name="image"
              control={control}
              rules={{ required: "Image URL is required" }}
              render={({ field }) => (
                <Input
                  id="image"
                  placeholder="Enter image URL"
                  className="col-span-3"
                  {...field}
                />
              )}
            />
            {errors.image && (
              <p className="text-red-600 col-span-4">{errors.image.message}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
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
            {errors.description && (
              <p className="text-red-600 col-span-4">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
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
            {errors.duration && (
              <p className="text-red-600 col-span-4">
                {errors.duration.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
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
            {errors.price && (
              <p className="text-red-600 col-span-4">{errors.price.message}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" id="close_service">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Update Service</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateServiceData;
