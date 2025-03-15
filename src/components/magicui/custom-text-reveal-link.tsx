"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef, useEffect, useState, useId } from "react";
import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { useTextReveal } from "./text-reveal-context";

export interface CustomTextRevealLinkProps extends ComponentPropsWithoutRef<"a"> {
  children: string;
  href: string;
  textClassName?: string;
  isExternal?: boolean;
  order: number;
}

export const CustomTextRevealLink: FC<CustomTextRevealLinkProps> = ({ 
  children, 
  className,
  textClassName,
  href,
  isExternal = false,
  order,
  ...props
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "start 30%"]
  });
  
  const [completed, setCompleted] = useState(false);
  const [canStartAnimation, setCanStartAnimation] = useState(false);
  const id = useId();
  const { registerSection, unregisterSection, markSectionComplete, canAnimate } = useTextReveal();
  
  useEffect(() => {
    registerSection(id, order);
    return () => unregisterSection(id);
  }, [id, order, registerSection, unregisterSection]);
  
  useEffect(() => {
    const checkIfCanAnimate = () => {
      const canStart = canAnimate(order);
      setCanStartAnimation(canStart);
    };
    
    checkIfCanAnimate();
    // Re-check when scroll position changes
    const scrollHandler = () => checkIfCanAnimate();
    window.addEventListener('scroll', scrollHandler);
    
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [order, canAnimate]);
  
  useEffect(() => {
    // Only mark section complete if completed state is true
    if (completed) {
      // Avoid rapid state updates if user is scrolling fast
      const timeoutId = setTimeout(() => {
        markSectionComplete(id);
      }, 50); // Small delay to smooth out updates
      
      return () => clearTimeout(timeoutId);
    }
  }, [completed, id, markSectionComplete]);

  if (typeof children !== "string") {
    throw new Error("CustomTextRevealLink: children must be a string");
  }

  const words = children.split(" ");
  
  // When the last word is fully revealed, mark this section as complete
  const handleLastWordRevealed = () => {
    // We'll use setTimeout to ensure this doesn't happen during render
    setTimeout(() => {
      setCompleted(true);
    }, 0);
  };

  // External link attributes
  const externalProps = isExternal ? {
    target: "_blank",
    rel: "noopener noreferrer",
  } : {};

  const content = (
    <span
      className={cn(
        "flex flex-wrap text-xl font-medium text-alexandria-foreground/20",
        textClassName
      )}
    >
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]}
            isLastWord={isLastWord}
            onFullyRevealed={isLastWord ? handleLastWordRevealed : undefined}
            canAnimate={canStartAnimation}
          >
            {word}
          </Word>
        );
      })}
    </span>
  );

  return (
    <div ref={targetRef} className="relative">
      {isExternal ? (
        <a
          href={href}
          className={cn("inline-block", className)}
          {...externalProps}
          {...props}
        >
          {content}
        </a>
      ) : (
        <NextLink
          href={href}
          className={cn("inline-block", className)}
          {...props}
        >
          {content}
        </NextLink>
      )}
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isLastWord?: boolean;
  onFullyRevealed?: () => void;
  canAnimate: boolean;
}

const Word: FC<WordProps> = ({ 
  children, 
  progress, 
  range, 
  isLastWord = false, 
  onFullyRevealed,
  canAnimate
}) => {
  // Only start revealing if animation is allowed for this section
  const opacity = useTransform(
    progress, 
    range, 
    canAnimate ? [0, 1] : [0, 0]
  );
  
  useEffect(() => {
    // When opacity reaches 1 and this is the last word, call the callback
    if (isLastWord && onFullyRevealed) {
      const unsubscribe = opacity.on("change", (value) => {
        if (value >= 0.99) {
          // Using setTimeout to ensure it runs after the current render cycle is complete
          setTimeout(() => {
            onFullyRevealed();
          }, 0);
          unsubscribe();
        }
      });
      
      return unsubscribe;
    }
  }, [opacity, isLastWord, onFullyRevealed]);
  
  return (
    <span className="relative mx-1">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className="text-alexandria-foreground hover:underline"
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    </span>
  );
}; 