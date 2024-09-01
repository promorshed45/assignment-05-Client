import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useGetAllReviewsQuery } from '@/redux/features/auth/reviewApi';
import StarRating from '../Home/Review/StartRating';

type Review = {
  _id: string;
  userId?: { name?: string }; 
  rating: number;
  feedback: string;
  createdAt: string;
};

const AllReviews = () => {
  const { data, isError, isLoading } = useGetAllReviewsQuery("");
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  return (
    <div className='px-10 md:px-16 lg:px-20 py-5 md:py-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
      {data?.data?.map((review: Review) => {
         const { _id, userId, rating, feedback, createdAt } = review;
         const userName = userId?.name || 'Anonymous';
         const reviewName = userName.length < 0 ? userName : userId?.name;

        return (
          <div key={_id} className="flex flex-col mb-10 shadow-md py-5 px-4 border-0 border-gray-50 rounded-md">
            <div className="flex items-center gap-4 mb-2">
              <Avatar className="w-12 h-12 shadow-lg">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${reviewName}`}
                />
                {/* <AvatarFallback>
                  {reviewName[0]} 
                </AvatarFallback> */}
              </Avatar>
              <div className="space-y-1 w-full">
                <div className="flex justify-between items-center">
                <div className="font-bold">{reviewName}</div>
                <div className="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex justify-between items-center">
                    <StarRating rating={rating} /> 
                <span className="ml-2 font-semibold">{rating}.0</span>
                </div>
              </div>
              
            </div>
            <p className="text-gray-600 text-[15px]">{feedback}</p>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default AllReviews;
