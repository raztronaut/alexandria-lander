"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Heading } from './ui/Typography';
import { Sidebar } from './Sidebar';
import { IconButton } from './ui/IconButton';
import { MenuIcon } from './ui/icons/MenuIcon';

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
        <div className="container mx-auto max-w-[2560px]">
          {/* Header content */}
          <div className="flex items-start justify-between relative">
            {/* Header content wrapper - using flex with justify-between for dynamic spacing */}
            <div className="flex flex-col md:flex-row items-start md:items-end md:w-full md:justify-between md:pr-12">
              {/* Alexandria text logo */}
              <Heading 
                as="h1" 
                variant="title" 
                size="xl" 
                className="-my-1 xs:-my-1.5 sm:-my-2 md:-my-2.5 lg:-my-3 text-[3.5rem] xs:text-[4.5rem] sm:text-[5.5rem] md:text-alexandria-medium lg:text-alexandria-large font-serif leading-none tracking-tighter"
              >
                Alexandria
              </Heading>
              
              {/* Right side content - below on small screens, auto-spaced on md+ */}
              <div className="flex mt-1 md:mt-0 md:ml-8 lg:ml-21 xl:ml-32">
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
                  <div className="h-14 border-l border-black mx-[1em]"></div>
                </div>

                {/* Text content */}
                <div 
                  className="flex items-center md:border-l md:border-black md:pl-[4%] md:h-auto md:self-stretch md:flex md:items-center lg:h-[100px] lg:items-end lg:pb-4 lg:pl-[5%] md:min-w-[200px] lg:min-w-[300px] xl:min-w-[350px]"
                >
                  <div className="md:self-center lg:self-end w-full">
                    <p className="text-alexandria-foreground text-[15px] font-tt-hoves mb-[1px] whitespace-nowrap" style={{ fontWeight: 400 }}>
                      Exploration is infinite.
                    </p>
                    <a 
                      href="/library" 
                      className="block text-[15px] font-tt-hoves hover:underline underline-offset-4 whitespace-nowrap"
                      style={{ fontWeight: 700 }}
                      tabIndex={0}
                      aria-label="Enter the Library"
                    >
                      Enter the Library<span className="ml-[0.25em]">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hamburger menu button - always positioned at the top right */}
            <div className="absolute right-0">
              <IconButton
                onClick={handleToggleSidebar}
                aria-label="Open menu"
                tabIndex={0}
                aria-expanded={isSidebarOpen}
                icon={<MenuIcon />}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
    </>
  );
}; 