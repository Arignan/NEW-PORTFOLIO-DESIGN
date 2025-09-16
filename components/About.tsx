import React, { useState, useEffect, useRef } from 'react';
import { RobotIcon } from './icons/animated/RobotIcon';
import { BrainIcon } from './icons/animated/BrainIcon';
import { InnovationIcon } from './icons/animated/InnovationIcon';

const About: React.FC = () => {
  const [imageTranslateY, setImageTranslateY] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        
        // Center of the viewport
        const screenCenter = window.innerHeight / 2;
        // Center of the element
        const elementCenter = rect.top + rect.height / 2;
        
        // Calculate the difference from the center, this gives a value that is 0 when the element is centered
        const delta = screenCenter - elementCenter;

        // Apply a gentle parallax effect. The divisor controls the "slowness".
        // A larger divisor means a more subtle effect.
        const translateY = delta / 15; 
        
        setImageTranslateY(translateY);
      }
    };

    // Run on initial load as well
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-black section-fade-in">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col items-center gap-12">
          {/* This ref is on the container to get its position */}
          <div ref={imageContainerRef} className="flex-shrink-0">
             {/* The container clips the image, and has the gradient border */}
             <div className="relative w-48 h-48 rounded-full p-1 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-600">
                {/* A clipping mask */}
                <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                        src="https://i.ibb.co/6n20s5g/profile.jpg" 
                        alt="Arignan S - Headshot"
                        className="w-full h-full object-cover"
                        style={{ transform: `translateY(${imageTranslateY}px) scale(1.15)` }}
                    />
                </div>
            </div>
          </div>
          <div className="text-lg text-slate-700 dark:text-slate-300 space-y-5 text-center">
             <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-8 tracking-tight">
              A Passion for Intelligent Machines
            </h2>
            <p className="max-w-3xl mx-auto leading-relaxed">
              I'm a passionate Mechatronics Engineer with a knack for building cool robots and intelligent systems. My journey into the world of robotics began in my school days, driven by a fascination for how machines can perceive, learn, and interact with the physical world.
            </p>
            <p className="max-w-3xl mx-auto leading-relaxed">
              I thrive on challenges that push the boundaries of what's possible, from designing intricate hardware to developing sophisticated AI algorithms. I'm always eager to learn, innovate, and contribute to projects that make a real-world impact.
            </p>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center stagger-children">
            <div className="flex flex-col items-center">
                <RobotIcon className="w-16 h-16 text-black dark:text-white mb-4" />
                <h3 className="text-xl font-semibold text-black dark:text-white">Robotics</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Designing and building physical systems that move and operate in the real world.</p>
            </div>
            <div className="flex flex-col items-center">
                <BrainIcon className="w-16 h-16 text-black dark:text-white mb-4" />
                <h3 className="text-xl font-semibold text-black dark:text-white">Artificial Intelligence</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Developing algorithms that enable machines to learn from data and make intelligent decisions.</p>
            </div>
            <div className="flex flex-col items-center">
                <InnovationIcon className="w-16 h-16 text-black dark:text-white mb-4" />
                <h3 className="text-xl font-semibold text-black dark:text-white">Innovation</h3>
                 <p className="text-slate-600 dark:text-slate-400 mt-2">Combining hardware and software in novel ways to solve complex, real-world problems.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;