import React from "react";

type RatingBarProps = {
  rating: number;
  count: number;
  total: number;
};


const RatingBar: React.FC<RatingBarProps> = ({ rating, count, total }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 text-lg font-semibold text-gray-800">{rating}.0</div>
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-400 to-blue-500"
        style={{ width: `${(count / total) * 100}%` }}
      />
    </div>
    <div className="w-24 text-sm text-gray-500">{Math.round(count)}K reviews</div>
  </div>
);

export default RatingBar;
