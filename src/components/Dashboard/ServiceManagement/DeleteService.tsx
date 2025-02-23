/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { AlertCircleIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteServiceMutation } from "@/redux/api/ServiceApi";

const DeleteService = ({ id }: { id: string }) => {
  const [deletService] = useDeleteServiceMutation();

  const handleDelete = async () => {
    const toastId = toast.loading("Please wait...");
    const modalCloseBtn = document.getElementById(
      "delete-modal-close"
    ) as HTMLElement;

    try {
      const { data } = await deletService({id});
      if (!data) {
        toast.dismiss(toastId);

        return toast.error("An unkown error occurd");
      }
      if (!data.success) {
        toast.dismiss(toastId);

        return toast.error(data.message || "Failed to delete product");
      }
      toast.dismiss(toastId);

      modalCloseBtn.click();
      toast.success("Service deleted successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className="rounded-full">
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <AlertCircleIcon className="size-12 text-red-500" />
          <div className="space-y-2 text-center">
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
            "You won't be able to revert this!",
            </DialogDescription>
          </div>
          
        </div>
        <DialogFooter className="flex justify-center items-center">
            <DialogClose asChild>
              <Button variant="outline" id="delete-modal-close">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteService;