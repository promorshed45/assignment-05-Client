import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CircleAlert } from "lucide-react";
import { ReactNode } from "react";

type TAlertMessageProps = {
    buttonTitle: ReactNode;
    onConfirm: () => void;
}


const AlertMessage = ({ buttonTitle, onConfirm }: TAlertMessageProps ) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="hover:bg-white"> {buttonTitle} </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="justify-center w-1/3 ">
                <AlertDialogHeader className="items-center ">
                    <CircleAlert className="size-16 text-red-500"/>
                    <AlertDialogTitle className="text-4xl text-gray-700"> Are you sure? </AlertDialogTitle>
                    <AlertDialogDescription className="text-lg pt-2">
                    You won't be able to revert this!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="py-5 gap-5 mx-auto">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={onConfirm}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertMessage;
