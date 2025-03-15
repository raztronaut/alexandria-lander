import React from 'react';

interface CloseIconProps {
  className?: string;
  fontVariable?: string;
}

export const CloseIcon = ({ className, fontVariable }: CloseIconProps) => {
  return (
    <span 
      className={`text-xs font-medium tracking-wide font-tt-hoves ${fontVariable || ''} ${className || ''}`}
      style={{ fontWeight: 500 }}
    >
      close
    </span>
  );
}; 