import React, { useState } from 'react';
import type { Experience } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const experienceData: Experience[] = [
  {
    role: 'Account Management & IT Support',
    company: 'ULX Wholesale, Coventry, UK',
    period: 'Jan 2025 - Present',
    description: 'Developed and maintained web applications for internal use while also managing key business accounting and financial records.'
  },
  {
    role: 'Junior Machine Learning Engineer (Volunteer)',
    company: 'Omdena, Remote',
    period: 'Feb 2024 - Current',
    description: 'Collaborated with a global team on real-world AI challenges. Key projects include: enhancing Scottish tourism with data insights, predicting Dengue outbreaks in Sri Lanka, forecasting UEFA Euro 2024 outcomes, and developing AI-powered computer vision training for robotics in El Salvador.'
  },
];

interface ExperienceItemProps {
  experience: Experience;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, isOpen, onClick, index }) => {
    const buttonId = `exp-btn-${index}`;
    const panelId = `exp-desc-${index}`;

    return (
    <div className="relative pl-12 pb-8 border-l-2 border-slate-200 dark:border-slate-800 last:border-l-transparent">
        <div 
            className={`absolute -left-[9.5px] top-1.5 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-900 border-[3px] transition-all duration-300
              ${isOpen 
                ? 'border-sky-500 dark:border-sky-400 shadow-lg shadow-sky-500/30' 
                : 'border-slate-300 dark:border-slate-700'
              }`
            }
            aria-hidden="true"
        ></div>

        <button 
            id={buttonId}
            onClick={onClick} 
            className="w-full text-left p-2 -m-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-900 focus-visible:ring-black dark:focus-visible:ring-white"
            aria-expanded={isOpen}
            aria-controls={panelId}
        >
            <div className="flex justify-between items-center gap-4">
                <div className="flex-grow">
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">{experience.period}</p>
                    <h3 className="text-xl font-semibold text-black dark:text-white">{experience.role}</h3>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{experience.company}</p>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`} />
            </div>
        </button>

        <div 
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
            <div className="overflow-hidden">
                <p className={`text-slate-600 dark:text-slate-400 mt-4 leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 -translate-y-2'}`}>
                    {experience.description}
                </p>
            </div>
        </div>
    </div>
    );
};

const Experience: React.FC = () => {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    setExpandedIndices(currentIndices =>
      currentIndices.includes(index)
        ? currentIndices.filter(i => i !== index)
        : [...currentIndices, index]
    );
  };

  return (
    <section id="experience" className="py-24 md:py-32 bg-slate-100 dark:bg-slate-900 section-fade-in">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-16 tracking-tight">
          Experience & Roles
        </h2>
        <div className="max-w-3xl mx-auto flex flex-col stagger-children">
          {experienceData.map((exp, index) => (
            <ExperienceItem 
              key={`${exp.role}-${exp.company}`} 
              experience={exp}
              isOpen={expandedIndices.includes(index)}
              onClick={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;