import React from 'react';

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

interface ServiceComparisonProps {
  services: Service[];
  setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const ServiceComparison: React.FC<ServiceComparisonProps> = ({ services = [], setSelectedServices }) => {
  const handleResetComparison = () => {
    setSelectedServices([]);
  };

  // Check if the services array is empty or undefined
  if (services.length === 0) {
    return <p > </p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">Service Comparison</h3>
      
      <div className="mt-6">
        <h4 className="text-2xl font-bold text-slate-500 py-3">Comparison Results</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map(service => (
            <div key={service._id} className="border p-4 rounded-lg">
              <h4 className="text-xl font-bold">{service.name}</h4>
              <p className="mt-2 text-gray-600">{service.description}</p>
              <p className="mt-2 text-gray-800 font-semibold">Price: ${service.price}</p>
              <p className="mt-2 text-gray-800 font-semibold">Duration: {service.duration} mins</p>
            </div>
          ))}
        </div>
      </div>
      {services.length > 1 && (
        <div className='flex justify-center pt-5'> 
          <button
          onClick={handleResetComparison}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Reset Comparison
        </button>
        </div>
      )}
    </div>
  );
};

export default ServiceComparison;
