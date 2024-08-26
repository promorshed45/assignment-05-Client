import { useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { toast } from "sonner";

const RatingBar = ({ rating, count, total }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 text-lg font-semibold text-gray-800">{rating}.0</div>
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-400 to-blue-500"
        style={{ width: `${(count / total) * 100}%` }}
      />
    </div>
    <div className="w-24 text-sm text-gray-500">{count}K reviews</div>
  </div>
);

const StarRating = ({ rating, onClick }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`cursor-pointer transition-transform duration-300 transform ${
            star <= (hover || rating)
              ? "text-yellow-500 scale-125"
              : "text-gray-300 scale-100"
          }`}
          onClick={() => onClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        >
          {star <= (hover || rating) ? <GoStarFill /> : <GoStar />}
        </div>
      ))}
    </div>
  );
};

const Review = ({ name, rating, date, comment }) => (
  <div className="py-6">
    <div className="flex items-center gap-4 mb-2">
      <Avatar className="w-12 h-12 shadow-lg">
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
        />
        <AvatarFallback>
          {name[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-bold text-base">{name}</div>
        <div className="text-sm text-gray-400">{date}</div>
      </div>
      <div className="ml-auto flex items-center">
        <StarRating rating={rating} onClick={() => { }} />
        <span className="ml-2 font-semibold">{rating}.0</span>
      </div>
    </div>
    <p className="text-gray-600 text-[15px]">{comment}</p>
  </div>
);


export default function Component() {
  const [rating, setRating] = useState(0);
  const totalReviews = 35.8;
  const ratings = [
    { rating: 5, count: 14 },
    { rating: 4, count: 6 },
    { rating: 3, count: 4 },
    { rating: 2, count: 0.8 },
    { rating: 1, count: 9 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastID = toast.loading("Please wait...");
    try {
      const form = e.target as HTMLFormElement;
      const comment = form.feedback.value as string;
      if (!comment || comment.length < 15) {
        return toast.error("review should be at least 15 character");
      }
      // await createReview({
      //   rating: review,
      //   comment,
      // });
      toast.dismiss(toastID);
      toast.success("Review submitted!", {
        description: "Thanks for your feedback",
      });
    e.target.reset();
      // form.reset();
    } catch {
      toast.error("something went wrong while making this request");
    }
  };

  return (
    <section className="py-12 px-5 sm:px-10 bg-yellow-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-slate-950 mb-8"> Customer Reviews </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          <Review
            name="Alexander Rity"
            rating={5}
            date="4 months ago"
            comment="Easy booking, great value! Cozy rooms at a reasonable price in Sheffield's vibrant center. Surprisingly quiet with nearby Traveller's accommodations. Highly recommended!"
          />
          <Review
            name="Emma Crieght"
            rating={4}
            date="4 months ago"
            comment="Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield's nightlife hub. Surrounded by elegant housing, it's a peaceful gem. Thumbs up!"
          />
          <Review
            name="Emma Crieght"
            rating={4}
            date="4 months ago"
            comment="Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield's nightlife hub. Surrounded by elegant housing, it's a peaceful gem. Thumbs up!"
          />
          
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
          <Button  className="mt-4 hover:underline">
            Read all reviews
          </Button>
          </div>
          </div>

         

          <div className="bg-white shadow-lg rounded-lg p-8 sm:p-5 mx-auto w-full">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Write a Review</h3>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <StarRating rating={rating} onClick={setRating} />
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
}
