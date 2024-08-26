import React from 'react';

const SortingService = () => {
  const handleSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log("Selected sorting order:", selectedValue);
    // Add your sorting logic here based on the selectedValue (asc or desc)
  };

  return (
    <div className="flex items-center">
      <label className="mr-2 text-gray-700 font-medium">Sort By Price:</label>
      <select
        className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        onChange={handleSorting}
      >
        <option value="">Select</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
};

export default SortingService;
