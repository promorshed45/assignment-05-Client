import React, { useState } from 'react';
import { GoStar, GoStarFill } from 'react-icons/go';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  onClick?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, onClick }) => {
  const [hover, setHover] = useState<number>(0);

  const handleClick = (newRating: number) => {
    if (setRating) {
      setRating(newRating);
    }
    if (onClick) {
      onClick(newRating);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`cursor-pointer transition-transform duration-300 transform ${
            star <= (hover || rating) ? "text-yellow-500" : "text-gray-300 scale-100"
          }`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          {star <= (hover || rating) ? <GoStarFill size={24} /> : <GoStar size={24} />}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
