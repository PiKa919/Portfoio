'use client';

import { useState, useEffect, RefObject } from 'react';

interface ScrollProgress {
  progress: number;
  isInView: boolean;
}

export function useScrollProgress(
  ref?: RefObject<HTMLElement | null>,
  threshold: number = 0.3
): ScrollProgress {
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    
    if (!element) {
      // Track overall page scroll progress
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
        setProgress(Math.min(Math.max(scrollProgress, 0), 1));
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Track element scroll progress using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementProgress = 1 - (rect.top / windowHeight);
            setProgress(Math.min(Math.max(elementProgress, 0), 1));
          }
        });
      },
      { threshold: [0, threshold, 1] }
    );

    observer.observe(element);

    // Also track scroll for more granular progress
    const handleScroll = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementProgress = 1 - (rect.top / windowHeight);
      setProgress(Math.min(Math.max(elementProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, threshold]);

  return { progress, isInView };
}

export default useScrollProgress;
