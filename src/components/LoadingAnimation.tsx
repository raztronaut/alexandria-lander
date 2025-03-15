"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface LoadingAnimationProps {
  onAnimationComplete: () => void;
  skipAnimation?: boolean;
  onBackgroundFaded?: () => void;
  onHeroReady?: () => void;
  onFadeOutStarted?: () => void;
  onMoveDownComplete?: () => void;
  heroRef?: React.RefObject<HTMLDivElement> | React.RefObject<HTMLDivElement | null>;
  onPhaseChange?: (phase: 'initial' | 'bgFading' | 'heroVisible' | 'moveDown' | 'fadeOut' | 'complete') => void;
  triggerFadeOut?: boolean;
}

export const LoadingAnimation = ({ 
  onAnimationComplete, 
  skipAnimation = false,
  onBackgroundFaded,
  onHeroReady,
  onFadeOutStarted,
  onMoveDownComplete,
  heroRef,
  onPhaseChange,
  triggerFadeOut = false
}: LoadingAnimationProps) => {
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'bgFading' | 'heroVisible' | 'moveDown' | 'fadeOut' | 'complete'>('initial');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heroPosition, setHeroPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const duplicateContainerRef = useRef<HTMLDivElement>(null);
  
  // Track whether we've already called the onAnimationComplete callback
  const [animationCompleteReported, setAnimationCompleteReported] = useState(false);

  // Update internal phase and notify parent if needed
  const updateAnimationPhase = (newPhase: 'initial' | 'bgFading' | 'heroVisible' | 'moveDown' | 'fadeOut' | 'complete') => {
    setAnimationPhase(newPhase);
    if (onPhaseChange) {
      onPhaseChange(newPhase);
    }
  };

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // If animation should be skipped or reduced motion is preferred, complete immediately
    if (skipAnimation || mediaQuery.matches) {
      if (onFadeOutStarted) onFadeOutStarted(); // Ensure actual hero is shown when skipping animation
      updateAnimationPhase('complete');
      
      if (!animationCompleteReported) {
        onAnimationComplete();
        setAnimationCompleteReported(true);
      }
      return;
    }

    // Define all possible timers to ensure they're cleared properly
    let initialTimer: NodeJS.Timeout | null = null;
    let bgFadedTimer: NodeJS.Timeout | null = null;
    let heroVisibleTimer: NodeJS.Timeout | null = null;
    let moveDownTimer: NodeJS.Timeout | null = null;
    let fadeOutTimer: NodeJS.Timeout | null = null;

    // Animation sequence timing based on the current phase
    if (animationPhase === 'initial' && imageLoaded) {
      // After logo appears, start background fade (after 2 seconds)
      initialTimer = setTimeout(() => {
        updateAnimationPhase('bgFading');
        // Notify parent component to start hero fade-in
        if (onBackgroundFaded) onBackgroundFaded();
      }, 2000); // Matches the 2s mark in the plan
    }
    
    if (animationPhase === 'bgFading') {
      // After background fades, show hero image with logo overlay
      bgFadedTimer = setTimeout(() => {
        updateAnimationPhase('heroVisible');
        // Notify parent that hero is visible with logo overlay
        if (onHeroReady) onHeroReady();
      }, 1000); // Ensures hero is visible at 3s mark
    }
    
    if (animationPhase === 'heroVisible') {
      // After showing hero with logo overlay, start moving it down
      heroVisibleTimer = setTimeout(() => {
        // Calculate the target position only when we need it
        if (heroRef?.current) {
          const heroRect = heroRef.current.getBoundingClientRect();
          
          // We need to measure our current container size to calculate the movement
          const currentContainer = duplicateContainerRef.current?.querySelector('.max-w-\\[90\\%\\]');
          if (currentContainer) {
            const containerRect = currentContainer.getBoundingClientRect();
            
            // Calculate how much we need to move from our current position to the hero position
            const moveX = heroRect.left - containerRect.left;
            const moveY = heroRect.top - containerRect.top;
            
            setHeroPosition({
              top: moveY,
              left: moveX,
              width: heroRect.width,
              height: heroRect.height
            });
          }
        }
        updateAnimationPhase('moveDown');
      }, 1000); // Ensures moveDown starts at 4s mark
    }

    if (animationPhase === 'moveDown') {
      // After the moveDown animation completes, notify parent but stay in this phase
      // We'll wait for the parent to show header elements before proceeding to fadeOut
      moveDownTimer = setTimeout(() => {
        // Notify parent that moveDown is complete and they can show header elements
        if (onMoveDownComplete) onMoveDownComplete();
        
        // The parent will now set fadeOutStarted to true, which will make the actual hero visible
        // But we'll stay in the moveDown phase until triggerFadeOut is set to true
      }, 1000); // Wait 1 second for the moveDown animation to complete visually
    }

    if (animationPhase === 'fadeOut') {
      // After fading out the duplicate, complete the animation
      fadeOutTimer = setTimeout(() => {
        updateAnimationPhase('complete');
        
        // Notify parent that animation is complete
        if (!animationCompleteReported) {
          onAnimationComplete();
          setAnimationCompleteReported(true);
        }
      }, 1000); // 1 second for fading out
    }
    
    // Return a cleanup function that clears all possible timeouts
    return () => {
      if (initialTimer) clearTimeout(initialTimer);
      if (bgFadedTimer) clearTimeout(bgFadedTimer);
      if (heroVisibleTimer) clearTimeout(heroVisibleTimer);
      if (moveDownTimer) clearTimeout(moveDownTimer);
      if (fadeOutTimer) clearTimeout(fadeOutTimer);
    };
  }, [animationPhase, skipAnimation, onAnimationComplete, onBackgroundFaded, onHeroReady, onFadeOutStarted, onMoveDownComplete, imageLoaded, heroRef, animationCompleteReported, onPhaseChange]);

  // Watch for the triggerFadeOut prop to transition to fadeOut phase
  useEffect(() => {
    if (triggerFadeOut && animationPhase === 'moveDown') {
      // Start the fadeOut phase when triggered by parent
      updateAnimationPhase('fadeOut');
      
      // We don't need to call onFadeOutStarted here anymore since it's already called in handleMoveDownComplete
      // But we'll keep it for backward compatibility
      if (onFadeOutStarted) onFadeOutStarted();
    }
  }, [triggerFadeOut, animationPhase, onFadeOutStarted]);

  // Only return null when we're actually done with everything
  if (animationPhase === 'complete' && animationCompleteReported) {
    return null;
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Calculate container styles based on current phase
  const getContainerStyles = (): React.CSSProperties => {
    // Always start with consistent base styles to avoid jumps
    const baseStyles: React.CSSProperties = {
      position: 'fixed' as const,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
      zIndex: 9999,
    };

    if ((animationPhase === 'moveDown' || animationPhase === 'fadeOut') && heroPosition) {
      // Apply the translation to move the centered container to the hero position
      return {
        ...baseStyles,
        transform: `translate(${heroPosition.left}px, ${heroPosition.top}px)`,
      };
    }
    
    // In initial phases, stay centered with no translation
    return {
      ...baseStyles,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
  };

  return (
    <>
      {/* Black background that fades out */}
      <div 
        className={`fixed inset-0 z-[9998] transition-opacity duration-1000 bg-black ${
          animationPhase === 'initial' ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      
      {/* Container for the duplicate image and logo */}
      <div 
        ref={duplicateContainerRef}
        className="fixed z-[9999] pointer-events-none overflow-visible"
        style={getContainerStyles()}
        aria-live="polite" 
        aria-label="Loading Alexandria"
      >
        {/* Show the duplicate hero image */}
        {animationPhase !== 'initial' && (
          <div 
            className={`w-full h-full flex items-center justify-center transition-opacity duration-1000 ${
              animationPhase === 'fadeOut' ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden="true"
          >
            {/* Hero image container with consistent size */}
            <div 
              className="w-full max-w-[90%] mx-auto h-[350px] md:h-[450px] lg:h-[600px] rounded-2xl overflow-hidden"
              style={{ 
                boxShadow: (animationPhase === 'moveDown' || animationPhase === 'fadeOut') ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : 'none',
                transition: 'box-shadow 500ms ease-out'
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/Ancient-Philosophy-May-2023-duplicate.jpg"
                  alt=""
                  fill
                  priority
                  className="object-cover object-top transition-opacity duration-1000"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Logo that stays on top of the duplicate image */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] transition-opacity duration-1000 ${
          animationPhase === 'fadeOut' ? 'opacity-0' : 'opacity-100'
        }`}>
          <Image
            src="/images/alexandria-logo-dark.png"
            alt="Alexandria Logo"
            width={200}
            height={200}
            className="object-contain"
            priority
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </>
  );
}; 