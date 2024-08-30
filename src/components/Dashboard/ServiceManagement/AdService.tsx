import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { useAddServiceMutation } from "@/redux/api/ServiceApi";

type TFormValues = {
  name: string;
  description: string;
  price: number;
  duration: number;
};

const AddService = () => {
  const [createService] = useAddServiceMutation(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: 0,
    },
  });

  const onSubmit = async (data: TFormValues) => {
    try {
      await createService(data).unwrap();
      toast.success("Service added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add service.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new service.
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
              rules={{ required: "Name is required" }}
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
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
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
              rules={{ required: "Duration is required" }}
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
              rules={{ required: "Price is required" }}
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
            <Button type="submit">Save Service</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddService;
