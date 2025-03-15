"use client";

import React from 'react';
import { Text } from './ui/Typography';
import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';

// Load TT Hoves Pro Medium font
const ttHovesPro = localFont({
  src: '../app/fonts/TT Hoves Pro Trial Medium.ttf',
  variable: '--font-tt-hoves-pro-trial',
  display: 'swap',
});

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  return (
    <>
      {/* Overlay that appears behind the sidebar */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* The sidebar drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-3/5 bg-[#fff4d5] transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        tabIndex={isOpen ? 0 : -1}
        onKeyDown={handleKeyDown}
      >
        {/* 
          Use percentage padding that compensates for the sidebar's width 
          5% of viewport width ÷ 60% of viewport width = 8.33% of sidebar width
        */}
        <div className="h-full flex flex-col px-[5%] md:px-[8.33%]">
          {/* Header layout with close button in same position as hamburger */}
          <div className="flex items-start justify-between relative pt-5 md:pt-6">
            {/* Logo on the left */}
            <div>
              <Image
                src="/images/logo.png"
                alt="Alexandria Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>

            {/* 
              Close button positioned to match hamburger position exactly
              On mobile (full width): right-0 is correct with px-[5%] padding 
              On md+ (60% width): position at 0 since padding is already adjusted to 8.33%
            */}
            <div className="absolute right-0 top-0 pt-6">
              <button
                className="p-2 rounded-full bg-black text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20"
                onClick={onClose}
                aria-label="Close menu"
                tabIndex={0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Placeholder Image - with increased padding */}
          <div className="pt-12 pb-10 w-full">
            <div className="bg-gray-200 w-full h-[180px] relative">
              <Image
                src="/images/image1.jpg"
                alt="Placeholder image"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Navigation links - with increased top padding */}
          <nav className="pt-16 pb-8 w-full">
            <ul className="space-y-4 text-left">
              <li>
                <Link 
                  href="/manifesto" 
                  className={`text-6xl hover:underline focus:outline-none focus:underline ${ttHovesPro.variable} font-tt-hoves`}
                  onClick={onClose}
                  tabIndex={0}
                >
                  Manifesto
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`text-6xl hover:underline focus:outline-none focus:underline ${ttHovesPro.variable} font-tt-hoves`}
                  onClick={onClose}
                  tabIndex={0}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Footer information - adjusted width to provide consistent spacing */}
          <div className="mt-auto pt-8 pb-16 space-y-4 w-full">
            <div className="flex justify-between items-center">
              <span className={`text-base ${ttHovesPro.variable} font-tt-hoves`}>Contact</span>
              <Link 
                href="mailto:contact@alexandria.com"
                className={`text-base hover:underline ${ttHovesPro.variable} font-tt-hoves`}
                tabIndex={0}
              >
                contact@alexandria.com
              </Link>
            </div>
            
            <div className="flex justify-between items-center">
              <span className={`text-base ${ttHovesPro.variable} font-tt-hoves`}>Follow Us</span>
              <Link 
                href="https://twitter.com" 
                className={`text-base hover:underline ${ttHovesPro.variable} font-tt-hoves`}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
              >
                Twitter <span aria-hidden="true">↗</span>
              </Link>
            </div>
            
            <div className="mt-8 text-right">
              <p className={`text-base ${ttHovesPro.variable} font-tt-hoves`}>9:04pm EST</p>
              <p className={`text-base mt-1 ${ttHovesPro.variable} font-tt-hoves`}>Founded in Alexandria, revived in Toronto.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 