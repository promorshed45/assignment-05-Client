import { useGetAllReviewsQuery } from '@/redux/features/auth/reviewApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StarRating from "./StartRating";

type Review = {
  _id: string;
  userId: { name?: string }; 
  rating: number;
  reviewName: string | undefined;
  feedback: string;
  createdAt: string;
};

const Reviews = () => {
  const { data, isError, isLoading } = useGetAllReviewsQuery("");
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  return (
    <>
      {data?.data?.slice(0, 3).map((review: Review) => {
        const { _id, userId, rating, feedback, createdAt } = review;
        const userName = userId?.name || 'Anonymous';
        const reviewName = userName.length < 0 ? userName : userId?.name;

        return (
          <div key={_id} className="flex flex-col mb-10">
            <div className="flex items-center gap-4 mb-2">
            <Avatar className="w-12 h-12 shadow-lg">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${reviewName}`}
                />
                <AvatarFallback>
                {reviewName?.trim() ? reviewName[0] : 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 w-full">
                <div className="flex justify-between items-center">
                <div className="font-bold">{reviewName}</div>
                <div className="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex justify-between items-center">
                    <StarRating rating={rating}/> 
                <span className="ml-2 font-semibold">{rating}.0</span>
                </div>
              </div>
              
            </div>
            <p className="text-gray-600 text-[15px]">{feedback}</p>
          </div>
        );
      })}
    </>
  );
};

export default Reviews;
