import React, { useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";

type StarRatingProps = {
  rating: number;
  onClick?: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, onClick }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`cursor-pointer transition-transform duration-300 transform ${star <= (hover || rating) ? "text-yellow-500 scale-125" : "text-gray-300 scale-100"}`}
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

export default StarRating;
