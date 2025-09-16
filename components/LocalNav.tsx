import React, { useCallback, useState, useRef, useEffect } from 'react';

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#skills', label: 'Skills' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

interface LocalNavProps {
  isVisible: boolean;
  activeSection: string;
}

const LocalNav: React.FC<LocalNavProps> = ({ isVisible, activeSection }) => {
    
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        history.pushState(null, '', href);
    }
  }, []);

  const navLinksContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
      left?: number;
      width?: number;
      opacity?: number;
  }>({ opacity: 0 });

  useEffect(() => {
    // Hide indicator immediately if nav is not visible
    if (!isVisible) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }

    const container = navLinksContainerRef.current;
    if (!container) return;
    
    // Find the currently active link element within the container
    const activeLinkEl = container.querySelector<HTMLAnchorElement>(
        `a[href="#${activeSection}"]`
    );
    
    if (activeLinkEl) {
      // Calculate position and size for the indicator
      setIndicatorStyle({
          left: activeLinkEl.offsetLeft,
          width: activeLinkEl.offsetWidth,
          opacity: 1,
      });
    } else {
      // If no active section (e.g., scrolling past 'contact'), hide the indicator
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, isVisible]);


  return (
    <nav 
        id="local-nav"
        aria-label="Section navigation"
        // Refined animation classes for appearance/disappearance
        className={`fixed top-4 left-0 right-0 z-40 transition-all duration-300 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
    >
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto h-14 flex justify-between items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-full px-6 shadow-lg shadow-black/5">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                    Arignan S
                </h2>
                {/* Container for nav links and the moving indicator */}
                <div ref={navLinksContainerRef} className="hidden md:flex items-center relative space-x-1">
                    {/* The active link indicator pill */}
                    <div
                        className="absolute bg-slate-200/70 dark:bg-slate-800/80 h-8 rounded-full transition-all duration-300 ease-out -z-10"
                        style={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                            opacity: indicatorStyle.opacity,
                        }}
                        aria-hidden="true"
                    />
                    {navLinks.map((link) => (
                        <a 
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            // Added padding for better hit area and visual balance with the pill
                            className={`relative text-sm font-medium transition-colors duration-200 px-3 py-1 rounded-full
                            ${activeSection === link.href.substring(1) 
                                ? 'text-black dark:text-white' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
                            }`}
                            aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <a 
                    href="/arignan-g-cv.pdf" 
                    download 
                    className="bg-slate-800 dark:bg-slate-200 text-white dark:text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-black dark:hover:bg-white transition-colors duration-300"
                >
                    Download CV
                </a>
            </div>
        </div>
    </nav>
  );
};

export default LocalNav;