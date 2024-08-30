import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import StarRating from "./StartRating";
import RatingBar from "./RattingBar";

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const totalReviews = 35.8;
  const ratings = [
    { rating: 5, count: 14 },
    { rating: 4, count: 6 },
    { rating: 3, count: 4 },
    { rating: 2, count: 0.8 },
    { rating: 1, count: 9 },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastID = toast.loading("Please wait...");
    try {
      const form = e.currentTarget;
      const comment = form.feedback.value as string;

      if (!comment || comment.length < 15) {
        return toast.error("Review should be at least 15 characters");
      }

      // Replace with actual review submission logic
      await create({ rating, comment });

      toast.dismiss(toastID);
      toast.success("Review submitted!", {
        description: "Thanks for your feedback",
      });
      form.reset();
      setRating(0); // Reset rating after submission
    } catch {
      toast.error("Something went wrong while making this request");
    }
  };

  return (
    <section className="py-12 px-5 sm:px-10 bg-yellow-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-slate-950 mb-8">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8  md:gap-10">
          <Reviews />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-start gap-6 mb-6">
              <div className="text-6xl font-extrabold text-gray-800">4.0</div>
              <div className="flex-1">
                {ratings.map((item) => (
                  <RatingBar
                    key={item.rating}
                    rating={item.rating}
                    count={item.count}
                    total={totalReviews}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Link to="/allreviews">
                <Button className="mt-4 hover:underline">
                  Read all reviews
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 sm:p-5 mx-auto w-full">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Write a Review
            </h3>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
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
                  name="feedback"
                />
              </div>
              <div className="mb-6">
                <Label
                  htmlFor="rating"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Rating:
                </Label>
                <StarRating rating={rating} onClick={setRating} />
              </div>
              <Button
                type="submit"
                className="bg-blue-600 mx-auto text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
