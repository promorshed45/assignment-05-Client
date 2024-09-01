/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import StarRating from "./StartRating";
import { useCreateReviewMutation } from "@/redux/features/auth/reviewApi";
import { useForm } from "react-hook-form";
import { useAppSelector } from '@/redux/hook';

interface FieldValues {
  feedback: string;
  rating: number;
}


const AddReview = () => {
    const [rating, setRating] = useState(0);
    const [addRevies] = useCreateReviewMutation();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>();

    const { user } = useAppSelector((state) => state.user);
    const userId = user._id;

    const onSubmit = async (ReviewsData: FieldValues) => {
    
      try {
        if (!userId) {
          toast.error("Please login...",{
            duration: 1000,
          });
          return;
        }
    
        await addRevies({ ...ReviewsData, userId }).unwrap();
        toast.success("Review submitted!", {
          description: "Thanks for your feedback",
        });
    
        reset(); 
      } catch (err: any) {
        console.error("Error:", err);
        toast.error(err.data?.message || "Unknown error occurred");
      }
    };
    

      
    return (
        <>
           <div className="bg-white shadow-lg rounded-lg p-8 sm:p-5 mx-auto w-full">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Write a Review
            </h3>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
              <div className="mb-6">
                <Label
                  htmlFor="rating"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Rating:
                </Label>
                <StarRating
                  rating={rating}
                  setRating={setRating}
                  onClick={(value) => setValue("rating", value)}
                />
              </div>
                <Label
                  htmlFor="feedback"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Feedback:
                </Label>
                <Textarea
                  placeholder="Share your thoughts and experiences..."
                  className="w-full rounded-lg border border-gray-300 focus:border-blue-500"
                  rows={3}
                  {...register("feedback", { required: "Feedback is required" })}
                />
                {errors.feedback && (
                  <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-blue-600 mx-auto text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </Button>
            </form>
          </div> 
        </>
    );
};

export default AddReview;