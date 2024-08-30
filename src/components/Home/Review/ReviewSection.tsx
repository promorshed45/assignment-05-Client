import { Button } from "../../ui/button";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import RatingBar from "./RattingBar";
import AddReview from "./AddReview";


const ReviewSection = () => {


  const totalReviews = 35.8;
  const ratings = [
    { rating: 5, count: 14 },
    { rating: 4, count: 6 },
    { rating: 3, count: 4 },
    { rating: 2, count: 0.8 },
    { rating: 1, count: 9 },
  ];


  



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
          <AddReview/>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
