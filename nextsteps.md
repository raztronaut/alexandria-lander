# Alexandria Loading Animation Fixes

## Issues Identified

After analyzing the loading animation implementation, I've identified several issues that need to be addressed:

1. **Animation Sequence Timing Issues**: The animation sequence has timing inconsistencies between the plan and implementation.
2. **Missing Animation History Tracking**: The `markAnimationSeen()` function is never called.
3. **Duplicate Body Overflow Locks**: Multiple components are setting `document.body.style.overflow = 'hidden'`.
4. **Redundant State Management**: There's redundant state between parent and child components.
5. **Inconsistent Animation Phase Transitions**: The animation phase transitions don't follow a clear, predictable pattern.
6. **Excessive Console Logging**: Numerous console.log statements are left in production code.
7. **Potential Memory Leaks**: Some timeouts may not be properly cleared in certain edge cases.

## Recommended Fixes

### 1. Fix Animation Sequence Timing

```typescript
// In LoadingAnimation.tsx
// Adjust timing to match the animation plan
if (animationPhase === 'initial' && imageLoaded) {
  const initialTimer = setTimeout(() => {
    setAnimationPhase('bgFading');
    if (onBackgroundFaded) onBackgroundFaded();
  }, 2000); // Matches the 2s mark in the plan
  
  return () => clearTimeout(initialTimer);
}

if (animationPhase === 'bgFading') {
  const bgFadedTimer = setTimeout(() => {
    setAnimationPhase('heroVisible');
    if (onHeroReady) onHeroReady();
  }, 1000); // Ensures hero is visible at 3s mark
  
  return () => clearTimeout(bgFadedTimer);
}

if (animationPhase === 'heroVisible') {
  const heroVisibleTimer = setTimeout(() => {
    // Calculate position and move down
    setAnimationPhase('moveDown');
  }, 1000); // Ensures moveDown starts at 4s mark
  
  return () => clearTimeout(heroVisibleTimer);
}
```

### 2. Implement Animation History Tracking

```typescript
// In page.tsx, add this to handleAnimationComplete
const handleAnimationComplete = () => {
  // Existing code...
  
  // Mark that the user has seen the animation
  markAnimationSeen();
  
  // Rest of the existing code...
};
```

### 3. Centralize Body Overflow Management

```typescript
// In page.tsx, modify the useEffect for body lock
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

// In LoadingAnimation.tsx, remove this line:
// document.body.style.overflow = 'hidden';
```

### 4. Simplify State Management

```typescript
// In page.tsx, update the animation state to include all necessary flags
const [animationState, setAnimationState] = useState({
  phase: 'initial', // Single source of truth for animation phase
  headerStageOneVisible: false,
  headerStageTwoVisible: false,
  contentVisible: false,
  skipAnimation: shouldSkipAnimation(), // Use the utility function
});

// Then pass the phase directly to LoadingAnimation
<LoadingAnimation 
  phase={animationState.phase}
  onPhaseChange={(newPhase) => setAnimationState(prev => ({ ...prev, phase: newPhase }))}
  // Other props...
/>
```

### 5. Streamline Animation Phase Transitions

```typescript
// In LoadingAnimation.tsx, implement a more predictable phase transition
useEffect(() => {
  if (skipAnimation) {
    onPhaseChange('complete');
    return;
  }
  
  const phaseTimings = {
    initial: imageLoaded ? 2000 : null, // Wait for image load + 2s
    bgFading: 1000,
    heroVisible: 1000,
    moveDown: startFadeOut ? 0 : null, // Wait for parent signal
    fadeOut: 1000,
  };
  
  const currentPhaseTime = phaseTimings[phase];
  
  // Only set a timeout if we have a valid timing for this phase
  if (currentPhaseTime !== null) {
    const nextPhaseMap = {
      initial: 'bgFading',
      bgFading: 'heroVisible',
      heroVisible: 'moveDown',
      moveDown: 'fadeOut',
      fadeOut: 'complete',
    };
    
    const timer = setTimeout(() => {
      const nextPhase = nextPhaseMap[phase];
      onPhaseChange(nextPhase);
      
      // Call appropriate callbacks based on phase transition
      if (phase === 'initial' && nextPhase === 'bgFading') {
        if (onBackgroundFaded) onBackgroundFaded();
      } else if (phase === 'bgFading' && nextPhase === 'heroVisible') {
        if (onHeroReady) onHeroReady();
      } else if (phase === 'moveDown' && nextPhase === 'fadeOut') {
        if (onFadeOutStarted) onFadeOutStarted();
      } else if (phase === 'fadeOut' && nextPhase === 'complete') {
        if (onAnimationComplete) onAnimationComplete();
      }
    }, currentPhaseTime);
    
    return () => clearTimeout(timer);
  }
}, [phase, imageLoaded, startFadeOut, onPhaseChange, onBackgroundFaded, onHeroReady, onFadeOutStarted, onAnimationComplete, skipAnimation]);
```

### 6. Remove Console Logs

Remove all `console.log` statements from the production code. These are useful for debugging but should not be in the final product.

### 7. Fix Potential Memory Leaks

```typescript
// In LoadingAnimation.tsx, ensure all timeouts are cleared
useEffect(() => {
  // Existing code...
  
  // Return a cleanup function that clears all possible timeouts
  return () => {
    if (initialTimer) clearTimeout(initialTimer);
    if (bgFadedTimer) clearTimeout(bgFadedTimer);
    if (heroVisibleTimer) clearTimeout(heroVisibleTimer);
    if (fadeOutTimer) clearTimeout(fadeOutTimer);
  };
}, [/* dependencies */]);
```

### 8. Improve Animation Skip Logic

```typescript
// In page.tsx, update the skipAnimation effect
useEffect(() => {
  // Check if animation should be skipped on mount
  const shouldSkip = shouldSkipAnimation();
  
  if (shouldSkip) {
    setAnimationState(prev => ({
      ...prev,
      skipAnimation: true,
      phase: 'complete',
      headerStageOneVisible: true,
      headerStageTwoVisible: true,
      contentVisible: true,
    }));
    
    // Mark as seen even when skipped
    markAnimationSeen();
  }
}, []);
```

## Implementation Priority

1. Fix animation sequence timing (critical for user experience)
2. Implement animation history tracking (prevents showing animation repeatedly)
3. Centralize body overflow management (prevents UI bugs)
4. Simplify state management (improves code maintainability)
5. Streamline animation phase transitions (makes animation more reliable)
6. Remove console logs (cleanup for production)
7. Fix potential memory leaks (prevents performance issues)
8. Improve animation skip logic (better user experience)
