import React, { useState, useEffect } from 'react';
import Tooltip from './Tooltip';
import { ChevronUpIcon } from './icons/ChevronUpIcon';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
        <Tooltip text="Scroll to top">
            <button
                type="button"
                onClick={scrollToTop}
                className={`
                    bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-sm
                    hover:bg-slate-300/80 dark:hover:bg-slate-700/80
                    text-slate-700 dark:text-slate-300 
                    hover:text-black dark:hover:text-white
                    rounded-full p-3 shadow-lg transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    focus-visible:ring-black dark:focus-visible:ring-white
                    focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-900
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
                aria-label="Scroll to top"
            >
                <ChevronUpIcon className="w-6 h-6" />
            </button>
        </Tooltip>
    </div>
  );
};

export default ScrollToTopButton;
