import React from 'react';
import Tooltip from './Tooltip';
import { GitHubIcon } from './icons/GitHubIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { EmailIcon } from './icons/EmailIcon';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-100 dark:bg-slate-900 section-fade-in">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">Get In Touch</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
          I'm currently seeking research and engineering roles. If you believe my skills and passion align with your team's goals, I'd love to connect.
        </p>
        
        <div className="flex justify-center items-center gap-6 mb-10 stagger-children">
            <Tooltip text="Send an Email">
                <a href="mailto:arignang@gmail.com" className="bg-slate-200 dark:bg-slate-800 border border-transparent rounded-full p-4 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300">
                    <EmailIcon className="w-7 h-7" />
                    <span className="sr-only">Email</span>
                </a>
            </Tooltip>
            <Tooltip text="View LinkedIn Profile">
                <a href="https://linkedin.com/in/arignang" target="_blank" rel="noopener noreferrer" className="bg-slate-200 dark:bg-slate-800 border border-transparent rounded-full p-4 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300">
                    <LinkedInIcon className="w-7 h-7" />
                    <span className="sr-only">LinkedIn</span>
                </a>
            </Tooltip>
            <Tooltip text="View GitHub Profile">
                <a href="https://github.com/ArignanG" target="_blank" rel="noopener noreferrer" className="bg-slate-200 dark:bg-slate-800 border border-transparent rounded-full p-4 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300">
                    <GitHubIcon className="w-7 h-7" />
                    <span className="sr-only">GitHub</span>
                </a>
            </Tooltip>
        </div>

        <a href="mailto:arignang@gmail.com" className="text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors duration-300">
          arignang@gmail.com
        </a>
      </div>
    </section>
  );
};

export default Contact;