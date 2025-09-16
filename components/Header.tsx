import React, { useState, useEffect, useCallback } from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import Tooltip from './Tooltip';

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
  isHidden?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme, isHidden = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#skills', label: 'Skills' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#projects', label: 'Projects' },
    { href: '#publications', label: 'Publications' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];
  
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        // The `scroll-padding-top` CSS property on the `<html>` element will handle the offset.
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        history.pushState(null, '', href);
    }
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out 
      ${isScrolled ? 'bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-700/80' : 'bg-transparent'}
      ${isHidden ? '-translate-y-full pointer-events-none' : 'translate-y-0'}
    `}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-xl font-bold text-black dark:text-white hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
          Arignan S
        </a>
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white font-medium transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </nav>
           <div className="ml-6">
            <Tooltip text={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    aria-pressed={theme === 'dark'}
                    className="relative flex items-center justify-center w-9 h-9 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-900"
                >
                    <SunIcon className={`w-5 h-5 transition-all duration-500 ease-in-out transform ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
                    <MoonIcon className={`w-5 h-5 absolute transition-all duration-500 ease-in-out transform ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`} />
                </button>
            </Tooltip>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;