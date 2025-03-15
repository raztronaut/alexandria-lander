import React from 'react';

interface MenuIconProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}

export const MenuIcon = ({
  width = 16,
  height = 12,
  strokeWidth = 2.5,
  className,
}: MenuIconProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <line x1="3" y1="8" x2="21" y2="8"></line>
      <line x1="3" y1="16" x2="21" y2="16"></line>
    </svg>
  );
}; 