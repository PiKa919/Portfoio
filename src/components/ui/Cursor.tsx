'use client';

import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useState, useEffect } from 'react';

export default function Cursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show cursor after first mouse move
    const handleFirstMove = () => setIsVisible(true);
    window.addEventListener('mousemove', handleFirstMove, { once: true });

    // Track hover state on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Don't render on mobile or before first mouse move
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Main cursor - diamond shape */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{ 
          x: x - 12, 
          y: y - 12,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 28,
          mass: 0.5,
        }}
      >
        <motion.div
          className="w-6 h-6 border-2 border-white"
          animate={{
            scale: isHovering ? 1.5 : 1,
            rotate: isHovering ? 0 : 45,
            borderRadius: isHovering ? '50%' : '0%',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{ 
          x: x - 4, 
          y: y - 4,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 15,
          mass: 0.1,
        }}
      >
        <div className="w-2 h-2 bg-cyan rounded-full opacity-50" />
      </motion.div>
    </>
  );
}
