
const RatingBar = ({ rating, count, total }) => {
    return (
        <div className="flex items-center gap-2">
      <div className="w-10 text-sm font-medium">{rating}.0</div>
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500"
          style={{ width: `${(count / total) * 100}%` }}
        />
      </div>
      <div className="w-24 text-sm text-gray-500">{count}K reviews</div>
    </div>
    );
};

export default RatingBar;