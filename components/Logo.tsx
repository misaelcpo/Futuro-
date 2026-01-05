
import React from 'react';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", animate = true }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${className} ${animate ? 'animate-pulse-soft' : ''} transition-transform duration-500 hover:scale-110 cursor-pointer`}
    >
      <defs>
        <linearGradient id="btc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7931A" />
          <stop offset="100%" stopColor="#FFAB40" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Hexagon (The ASIC Chip Boundary) */}
      <path 
        d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 L50 5Z" 
        stroke="url(#btc-grad)" 
        strokeWidth="2"
        fill="rgba(247, 147, 26, 0.05)"
      />

      {/* Circuit Lines */}
      <path d="M11 27.5 L35 42M89 27.5 L65 42M50 95 V70" stroke="#F7931A" strokeWidth="1" strokeOpacity="0.3" />

      {/* The Central Bitcoin Symbol */}
      <circle cx="50" cy="50" r="28" fill="url(#btc-grad)" />
      <path 
        d="M56.5 45.2C57.3 40.2 54 37.6 49.2 35.8L51.3 27.5H46.3L44.3 35.5C43 35.2 41.6 34.8 40.3 34.5L42.3 26.5H37.3L35.2 34.8C34.1 34.5 33 34.3 32 34L32 34.1L25.1 32.4L23.7 38L29.2 39.4C32.2 40.1 32.7 41 32.2 43.1L26.9 64.3C26.4 66.2 25.3 67.2 23.3 66.7L17.8 65.3L16.4 70.9L23.3 72.6C24.6 72.9 25.9 73.2 27.2 73.5L25.1 81.8H30.1L32.2 73.5C33.5 73.8 34.8 74.2 36.1 74.5L34 82.8H39L41.1 74.5C47.9 75.8 53 74.4 54.8 68.6C56.2 63.9 54.7 61.2 51.3 59.5C53.8 58.2 55.6 56.4 56.5 52.8L56.5 52.8ZM45.1 66.2C43.8 71.3 35.3 69.1 32.1 68.3L34.4 59.1C37.6 59.9 46.5 60.9 45.1 66.2ZM46.9 49.3C45.8 53.9 38.7 51.9 36 51.2L38 43.1C40.7 43.8 48 44.8 46.9 49.3Z" 
        fill="white"
      />
      
      {/* Node Points */}
      <circle cx="50" cy="5" r="3" fill="#F7931A" />
      <circle cx="11" cy="72.5" r="3" fill="#F7931A" />
      <circle cx="89" cy="72.5" r="3" fill="#F7931A" />
    </svg>
  );
};
