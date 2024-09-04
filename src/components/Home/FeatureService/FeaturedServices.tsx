/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useGetServicesQuery } from "@/redux/api/ServiceApi";
import { Link } from "react-router-dom";
import ServiceComparison from './ServiceComparison';
import { toast } from 'sonner';

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image?: string;
}

const FeaturedServices = () => {
  const { data, isError, isLoading } = useGetServicesQuery("");
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const handleSelectService = (service: any) => {
    setSelectedServices(prevState =>
      prevState.includes(service)
        ? prevState.filter(s => s !== service)
        : [...prevState, service]
    );
    toast.success("added service to Compare")
  };


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  return (
    <section className="py-12 px-5 sm:px-10 bg-yellow-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-yellow-500 mb-8">
          Featured Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.data?.slice(0, 6).map((service: Service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-lg relative"
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-500 hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold">
                  {service.name}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800">{service.name}</h3>
                <p className="mt-4 text-gray-600">{service.description.slice(0, 99)}...</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleSelectService(service)}
                    className={`px-4 py-2 text-white rounded-lg font-semibold transition ${
                      selectedServices.includes(service)
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                  >
                    {selectedServices.includes(service) ? 'Remove' : 'Compare'}
                  </button>
                  <Link to={`/services/${service._id}`}>
                    <button className="px-4 py-2 bg-slate-600 text-white rounded-lg font-semibold transition hover:bg-slate-700">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedServices.length === 2 && (
          <ServiceComparison 
            services={selectedServices} 
            setSelectedServices={setSelectedServices} 
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedServices;
