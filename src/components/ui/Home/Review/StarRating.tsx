import { useState } from 'react';
import { GoStar, GoStarFill } from 'react-icons/go';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null); // Define hover state

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`w-6 h-6 cursor-pointer transform transition-transform duration-300 ${
            star <= (hover || rating) ? "text-yellow-500 scale-110" : "text-gray-300 scale-100"
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}  // Set hover state on mouse enter
          onMouseLeave={() => setHover(null)}  // Reset hover state on mouse leave
        >
          {star <= (hover || rating) ? (
            <GoStarFill />
          ) : (
            <GoStar />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
