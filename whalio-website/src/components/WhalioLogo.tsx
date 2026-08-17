import React from 'react';

export const WhalioLogo = ({ className = "w-8 h-8", light = false }: { className?: string; light?: boolean }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Whalio Technologies Logo"
    >
      <defs>
        <linearGradient id="whalioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00b4d8" />
          <stop offset="100%" stopColor="#0077b6" />
        </linearGradient>
        <linearGradient id="whalioDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      
      {/* Streamlined minimal whale motif constructed of clean technological arc segments */}
      <path
        d="M 6 24 C 6 12, 18 6, 32 10 C 35 11, 37 13, 34 16 C 30 19, 24 18, 18 20 C 13 22, 10 26, 10 30 C 10 32, 7 32, 6 24 Z"
        fill={light ? "url(#whalioDarkGrad)" : "url(#whalioGrad)"}
      />
      {/* Dynamic workflow data node accent */}
      <circle cx="28" cy="14" r="2.5" fill="#38bdf8" />
      <path
        d="M 16 30 C 22 30, 32 26, 36 22 C 34 27, 28 32, 20 32 C 14 32, 10 31, 16 30 Z"
        fill={light ? "#ffffff" : "#0b132b"}
        opacity="0.85"
      />
      {/* Node connectivity arc */}
      <path
        d="M 28 14 C 22 10, 14 12, 10 16"
        stroke="#00b4d8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
    </svg>
  );
};
