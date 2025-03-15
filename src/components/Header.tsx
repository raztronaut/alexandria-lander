"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Heading } from './ui/Typography';
import { Sidebar } from './Sidebar';

interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Header = ({ className, style }: HeaderProps = {}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header 
        className={className || "w-full pt-5 md:pt-6 fixed top-0 left-0 bg-white/80 backdrop-blur-sm"}
        style={style || { zIndex: 'var(--z-header)' }}
      >
        <div className="container">
          {/* Header content */}
          <div className="flex items-start justify-between relative">
            {/* Alexandria text logo */}
            <div className="flex flex-col md:flex-row items-start md:items-end">
              <Heading 
                as="h1" 
                variant="title" 
                size="xl" 
                className="-my-1 xs:-my-1.5 sm:-my-2 md:-my-2.5 lg:-my-3 text-[3.5rem] xs:text-[4.5rem] sm:text-[5.5rem] md:text-alexandria-medium lg:text-alexandria-large font-serif leading-none tracking-tighter"
              >
                Alexandria
              </Heading>
              
              {/* Right side content - below on small screens, to the right on md+ */}
              <div className="flex mt-1 md:mt-0 md:ml-10 lg:ml-12">
                {/* Logo and divider container for small screens - hidden on md+ */}
                <div className="flex items-center md:hidden">
                  {/* Logo on small screens */}
                  <div className="relative w-14 h-14 flex items-center">
                    <Image
                      src="/images/logo.png"
                      alt="Alexandria Logo"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Vertical divider line */}
                  <div className="h-14 border-l border-black mx-4"></div>
                </div>

                {/* Text content */}
                <div 
                  className="flex items-center md:border-l md:border-black md:pl-6 md:h-auto md:self-stretch md:flex md:items-center lg:h-[100px] lg:items-end lg:pb-4"
                >
                  <div className="md:self-center lg:self-end">
                    <p className="text-alexandria-foreground text-[15px] font-tt-hoves mb-[1px]" style={{ fontWeight: 400 }}>
                      Exploration is infinite.
                    </p>
                    <a 
                      href="/library" 
                      className="block text-[15px] font-tt-hoves hover:underline underline-offset-4"
                      style={{ fontWeight: 700 }}
                      tabIndex={0}
                      aria-label="Enter the Library"
                    >
                      Enter the Library<span className="ml-1">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hamburger menu button - positioned to the right */}
            <div className="absolute right-0 top-0 md:relative md:self-start md:pt-7">
              <button
                className="p-2 rounded-full bg-black text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20"
                onClick={handleToggleSidebar}
                aria-label="Open menu"
                tabIndex={0}
                aria-expanded={isSidebarOpen}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
    </>
  );
}; 