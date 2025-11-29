'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

// Throttle function for performance
function throttle<T extends (...args: never[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Throttle to 60fps (16ms)
  const throttledMouseMove = useMemo(
    () => throttle(updateMousePosition, 16),
    [updateMousePosition]
  );

  useEffect(() => {
    window.addEventListener('mousemove', throttledMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
    };
  }, [throttledMouseMove]);

  return mousePosition;
}

export default useMousePosition;
