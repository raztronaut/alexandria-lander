"use client";

// Set this to false to enable animation history in production
const DISABLE_ANIMATION_HISTORY = false;

interface AnimationPreferences {
  hasSeenAnimation: boolean;
  lastVisit: number;
}

const STORAGE_KEY = 'alexandria-animation-prefs';
const ANIMATION_COOLDOWN_PERIOD = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

/**
 * Check if the user has already seen the animation recently
 * @returns boolean indicating if animation should be skipped
 */
export const shouldSkipAnimation = (): boolean => {
  // If animation history is disabled, always show the animation
  if (DISABLE_ANIMATION_HISTORY) return false;
  
  // Always skip animation on server-side
  if (typeof window === 'undefined') return true;
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }
  
  try {
    const storedPrefs = localStorage.getItem(STORAGE_KEY);
    if (!storedPrefs) return false;
    
    const prefs: AnimationPreferences = JSON.parse(storedPrefs);
    const currentTime = Date.now();
    
    // Skip animation if user has seen it within the cooldown period
    return prefs.hasSeenAnimation && 
      (currentTime - prefs.lastVisit < ANIMATION_COOLDOWN_PERIOD);
  } catch (error) {
    // If error accessing localStorage, default to showing animation
    console.error('Error accessing animation preferences:', error);
    return false;
  }
};

/**
 * Mark that the user has seen the animation
 */
export const markAnimationSeen = (): void => {
  // Skip saving if animation history is disabled
  if (DISABLE_ANIMATION_HISTORY) return;
  
  if (typeof window === 'undefined') return;
  
  try {
    const prefs: AnimationPreferences = {
      hasSeenAnimation: true,
      lastVisit: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.error('Error saving animation preferences:', error);
  }
}; 