"use client";

import React, { 
  createContext, 
  useContext, 
  useState, 
  ReactNode, 
  useCallback, 
  useEffect 
} from "react";

interface TextRevealContextProps {
  registerSection: (id: string, order: number) => void;
  unregisterSection: (id: string) => void;
  markSectionComplete: (id: string) => void;
  canAnimate: (order: number) => boolean;
}

const TextRevealContext = createContext<TextRevealContextProps | undefined>(undefined);

interface Section {
  id: string;
  order: number;
  isComplete: boolean;
}

export const TextRevealProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<Section[]>([]);
  
  const registerSection = useCallback((id: string, order: number) => {
    setSections(prev => {
      if (prev.some(section => section.id === id)) {
        return prev;
      }
      return [...prev, { id, order, isComplete: false }].sort((a, b) => a.order - b.order);
    });
  }, []);
  
  const unregisterSection = useCallback((id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
  }, []);
  
  const markSectionComplete = useCallback((id: string) => {
    // Add small delay before marking complete to make transition smoother
    setTimeout(() => {
      setSections(prev => 
        prev.map(section => 
          section.id === id ? { ...section, isComplete: true } : section
        )
      );
    }, 300); // 300ms delay
  }, []);
  
  const canAnimate = useCallback((order: number) => {
    // First section can always animate
    if (order === 0) return true;
    
    // Find all sections with lower order numbers
    const previousSections = sections.filter(s => s.order < order);
    
    // If there are no previous sections, or all previous sections are complete, 
    // this section can animate
    return previousSections.length === 0 || 
           previousSections.every(section => section.isComplete);
  }, [sections]);
  
  const value = {
    registerSection,
    unregisterSection,
    markSectionComplete,
    canAnimate
  };
  
  return (
    <TextRevealContext.Provider value={value}>
      {children}
    </TextRevealContext.Provider>
  );
};

export const useTextReveal = () => {
  const context = useContext(TextRevealContext);
  if (context === undefined) {
    throw new Error("useTextReveal must be used within a TextRevealProvider");
  }
  return context;
}; 