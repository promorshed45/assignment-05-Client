import { TService, TServiceCardProps } from '@/type';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

const services: TService[] = [
  { name: 'Basic Wash', description: 'Exterior wash with a thorough rinse.', price: '15', duration: '20' },
  { name: 'Deluxe Wash', description: 'Exterior and interior cleaning with vacuuming.', price: '30', duration: '40' },
  { name: 'Premium Wash', description: 'Complete wash with wax and polish.', price: '50', duration: '60' },
  { name: 'Ultimate Wash', description: 'Full service including undercarriage and engine bay.', price: '75', duration: '90' },
];

const ServiceCard = ({ name, description, price, duration }: TServiceCardProps) => (
  <motion.div 
    className="bg-white rounded-xl shadow-lg p-6 w-64 text-left transform transition-transform hover:scale-105 flex flex-col justify-between h-full"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div>
      <h3 className="text-2xl font-semibold text-yellow-500 mb-4"> {name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
    <div className="mt-auto">
      <div className="flex justify-between text-gray-800 font-bold mb-4">
        <span>${price}</span>
        <span>{duration} mins</span>
      </div>
      <div><Button>Book Now</Button></div>
    </div>
  </motion.div>
);

const ServicesSection = () => (
  <section className="py-12 bg-gradient-to-r from-gray-100 to-gray-200 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Car Wash Services Plan</h2>
    <div className="flex flex-wrap justify-center gap-6">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          name={service.name}
          description={service.description}
          price={service.price}
          duration={service.duration}
        />
      ))}
    </div>
  </section>
);

export default ServicesSection;
