import React, { useEffect, useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import ResearchIdeaGenerator from './components/ResearchIdeaGenerator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LocalNav from './components/LocalNav'; // New component for sticky nav
import Tooltip from './components/Tooltip';
import type { Project } from './types';
import { GitHubIcon } from './components/icons/GitHubIcon';
import { ExternalLinkIcon } from './components/icons/ExternalLinkIcon';
import { XIcon } from './components/icons/XIcon';
import { ImageIcon } from './components/icons/ImageIcon';
import ScrollToTopButton from './components/ScrollToTopButton';
import ProjectDetailPage from './components/ProjectDetailPage';

type Theme = 'light' | 'dark';

/**
 * Determines the initial theme based on stored preference or system settings.
 * The logic is mirrored in the inline script in index.html to prevent FOUC.
 */
const getInitialTheme = (): Theme => {
  // We can't access localStorage on the server, so default to 'light'.
  if (typeof window === 'undefined' || !window.localStorage) {
    return 'light';
  }
  try {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    // If no theme is stored, check the user's system preference.
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch (e) {
    // In case of any error (e.g., localStorage is disabled), default to 'light'.
    console.warn('Could not access localStorage to get theme. Defaulting to light mode.');
    return 'light';
  }
};


const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    // Lock body scroll to prevent background scrolling and content shift
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div
        className="bg-white dark:bg-slate-800 w-full h-full md:rounded-2xl max-w-6xl md:max-h-[95vh] overflow-y-auto relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
            {project.videoUrl ? (
                <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden bg-black">
                    <iframe
                        width="100%"
                        height="100%"
                        src={project.videoUrl}
                        title={`YouTube video player for ${project.title}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                 <div className="w-full h-auto max-h-96 object-cover rounded-lg mb-6 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    {project.imageUrl ? (
                        <img src={project.imageUrl} alt={`Screenshot of the ${project.title} project`} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <ImageIcon className="w-24 h-24 text-slate-400 dark:text-slate-500" />
                    )}
                </div>
            )}

            <h2 id="project-title" className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
             <p className="text-slate-600 dark:text-slate-400 my-4 leading-relaxed">{project.detailedDescription}</p>

            {project.challenges && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Technical Challenges</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.challenges}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                <Tooltip text="View on GitHub">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors font-medium bg-slate-200/60 dark:bg-slate-700 px-4 py-2 rounded-full" aria-label={`View repository for ${project.title} on GitHub`}>
                        <GitHubIcon className="w-5 h-5" />
                        <span>View Repository</span>
                    </a>
                </Tooltip>
              {project.liveUrl && (
                 <Tooltip text="View Live Demo">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors font-medium bg-slate-200/60 dark:bg-slate-700 px-4 py-2 rounded-full" aria-label={`View live demo for ${project.title}`}>
                        <ExternalLinkIcon className="w-5 h-5" />
                        <span>Live Demo</span>
                    </a>
                </Tooltip>
              )}
            </div>
        </div>
        <div className="sticky sm:absolute bottom-4 right-4 sm:top-3 sm:right-3 sm:bottom-auto flex justify-end p-2 sm:p-0 bg-gradient-to-t from-white dark:from-slate-800 sm:bg-none sm:dark:bg-none">
             <Tooltip text="Close (Esc)">
                <button
                    onClick={onClose}
                    className="text-slate-500 hover:text-black dark:hover:text-white bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-full p-1.5 transition-colors z-10"
                    aria-label="Close project details"
                >
                    <XIcon className="w-5 h-5" />
                </button>
            </Tooltip>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // For Modal
  const [detailedProject, setDetailedProject] = useState<Project | null>(null); // For Detail Page
  const [isDetailPageClosing, setIsDetailPageClosing] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // This effect syncs the theme state with the DOM and localStorage.
  useEffect(() => {
    const root = window.document.documentElement;

    // Apply the theme class to the <html> element for Tailwind CSS dark mode.
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist the theme choice in localStorage.
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Could not save theme preference to localStorage.');
    }
  }, [theme]);
  
  // Memoize the toggle function to prevent unnecessary re-renders of the Header.
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);
  
  const handleCloseDetailPage = () => {
    setIsDetailPageClosing(true); // Triggers the slide-out animation
  };

  const handleDetailPageUnmount = () => {
    setDetailedProject(null); // Unmounts the component
    setIsDetailPageClosing(false); // Resets state for the next time
  };


  // Fade-in effect for sections as they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll('.section-fade-in');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Scroll spy for LocalNav visibility and active link highlighting
  useEffect(() => {
      const sectionIds = ['home', 'about', 'experience', 'education', 'skills', 'certifications', 'projects', 'contact'];
      const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return;

      const observer = new IntersectionObserver(
          (entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      setActiveSection(entry.target.id);
                  }
              });
          },
          {
              // This creates a detection zone that starts at 10% from the top of the viewport
              // and is 10% high (100% - 10% top - 80% bottom = 10% height).
              // This area is positioned near the top of the screen (just below the sticky nav)
              // to provide a more accurate and responsive feel for which section is "active".
              // The 10% height provides stability against being missed during fast scrolls.
              rootMargin: `-10% 0px -80% 0px`,
              threshold: 0,
          }
      );

      sections.forEach(section => observer.observe(section));
      return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Show LocalNav for all sections except 'home'
  const isLocalNavVisible = activeSection !== 'home';
  const isDetailPageVisible = !!detailedProject;

  return (
    <div>
      <Header toggleTheme={toggleTheme} theme={theme} isHidden={isLocalNavVisible || isDetailPageVisible} />
      <LocalNav isVisible={isLocalNavVisible && !isDetailPageVisible} activeSection={activeSection} />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <Projects onProjectSelect={setSelectedProject} onShowDetailPage={setDetailedProject} />
        <ResearchIdeaGenerator />
        <Contact />
      </main>
      <Footer />
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {detailedProject && <ProjectDetailPage project={detailedProject} onClose={handleCloseDetailPage} onCloseAnimationComplete={handleDetailPageUnmount} isClosing={isDetailPageClosing} />}
      <ScrollToTopButton />
    </div>
  );
};

export default App;