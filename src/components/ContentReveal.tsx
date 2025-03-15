"use client";

import { ReactNode } from 'react';

interface ContentRevealProps {
  children: ReactNode;
  isRevealed: boolean;
  delay?: number;
  className?: string;
}

export const ContentReveal = ({
  children,
  isRevealed,
  delay = 0,
  className = '',
}: ContentRevealProps) => {
  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        isRevealed ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: 'opacity' 
      }}
      aria-hidden={!isRevealed}
    >
      {children}
    </div>
  );
};

export const HeroReveal = ({
  children,
  isRevealed,
  className = '',
}: Omit<ContentRevealProps, 'delay'>) => {
  return (
    <div
      className={`transition-all duration-1500 ease-out ${
        isRevealed
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.98]'
      } ${className}`}
      style={{ willChange: 'transform, opacity' }}
      aria-hidden={!isRevealed}
    >
      {children}
    </div>
  );
}; 