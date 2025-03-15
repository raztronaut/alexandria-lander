"use client";

import { useState } from 'react';
import { Heading } from './ui/Typography';
import { Sidebar } from './Sidebar';

export const Header = () => {
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
        className="w-full pt-5 md:pt-6 fixed top-0 left-0 bg-transparent"
        style={{ zIndex: 'var(--z-header)' }}
      >
        <div className="container">
          {/* Header content */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between relative">
            <div className="flex flex-col md:flex-row items-start md:items-end">
              {/* Alexandria Logo - Left side */}
              <Heading 
                as="h1" 
                variant="title" 
                size="xl" 
                className="text-[4.5rem] sm:text-[5.5rem] md:text-alexandria-medium lg:text-alexandria-large font-serif leading-none tracking-tighter"
              >
                Alexandria
              </Heading>
              
              {/* Right side content - below on small screens, to the right on md+ */}
              <div className="mt-1 md:mt-0 md:ml-10 lg:ml-12" style={{ marginBottom: '12px' }}>
                {/* Using exact 72px height as shown in the screenshot */}
                <div 
                  className="md:border-l md:border-black md:pl-6 flex items-end"
                  style={{ 
                    height: '90px',
                    marginTop: '-5px' // Fine-tune vertical position
                  }}
                >
                  <div>
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

            {/* Hamburger menu button */}
            <div className="md:self-start pt-7">
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