'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface VisionModeContextType {
  visionMode: boolean;
  toggleVisionMode: () => void;
}

const VisionModeContext = createContext<VisionModeContextType>({
  visionMode: false,
  toggleVisionMode: () => {},
});

interface VisionModeProviderProps {
  children: ReactNode;
}

export function VisionModeProvider({ children }: VisionModeProviderProps) {
  const [visionMode, setVisionMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize vision mode based on device (default ON for mobile)
  useEffect(() => {
    if (!isInitialized) {
      const isMobile = window.innerWidth < 768;
      setVisionMode(isMobile); // Default ON for mobile
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    // Apply vision-mode class to body
    document.body.classList.toggle('vision-mode', visionMode);
    
    // Clean up on unmount
    return () => {
      document.body.classList.remove('vision-mode');
    };
  }, [visionMode]);

  const toggleVisionMode = () => {
    setVisionMode(prev => !prev);
  };

  return (
    <VisionModeContext.Provider value={{ visionMode, toggleVisionMode }}>
      {children}
    </VisionModeContext.Provider>
  );
}

export const useVisionMode = () => {
  const context = useContext(VisionModeContext);
  if (!context) {
    throw new Error('useVisionMode must be used within a VisionModeProvider');
  }
  return context;
};

export default VisionModeContext;
