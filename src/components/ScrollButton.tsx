import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 p-2 rounded-full bg-yellow-500 text-white-950"
    >
      <ArrowUp className='text-slate-900 hover:scale-110'/>
    </button>
  ) : null;
};


export default ScrollButton;