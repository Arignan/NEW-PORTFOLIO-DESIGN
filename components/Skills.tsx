import React from 'react';
import type { SkillCategory } from '../types';

const technicalSkillsData: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'JavaScript (ES6+)', 'C++', 'SQL', 'MATLAB']
  },
  {
    title: 'Data Science & ML/DL',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Pandas', 'NumPy']
  },
  {
    title: 'Data Visualization & BI',
    skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Power BI']
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB']
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Git & GitHub']
  },
  {
    title: 'Robotics & Computer Vision',
    skills: ['ROS', 'OpenCV', 'MATLAB/Simulink']
  },
  {
    title: 'Hardware & CAD',
    skills: ['Arduino', 'Raspberry Pi', 'Jetson', 'PLC', 'SolidWorks']
  },
  {
    title: 'Development Tools',
    skills: ['VS Code', 'Jupyter Notebook', 'Linux', 'Excel', 'Google Sheets']
  }
];

const softSkillsData: string[] = [
    'Problem Solving',
    'Team Collaboration',
    'Communication',
    'Critical Thinking',
    'Adaptability',
    'Mentorship',
    'Project Management'
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-slate-100 dark:bg-slate-900 section-fade-in">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-16 tracking-tight">
          Skills
        </h2>
        
        <div className="stagger-children">
            <h3 className="text-3xl font-bold text-center text-black dark:text-white mb-12 tracking-tight">
            Technical Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technicalSkillsData.map((category) => (
                <div key={category.title} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2 stagger-tags-in">
                    {category.skills.map(skill => (
                    <span key={skill} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 text-sm font-medium rounded-full">
                        {skill}
                    </span>
                    ))}
                </div>
                </div>
            ))}
            </div>

            <h3 className="text-3xl font-bold text-center text-black dark:text-white mt-20 mb-12 tracking-tight">
            Soft Skills
            </h3>
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40">
                <div className="flex flex-wrap justify-center gap-3 stagger-tags-in">
                    {softSkillsData.map(skill => (
                    <span key={skill} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 text-base font-medium rounded-full">
                        {skill}
                    </span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;