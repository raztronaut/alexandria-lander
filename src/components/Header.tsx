"use client";

import { Heading } from './ui/Typography';

export const Header = () => {
  return (
    <header 
      className="w-full pt-5 md:pt-6 fixed top-0 left-0 z-[5] bg-transparent"
    >
      <div className="container">
        {/* Header content */}
        <div className="flex flex-col md:flex-row items-start md:items-end">
          {/* Alexandria Logo - Left side */}
          <Heading 
            as="h1" 
            variant="title" 
            size="xl" 
            className="text-[4.5rem] sm:text-[5.5rem] md:text-alexandria-medium lg:text-alexandria-large font-serif leading-none"
          >
            Alexandria
          </Heading>
          
          {/* Right side content - below on small screens, to the right on md+ */}
          <div className="mt-1 md:mt-0 md:ml-20 lg:ml-24" style={{ marginBottom: '12px' }}>
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
      </div>
    </header>
  );
}; 