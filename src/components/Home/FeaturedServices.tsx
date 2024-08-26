

const FeaturedServices = () => {
  return (
    <section className="py-12 px-5 sm:px-10 bg-yellow-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-yellow-500 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-lg"
            >
              <div className="relative">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover"/>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-500 hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold">
                  {service.title}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate -800">{service.title}</h3>
                <p className="mt-4 text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;

const services = [
    {
      title: 'Exterior Wash',
      description: 'A thorough cleaning of your car\'s exterior, including hand washing, waxing, and drying to leave your car shining.',
      image: 'https://5.imimg.com/data5/WW/YV/BA/SELLER-94110890/washing-jpg-1000x1000.JPG', 
    },
    {
      title: 'Interior Detailing',
      description: 'Comprehensive interior cleaning, including vacuuming, upholstery shampooing, and dashboard polishing.',
      image: 'https://images.squarespace-cdn.com/content/v1/5cf81863a20dd2000179f584/639a56d3-dc72-4d15-afba-0e673ca24113/vci95f5uTDnY4U2ThLdxK2ABTAw9XvkP1671030463.jpg',
    },
    {
      title: 'Engine Cleaning',
      description: 'Professional engine cleaning to remove grime, dirt, and oil for better performance and longevity.',
      image: 'https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2021/08/05102404/wipping-car-engine-080520210315.jpg',
    },
    {
      title: 'Tire & Wheel Care',
      description: 'Tire and wheel cleaning, polishing, and protective coating to enhance appearance and extend lifespan.',
      image: 'https://automaniacs.us/cdn/shop/files/wheel_set_3_LS.jpg?v=1721808598',
    },
    {
      title: 'Wax & Polish',
      description: 'High-quality wax and polish treatment to protect your car\'s paint and keep it looking new.',
      image: 'https://www.carpro-us.com/product_images/uploaded_images/skysthelimitcarcare-135833-waxing-polishing-car-blogbanner1.jpg',
    },
    {
      title: 'Ceramic Coating',
      description: 'Long-lasting ceramic coating service for ultimate protection against environmental damage and easy maintenance.',
      image: 'https://ezautospa.com/wp-content/uploads/2023/08/ceramic-coating-1-scaled.jpg',
    },
  ];