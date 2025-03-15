"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef, useEffect, useState, useId } from "react";
import { cn } from "@/lib/utils";
import { useTextReveal } from "./text-reveal-context";

export interface CustomTextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
  textClassName?: string;
  order: number;
}

export const CustomTextReveal: FC<CustomTextRevealProps> = ({ 
  children, 
  className,
  textClassName,
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
    if (completed) {
      markSectionComplete(id);
    }
  }, [completed, id, markSectionComplete]);

  if (typeof children !== "string") {
    throw new Error("CustomTextReveal: children must be a string");
  }

  const words = children.split(" ");
  
  // When the last word is fully revealed, mark this section as complete
  const handleLastWordRevealed = () => {
    setCompleted(true);
  };

  return (
    <div 
      ref={targetRef} 
      className={cn("relative", className)}
      {...props}
    >
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
          onFullyRevealed();
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
        className="text-alexandria-foreground"
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    </span>
  );
}; 