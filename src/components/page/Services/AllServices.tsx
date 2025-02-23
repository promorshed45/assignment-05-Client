/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetServicesQuery } from "@/redux/api/ServiceApi";
import { Link } from "react-router-dom";


const AllServices = () => {
  const { data, isError, isLoading } = useGetServicesQuery("");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  return (
    <section className="py-12 px-5 sm:px-10 bg-yellow-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-yellow-500 mb-8"> Featured Services </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {data?.data?.map((data: any) => (
                <Link
                  key={data?._id}
                  to={`/services/${data?._id}`}
                >
                  <div
                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="relative">
                      <img src={data.image} alt={data.name} className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-500 hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold">
                        {data.name}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate -800">{data.name}</h3>
                      <p className="mt-4 text-gray-600">{data.description.slice(0,99)}...</p>
                      <div className="flex justify-between items-center pt-2">
                      <p className="text-gray-700 leading-relaxed"> <span className="font-semibold"> Price: </span> ${data.price}</p>
                      <p className="text-gray-700 leading-relaxed"> <span className="font-semibold"> Duration: </span>  {data.duration} mins</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
      </div>
    </section>
  );
};

export default AllServices;
