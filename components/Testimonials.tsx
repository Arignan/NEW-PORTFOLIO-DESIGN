import React, { useState, useEffect } from 'react';
import type { Testimonial } from '../types';
import { QuoteIcon } from './icons/QuoteIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const testimonialsData: Testimonial[] = [
  {
    quote: "Arignan is one of the most dedicated and quick-learning students I have had the pleasure of mentoring. His ability to grasp complex robotics concepts and apply them to practical projects is truly impressive.",
    author: "Dr. Evelyn Reed",
    title: "Professor of Robotics, Rhine-Waal University",
    imageUrl: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    quote: "Collaborating with Arignan on the Omdena projects was a fantastic experience. He is a proactive team player who consistently delivers high-quality work and is always willing to help others. His contributions to our machine learning models were invaluable.",
    author: "John Chen",
    title: "Lead ML Engineer, Omdena",
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    quote: "His passion for AI and innovation is contagious. Arignan doesn't just solve problems; he seeks out challenges and pushes the boundaries of what's possible. He would be a tremendous asset to any research or engineering team.",
    author: "Maria Rodriguez",
    title: "Senior AI Researcher",
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };
  
   // Auto-play functionality
    useEffect(() => {
        const timer = setInterval(() => {
            nextTestimonial();
        }, 7000); // Change testimonial every 7 seconds

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-slate-100 dark:bg-slate-900 section-fade-in">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-16 tracking-tight">
          What Others Say
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
              {testimonialsData.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-2xl shadow-lg dark:shadow-black/20 text-center">
                    <QuoteIcon className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto" />
                    <p className="mt-4 text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-8 flex flex-col items-center">
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.author} 
                        className="w-16 h-16 rounded-full object-cover" 
                      />
                      <p className="mt-4 text-lg font-semibold text-black dark:text-white">{testimonial.author}</p>
                      <p className="text-slate-500 dark:text-slate-400">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
           {/* Navigation Buttons */}
           <button 
             onClick={prevTestimonial}
             className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white rounded-full p-2 transition-all z-10"
             aria-label="Previous testimonial"
           >
             <ChevronDownIcon className="w-6 h-6 rotate-90" />
           </button>
           <button 
             onClick={nextTestimonial}
             className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white rounded-full p-2 transition-all z-10"
             aria-label="Next testimonial"
           >
             <ChevronDownIcon className="w-6 h-6 -rotate-90" />
           </button>

           {/* Dots Indicator */}
           <div className="flex justify-center gap-2 mt-6">
                {testimonialsData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                            ${currentIndex === index ? 'bg-black dark:bg-white w-6' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'}
                        `}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;