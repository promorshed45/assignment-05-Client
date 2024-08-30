// import FeaturedServices from "@/components/Home/FeaturedServices";
// import HeroSection from "@/components/Home/HeroSection";
import ReviewSection from "@/components/Home/Review/ReviewSection";
import { useEffect } from "react";



const MainLayout = () => {
  useEffect(() => {
    window.onbeforeunload = function () {
      return;
    };
  });
  return (
    <>
     {/* <HeroSection/>
     <FeaturedServices/> */}
     <ReviewSection/>
     </>
  );
};

export default MainLayout;
