import React, { useState } from 'react';
import type { Education } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const educationData: Education[] = [
  {
    degree: 'B.Sc. in Engineering',
    institution: 'Rhine-Waal University of Applied Sciences, Kleve, Germany',
    period: '2025 - 2028',
    details: [
      'Specializations: Electrical Engineering, Electronics, Computer Science, and Robotics.'
    ]
  },
  {
    degree: 'Professional Certificates',
    institution: 'Coursera & University of Moratuwa, Online',
    period: '2024 - Current',
    details: [
      'Full-Stack Web Development: Completed comprehensive coursework covering the MERN stack.',
      'AI & Data Science: Developed projects on local environments and IBM Cloud platforms.'
    ]
  },
  {
    degree: 'G.C.E Advanced Level',
    institution: 'Kilinochchi Maha Vidyalayam, Sri Lanka',
    period: '2018 - 2020',
    details: [
      'Subject Stream: Combined Mathematics, Physics, and Chemistry.',
      'Additional Subjects: Information & Communication Technology (ICT), English.'
    ]
  },
  {
    degree: 'G.C.E Ordinary Level',
    institution: 'Kilinochchi Vivekanantha Vidyalayam, Sri Lanka',
    period: '2011 - 2017',
    details: [
        'Key Subjects: Mathematics, Science, ICT, English, Commerce.'
    ]
  }
];

interface EducationItemProps {
  education: Education;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const EducationItem: React.FC<EducationItemProps> = ({ education, isOpen, onClick, index }) => {
    const buttonId = `edu-btn-${index}`;
    const panelId = `edu-desc-${index}`;

    return (
    <div className="relative pl-12 pb-8 border-l-2 border-slate-200 dark:border-slate-800 last:border-l-transparent">
        <div 
            className={`absolute -left-[9.5px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-black border-[3px] transition-all duration-300 
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
            className="w-full text-left p-2 -m-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-black dark:focus-visible:ring-white"
            aria-expanded={isOpen}
            aria-controls={panelId}
        >
            <div className="flex justify-between items-center gap-4">
                <div className="flex-grow">
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">{education.period}</p>
                    <h3 className="text-xl font-semibold text-black dark:text-white">{education.degree}</h3>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{education.institution}</p>
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
                <ul className={`list-disc list-inside text-slate-600 dark:text-slate-400 mt-4 space-y-1 leading-relaxed pl-2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 -translate-y-2'}`}>
                    {education.details.map((detail, index) => <li key={index}>{detail}</li>)}
                </ul>
            </div>
        </div>
    </div>
    );
};

const Education: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    setOpenIndices(currentIndices => 
      currentIndices.includes(index)
        ? currentIndices.filter(i => i !== index)
        : [...currentIndices, index]
    );
  };

  return (
    <section id="education" className="py-24 md:py-32 bg-white dark:bg-black section-fade-in">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-16 tracking-tight">
          Education
        </h2>
        <div className="max-w-3xl mx-auto flex flex-col stagger-children">
          {educationData.map((edu, index) => (
            <EducationItem
              key={edu.degree}
              education={edu}
              isOpen={openIndices.includes(index)}
              onClick={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;