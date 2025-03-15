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
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { ContentReveal } from "@/components/ContentReveal";
import { shouldSkipAnimation, markAnimationSeen } from "@/utils/animationUtils";

// Simple divider component that uses consistent container
const Divider = () => (
  <div className="container mx-auto max-w-[2560px]">
    <hr className="border-t border-alexandria-border" />
  </div>
);

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const heroImageRef = useRef<HTMLDivElement>(null);
  
  // Simplified animation state with a single source of truth for animation phase
  const [animationState, setAnimationState] = useState({
    phase: 'initial' as 'initial' | 'bgFading' | 'heroVisible' | 'moveDown' | 'fadeOut' | 'complete',
    headerStageOneVisible: false,
    headerStageTwoVisible: false,
    contentVisible: false,
    skipAnimation: shouldSkipAnimation(), // Use the utility function
    fadeOutStarted: false,
    triggerFadeOut: false, // New flag to trigger the final fadeOut
  });
  
  // Initialize animation sequence
  useEffect(() => {
    // Check if animation should be skipped on mount
    if (animationState.skipAnimation) {
      setAnimationState(prev => ({
        ...prev,
        phase: 'complete',
        headerStageOneVisible: true,
        headerStageTwoVisible: true,
        contentVisible: true,
        fadeOutStarted: true,
        triggerFadeOut: true,
      }));
      
      // Mark as seen even when skipped
      markAnimationSeen();
    }
  }, [animationState.skipAnimation]);
  
  // Handle background faded callback
  const handleBackgroundFaded = () => {
    setAnimationState(prev => ({ ...prev, phase: 'bgFading' }));
  };
  
  // Handle hero ready callback
  const handleHeroReady = () => {
    setAnimationState(prev => ({ ...prev, phase: 'heroVisible' }));
  };
  
  // Handle animation phase change
  const handlePhaseChange = (phase: 'initial' | 'bgFading' | 'heroVisible' | 'moveDown' | 'fadeOut' | 'complete') => {
    setAnimationState(prev => ({ ...prev, phase }));
  };
  
  // Handle moveDown complete callback - new handler
  const handleMoveDownComplete = () => {
    // First reveal the actual hero image immediately
    setAnimationState(prev => ({ 
      ...prev, 
      fadeOutStarted: true,
      headerStageOneVisible: true 
    }));
    
    // After a short delay, reveal the rest of the header
    setTimeout(() => {
      setAnimationState(prev => ({ ...prev, headerStageTwoVisible: true }));
      
      // After header is fully visible, trigger the fadeOut as the final step
      setTimeout(() => {
        setAnimationState(prev => ({ ...prev, triggerFadeOut: true }));
      }, 1000); // Wait 1 second after header stage two is visible
    }, 800); // Shorter delay between header stages for better UX
  };
  
  // Handle the animation sequence completion
  const handleAnimationComplete = () => {
    // Mark that the user has seen the animation
    markAnimationSeen();
    
    // Reveal the content after animation is complete
    setAnimationState(prev => ({ 
      ...prev, 
      contentVisible: true,
    }));
  };
  
  // Handle fade out started callback
  const handleFadeOutStarted = () => {
    // This is now just a hook for any additional logic we might need
    // when the fadeout animation actually starts
    // The fadeOutStarted state is already set in handleMoveDownComplete
  };
  
  // Centralized body overflow management
  useEffect(() => {
    const shouldLockBody = isSidebarOpen || !animationState.contentVisible;
    
    if (shouldLockBody) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen, animationState.contentVisible]);

  return (
    <>
      {/* Initial loading animation - stays on top of everything */}
      {animationState.phase !== 'complete' && (
        <LoadingAnimation 
          onAnimationComplete={handleAnimationComplete}
          skipAnimation={animationState.skipAnimation}
          onBackgroundFaded={handleBackgroundFaded}
          onHeroReady={handleHeroReady}
          onFadeOutStarted={handleFadeOutStarted}
          onMoveDownComplete={handleMoveDownComplete}
          onPhaseChange={handlePhaseChange}
          heroRef={heroImageRef}
          triggerFadeOut={animationState.triggerFadeOut}
        />
      )}
      
      <div className="min-h-screen flex flex-col">
        {/* Header with staged animation */}
        <div className="transition-transform duration-1000">
          <Header 
            stageOneVisible={animationState.headerStageOneVisible}
            stageTwoVisible={animationState.headerStageTwoVisible}
          />
        </div>

        {/* Transparent space for header visibility */}
        <div className="h-[170px] xs:h-[180px] sm:h-[190px] md:h-[130px] lg:h-[210px] w-full bg-transparent"></div>
        
        {/* Content wrapper that will slide over the header */}
        <div 
          className="relative bg-transparent"
          style={{ zIndex: 'var(--z-content)', position: 'relative' }}
        >
          {/* Hero Section - now can be visible during animation */}
          <Section 
            variant="hero" 
            className="relative pt-0 pb-0" 
            container={true}
            background="transparent"
          >
            {/* Hero image with fade in effect */}
            <div 
              ref={heroImageRef}
              className={`w-full h-[350px] md:h-[450px] lg:h-[600px] relative overflow-hidden rounded-2xl transition-opacity duration-1000 ${
                animationState.fadeOutStarted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Hero image without parallax */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/Ancient-Philosophy-May-2023.jpg"
                  alt="Ancient Philosophy scene showing philosophers in discussion"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Section>

          {/* Main Content - with white background to cover header */}
          <main className={`bg-white transition-opacity duration-700 ${animationState.contentVisible ? 'opacity-100' : 'opacity-0'}`}>
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

              {/* Horizontal line divider that matches container width */}
              <Divider />

              {/* Full width image section */}
              <Section variant="spacious" container={true} background="transparent">
                <div className="w-full h-96 relative overflow-hidden rounded-2xl">
                  {/* Ancient Philosophy image for bottom section */}
                  <Image
                    src="/images/Ancient-Philosophy-May-2023.jpg"
                    alt="Ancient Philosophy scene showing philosophers in discussion"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </div>
              </Section>
            </TextRevealProvider>
          </main>
        </div>

        <div className={`transition-opacity duration-700 ${animationState.contentVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Footer />
        </div>
      </div>
    </>
  );
}
