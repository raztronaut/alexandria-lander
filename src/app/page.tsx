"use client";

import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section, Row, Column } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Link } from "@/components/ui/Link";
import { useEffect, useState, useRef } from "react";

// Simple divider component that uses consistent container
const Divider = () => (
  <div className="container">
    <hr className="border-t border-alexandria-border" />
  </div>
);

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const heroImageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Apply body lock when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);
  
  // Calculate parallax effect for hero image
  const imageTranslate = Math.min(scrollY * 0.3, 100); // Adjusted for smoother effect

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Transparent space for header visibility */}
      <div className="h-[120px] md:h-[150px] lg:h-[180px] w-full bg-transparent"></div>
      
      {/* Content wrapper that will slide over the header */}
      <div 
        className="relative bg-white"
        style={{ zIndex: 'var(--z-content)' }}
      >
        {/* Hero Section - without top padding now */}
        <Section 
          variant="hero" 
          className="relative pt-0" 
          container={true}
        >
          <div 
            ref={heroImageRef}
            className="w-full h-[40vh] md:h-[45vh] relative overflow-hidden rounded-lg"
          >
            {/* Ancient Philosophy hero image with parallax effect */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `translateY(${imageTranslate}px)`,
                height: `calc(100% + ${imageTranslate}px)`,
                top: `-${imageTranslate}px`
              }}
            >
              <Image
                src="/images/Ancient Philosophy May 2023.jpg"
                alt="Ancient Philosophy scene showing philosophers in discussion"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
        </Section>

        {/* Main Content - with white background to cover header */}
        <main className="bg-white">
          {/* First content section */}
          <Section container={true}>
            <Row>
              <Column width="1/5">
                <div className="relative w-full h-full flex items-center">
                  <Image
                    src="/images/logo.png"
                    alt="Alexandria Logo"
                    width={150}
                    height={150}
                    className="object-contain max-w-full"
                  />
                </div>
              </Column>
              <Column width="4/5" divider>
                <Text size="lg" className="font-tt-hoves text-xl leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </Text>
                <div className="mt-6">
                  <Link 
                    href="/manifesto" 
                    size="lg"
                    className="font-pp-editorial-new text-lg"
                    aria-label="Read the entire manifesto"
                  >
                    Welcome back to Alexandria. Read the entire manifesto
                  </Link>
                </div>
              </Column>
            </Row>
          </Section>

          {/* Horizontal line divider that matches container width */}
          <Divider />

          {/* Second content section - with increased top padding and reversed layout */}
          <Section className="pt-16" container={true}>
            <Row reverse spacing="large">
              <Column width="3/5" divider>
                <div className="grid grid-cols-2 gap-4 max-w-md ml-auto">
                  <div className="aspect-square bg-gray-300 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-400 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Column>
              <Column width="2/5">
                <Text size="lg" className="font-tt-hoves text-xl leading-relaxed max-w-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Horizontal line divider that matches container width */}
          <Divider />

          {/* Full width image section */}
          <Section variant="spacious" container={true}>
            <div className="w-full h-96 relative overflow-hidden rounded-lg">
              {/* Ancient Philosophy image for bottom section */}
              <Image
                src="/images/Ancient Philosophy May 2023.jpg"
                alt="Ancient Philosophy scene showing philosophers in discussion"
                fill
                className="object-cover object-top"
              />
            </div>
          </Section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
