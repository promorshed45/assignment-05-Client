import { Link } from "react-router-dom";
import video from '@/assets/HeroVideo.mp4';

const HeroSection = () => {
  return (
    <section className="relative flex items-center md:h-screen">
      <video src={video} autoPlay muted loop className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/80 "></div>
      <div className="relative flex w-full md:h-full">
        <div className="flex flex-col justify-center items-center p-8 md:p-16 w-full text-white z-10">
          <div className='flex flex-col items-center  mt-8 md:mt-0 space-y-5 w-full md:w-1/2 mx-auto md:space-y-10'>
            <h1 className="text-2xl md:text-5xl font-bold text-center ">
              Best Car Service Center  <br />
              <span className="text-yellow-500 mt-2 py-20"> In Chattagram </span>
            </h1>
            <p className="text-lg text-center md:text-xl"> This is the One stop servicing center.Here we are serving the modern and high technology services... </p>
            <Link to='/service'>
              <button className="my-8 inline-flex text-slate-950 cursor-pointer items-center text-base font-semibold white bg-yellow-500 px-5 py-3.5 rounded-md">
                Book a service
              </button>
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;