import { useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";

type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
  onClick?: (value: number) => void;
};

const StarRating = ({ rating, setRating, onClick }: StarRatingProps) => {
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (star: number) => {
    setRating(star);
    if (onClick) {
      onClick(star);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`cursor-pointer transition-transform duration-300 transform ${
            star <= (hover || rating) ? "text-yellow-500 scale-125" : "text-gray-300 scale-100"
          }`}
          onClick={() => handleClick(star)} 
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        >
          {star <= (hover || rating) ? <GoStarFill /> : <GoStar />}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
