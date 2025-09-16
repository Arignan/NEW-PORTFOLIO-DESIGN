import React from 'react';

export const RobotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 8V4H8" pathLength="1" className="animate-stroke-draw" style={{ animationDelay: '0.1s' }}/>
    <rect x="4" y="8" width="16" height="12" rx="2" pathLength="1" className="animate-stroke-draw" />
    <path d="M2 14h2" pathLength="1" className="animate-stroke-draw" style={{ animationDelay: '0.2s' }}/>
    <path d="M20 14h2" pathLength="1" className="animate-stroke-draw" style={{ animationDelay: '0.2s' }}/>
    <path d="M15 13v2" pathLength="1" className="animate-stroke-draw" style={{ animationDelay: '0.3s' }}/>
    <path d="M9 13v2" pathLength="1" className="animate-stroke-draw" style={{ animationDelay: '0.3s' }}/>
  </svg>
);
