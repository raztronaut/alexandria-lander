"use client";

import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section, Row, Column } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Link } from "@/components/ui/Link";
import { useEffect, useState, useRef } from "react";
import { CustomTextReveal } from "@/components/magicui/custom-text-reveal";
import { CustomTextRevealLink } from "@/components/magicui/custom-text-reveal-link";
import { TextRevealProvider } from "@/components/magicui/text-reveal-context";

// Simple divider component that uses consistent container
const Divider = () => (
  <div className="container mx-auto max-w-[2560px]">
    <hr className="border-t border-alexandria-border" />
  </div>
);

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const heroImageRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Transparent space for header visibility */}
      <div className="h-[170px] xs:h-[180px] sm:h-[190px] md:h-[130px] lg:h-[210px] w-full bg-transparent"></div>
      
      {/* Content wrapper that will slide over the header */}
      <div 
        className="relative bg-transparent"
        style={{ zIndex: 'var(--z-content)' }}
      >
        {/* Hero Section - without top padding now */}
        <Section 
          variant="hero" 
          className="relative pt-0 pb-0" 
          container={true}
          background="transparent"
        >
          <div 
            ref={heroImageRef}
            className="w-full h-[350px] md:h-[450px] lg:h-[600px] relative overflow-hidden rounded-2xl"
          >
            {/* Hero image without parallax */}
            <div className="absolute inset-0 w-full h-full">
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
          <TextRevealProvider>
            {/* First content section */}
            <Section container={true} className="pt-8 md:pt-12 lg:pt-16" background="white">
              <Row>
                <Column width="1/5">
                  <div className="relative w-full h-full flex items-center">
                    {/* Only show logo on medium screens and up */}
                    <div className="hidden md:block">
                      <Image
                        src="/images/logo.png"
                        alt="Alexandria Logo"
                        width={150}
                        height={150}
                        className="object-contain max-w-full"
                      />
                    </div>
                  </div>
                </Column>
                <Column width="4/5" divider>
                  <CustomTextReveal 
                    textClassName="font-tt-hoves text-xl leading-relaxed"
                    order={0}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </CustomTextReveal>
                  <div className="mt-6 relative">
                    <CustomTextRevealLink
                      textClassName="font-pp-editorial-new text-lg"
                      href="/manifesto"
                      aria-label="Read the entire manifesto"
                      order={1}
                    >
                      Welcome back to Alexandria. Read the entire manifesto
                    </CustomTextRevealLink>
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
                  <CustomTextReveal 
                    textClassName="font-tt-hoves text-xl leading-relaxed max-w-sm"
                    order={2}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </CustomTextReveal>
                </Column>
              </Row>
            </Section>
          </TextRevealProvider>

          {/* Horizontal line divider that matches container width */}
          <Divider />

          {/* Full width image section */}
          <Section variant="spacious" container={true} background="transparent">
            <div className="w-full h-96 relative overflow-hidden rounded-2xl">
              {/* Ancient Philosophy image for bottom section */}
              <Image
                src="/images/Ancient Philosophy May 2023.jpg"
                alt="Ancient Philosophy scene showing philosophers in discussion"
                fill
                priority
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
