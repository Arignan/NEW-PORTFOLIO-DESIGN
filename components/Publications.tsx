import React from 'react';
import type { Publication } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

const publicationsData: Publication[] = [
  {
    title: 'Sim-to-Real Transfer for Robotic Grasping using Deep Reinforcement Learning',
    authors: ['Arignan S', 'Jane Doe', 'John Smith'],
    venue: 'Conference on Robot Learning (CoRL)',
    year: 2024,
    url: '#',
  },
  {
    title: 'Real-time 3D Mapping with Multi-Sensor Fusion on an Autonomous Rover',
    authors: ['Arignan S', 'Peter Jones'],
    venue: 'IEEE International Conference on Robotics and Automation (ICRA)',
    year: 2023,
    url: '#',
  },
];

const publicationsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": publicationsData.map((pub, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "ScholarlyArticle",
            "headline": pub.title,
            "author": pub.authors.map(authorName => ({
                "@type": "Person",
                "name": authorName
            })),
            "datePublished": pub.year.toString(),
            "publisher": {
                "@type": "Organization",
                "name": pub.venue
            },
            "url": pub.url
        }
    }))
};

const Publications: React.FC = () => {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(publicationsSchema)}
      </script>
      <section id="publications" className="py-24 md:py-32 bg-white dark:bg-black section-fade-in">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-16 tracking-tight">
            Publications & Research
          </h2>
          <div className="max-w-4xl mx-auto space-y-8 stagger-children">
            {publicationsData.map((pub, index) => (
              <div key={index} className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1">
                <h3 className="text-xl font-bold text-black dark:text-white">{pub.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  {pub.authors.join(', ')}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">{pub.venue}, {pub.year}</p>
                  <a 
                    href={pub.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-2 sm:mt-0 flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors font-medium"
                  >
                    <span>View Publication</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Publications;