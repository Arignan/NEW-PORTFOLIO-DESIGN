import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 py-20">
      <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
        <h1 className="text-6xl md:text-9xl font-bold text-black dark:text-white tracking-tighter leading-tight pb-4">
          Arignan S
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium tracking-tight">
          Mechatronics Engineer and Research Scientist
        </p>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          Building intelligent systems that perceive, learn, and interact with the physical world. Seeking research opportunities in Robotics, AI, and Computer Vision.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a href="#projects" className="bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300">
            View Projects
          </a>
          <a href="/arignan-g-cv.pdf" download className="border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-8 py-3 rounded-full hover:border-black dark:hover:border-white transition-all duration-300">
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;