import { Button } from "../../ui/button";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import AddReview from "./AddReview";
import { useGetAllReviewsQuery } from "@/redux/features/auth/reviewApi";
import RatingBar from "./RattingBar";

const ReviewSection = () => {
  const { data, isError, isLoading } = useGetAllReviewsQuery("");
  const reviews = data?.data;

  console.log(reviews);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const totalReviews = reviewsArray.length;

  console.log(totalReviews);

  // Calculate the average rating
  const averageRating =
    totalReviews > 0
      ? reviewsArray.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

  // Count the number of reviews for each rating
  const ratingsCount = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviewsArray.filter((review) => review.rating === rating).length,
  }));

  return (
    <section className="py-12 px-5 sm:px-10 bg-yellow-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-slate-950 mb-8">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          <Reviews />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-start gap-6 mb-6">
              <div className="text-6xl font-extrabold text-gray-800">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex-1">
                {ratingsCount.map((item) => (
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
          <AddReview />
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
