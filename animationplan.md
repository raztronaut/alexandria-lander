# Alexandria Website Animation Plan (Updated)

## Overview

The Alexandria website features a carefully crafted loading animation sequence that creates an elegant introduction to the site. The animation is designed to focus user attention, build anticipation, and provide a smooth transition into the content experience.

## Animation Sequence (Current Implementation)

The animation follows these sequential stages:

1. **Initial Load (0s)**: 
   - Alexandria logo appears centered on a black background
   - Page scrolling is locked
   - Content is hidden

2. **Background Fade (2s)**:
   - Black background begins fading out
   - Logo remains visible and centered
   - Duplicate hero image begins fading in beneath the logo

3. **Hero Visible (3s)**:
   - Black background has fully faded out
   - Duplicate hero image is fully visible
   - Logo remains centered on top of the duplicate hero image

4. **Move Down (4s)**:
   - Duplicate hero image with logo moves from center to the hero position
   - The movement is smooth and maintains aspect ratio and width constraints
   - The image maintains 90% width (with 5% margins on each side) throughout
   - Logo remains centered on the duplicate image

5. **Show Actual Hero & Header Stage One (5s)**:
   - Actual hero image fades in at the same position
   - Duplicate hero image and logo remain visible
   - The "Alexandria" title text fades in at the top of the page
   - Both the duplicate and actual hero images are visible simultaneously

6. **Header Stage Two (5.8s)**:
   - The rest of the header (navigation, logo, menu) fades in
   - Duplicate hero image and logo remain visible
   - Actual hero image remains visible

7. **Fadeout (6.8s)**:
   - Duplicate hero image begins fading out
   - Logo fades out simultaneously
   - Actual hero image remains fully visible
   - This creates the illusion of a smooth transition between images

8. **Animation Complete (7.8s)**:
   - Duplicate image and initial loading component unmount
   - Actual hero image is fully visible
   - Main content begins fading in
   - Scrolling is unlocked

## Components and Responsibilities

### LoadingAnimation Component
- Manages the animation phases (initial, bgFading, heroVisible, moveDown, fadeOut, complete)
- Controls the black background, logo, and duplicate hero image during loading
- Handles the movement and fade out transitions of the duplicate image
- Provides callbacks to the parent for state transitions
- Self-unmounts when animation completes
- Maintains consistent container structure throughout all animation phases
- Uses CSS transform for smooth, non-janky transitions

### Home Component (page.tsx)
- Orchestrates the overall animation sequence
- Manages animation state, including the phase, fadeOutStarted, and triggerFadeOut flags
- Handles callbacks from LoadingAnimation
- Controls header and content visibility
- Controls the visibility of the actual hero image based on fadeOutStarted
- Manages timed transitions between animation states

### Header Component
- Supports staged animation through two visibility props:
  - `stageOneVisible`: Controls the "Alexandria" title visibility
  - `stageTwoVisible`: Controls the rest of header elements visibility

## Accessibility Considerations

- Animation respects user preferences for reduced motion
- If `prefers-reduced-motion` is enabled, animation is skipped
- Proper ARIA attributes are used for screen readers
- Keyboard navigation is preserved throughout
- Page scrolling is properly managed (locked during animation, unlocked after)

## Technical Implementation

### Animation State Management
```typescript
const [animationState, setAnimationState] = useState({
  phase: 'initial' as 'initial' | 'bgFading' | 'heroVisible' | 'moveDown' | 'fadeOut' | 'complete',
  headerStageOneVisible: false,
  headerStageTwoVisible: false,
  contentVisible: false,
  skipAnimation: shouldSkipAnimation(), // Use the utility function
  fadeOutStarted: false,
  triggerFadeOut: false, // Controls when to start the fadeOut phase
});
```

### Animation Phase Management
The animation uses a single source of truth for the animation phase:
```typescript
// In LoadingAnimation.tsx
const updateAnimationPhase = (newPhase: 'initial' | 'bgFading' | 'heroVisible' | 'moveDown' | 'fadeOut' | 'complete') => {
  setAnimationPhase(newPhase);
  if (onPhaseChange) {
    onPhaseChange(newPhase);
  }
};
```

### Callback Structure
The animation uses a series of callbacks to coordinate between components:
- `onBackgroundFaded`: Notifies when the background has faded
- `onHeroReady`: Notifies when the hero is visible with logo overlay
- `onMoveDownComplete`: Notifies when the moveDown phase is complete
- `onFadeOutStarted`: Notifies when to start showing the actual hero image
- `onAnimationComplete`: Notifies when the entire animation sequence is complete
- `onPhaseChange`: Notifies the parent of any phase change

### Key Animation Sequence Implementation

#### Move Down to Header Transition
```typescript
// In page.tsx
const handleMoveDownComplete = () => {
  // First reveal the actual hero image immediately
  setAnimationState(prev => ({ 
    ...prev, 
    fadeOutStarted: true,  // This makes the actual hero image visible
    headerStageOneVisible: true 
  }));
  
  // After a short delay, reveal the rest of the header
  setTimeout(() => {
    setAnimationState(prev => ({ ...prev, headerStageTwoVisible: true }));
    
    // After header is fully visible, trigger the fadeOut as the final step
    setTimeout(() => {
      setAnimationState(prev => ({ ...prev, triggerFadeOut: true }));
    }, 1000);
  }, 800);
};
```

#### Fadeout Trigger
```typescript
// In LoadingAnimation.tsx
useEffect(() => {
  if (triggerFadeOut && animationPhase === 'moveDown') {
    // Start the fadeOut phase when triggered by parent
    updateAnimationPhase('fadeOut');
    
    // We don't need to call onFadeOutStarted here anymore since it's already called in handleMoveDownComplete
    // But we'll keep it for backward compatibility
    if (onFadeOutStarted) onFadeOutStarted();
  }
}, [triggerFadeOut, animationPhase, onFadeOutStarted]);
```

### Z-Index Architecture
The animation relies on careful z-index layering to ensure proper element stacking:
- Logo overlay: 10000 (highest)
- Loading screen: 9999
- Duplicate image: 9999
- Sidebar: 1000 (above all content when open)
- Content: 50
- Header: 20
- Footer: 10

### CSS Transitions
Smooth transitions are implemented using CSS with carefully timed durations:
- Background fade: 1000ms
- Logo transitions: 1000ms
- Duplicate image movement: 1000ms (using CSS transform)
- Duplicate image fade: 1000ms
- Hero image reveal: 1000ms
- Header stages: 1000ms each
- Content reveal: 700ms

### Image Management
- Uses two versions of the same image (original and duplicate)
- The duplicate image has consistent styling with the hero image
- Both images use the same width and border radius for seamless transition
- Consistent 90% width constraint is maintained throughout all animation phases
- The duplicate image uses CSS transform for smooth position transitions

### Smooth Movement Implementation
- Uses precise position calculation based on measuring both:
  - The current position of the duplicate image container
  - The target hero position in the DOM
- Applies CSS transform for movement instead of changing dimensions
- Maintains consistent container structure throughout all phases:
  ```jsx
  <div className="w-full max-w-[90%] mx-auto h-[350px] md:h-[450px] lg:h-[600px] rounded-2xl overflow-hidden">
    <div className="relative w-full h-full">
      <Image ... />
    </div>
  </div>
  ```
- Uses cubic-bezier easing for natural animation feel: `cubic-bezier(0.16, 1, 0.3, 1)`
- Adds subtle shadow effects during movement for enhanced visual polish

### Animation History
- The site tracks whether users have seen the animation
- Animation is shown only once per week per user (configurable)
- This is managed through localStorage with a 7-day cooldown
- Animation history is properly tracked with `markAnimationSeen()` call

### Body Overflow Management
- Centralized body overflow management in the page component
- Proper cleanup of body overflow style in useEffect return function
- Ensures scrolling is locked during animation and unlocked after

## Visual Timeline

```
Timeline:
0s     2s     3s     4s     5s     5.8s   6.8s   7.8s
|------|------|------|------|------|------|------|
  Logo   BG     Hero   Move   Show   Header  Fade   Content
         Fade          Down   Hero    +      Out    Visible
                              Image   Logo
```

## Testing Recommendations

1. Test the animation sequence timing to ensure it follows the plan
2. Verify that animation history is properly tracked (animation should only show once per week)
3. Test with reduced motion preferences enabled
4. Verify that body overflow is properly managed during animation and when opening/closing the sidebar
5. Test animation skipping functionality
6. Verify that there are no memory leaks by monitoring performance during and after animation
7. Verify that the actual hero image appears immediately after the moveDown phase
8. Ensure both the duplicate image (with logo) and actual hero image are visible simultaneously
9. Check that the fadeout only happens after both header stages are visible
10. Confirm that the transition feels smooth and polished