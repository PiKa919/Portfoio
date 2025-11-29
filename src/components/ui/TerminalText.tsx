'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface TerminalTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export default function TerminalText({
  text,
  delay = 0,
  speed = 50,
  className = '',
  onComplete,
  showCursor = true,
}: TerminalTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Intersection Observer for triggering animation when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const totalChars = text.length;
    
    const timeoutId = setTimeout(() => {
      const animation = anime({
        targets: { index: 0 },
        index: totalChars,
        duration: totalChars * speed,
        easing: 'linear',
        round: 1,
        update: (anim) => {
          const progress = Math.floor(anim.animations[0].currentValue as number);
          if (progress !== currentIndex) {
            currentIndex = progress;
            setDisplayText(text.substring(0, progress));
          }
        },
        complete: () => {
          setDisplayText(text);
          setIsComplete(true);
          onComplete?.();
        },
      });

      return () => animation.pause();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isVisible, text, delay, speed, onComplete]);

  return (
    <span ref={elementRef} className={`font-mono ${className}`}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="cursor-blink text-cyan">▌</span>
      )}
    </span>
  );
}
