'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';

interface PreloaderProps {
  onComplete: () => void;
}

const loadingMessages = [
  '> Initializing Neural Core...',
  '> Loading model: ankit_das_v3.weights',
  '> Precision: FP16 | Batch Size: 1',
  '> Calibrating vision systems...',
  '> System Ready',
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate progress counter with anime.js
    const progressAnimation = anime({
      targets: { value: 0 },
      value: 100,
      duration: 3000,
      easing: 'easeInOutQuad',
      round: 1,
      update: (anim) => {
        setProgress(Math.floor(anim.animations[0].currentValue as number));
      },
      complete: () => {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800);
        }, 500);
      },
    });

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => 
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      );
    }, 600);

    return () => {
      progressAnimation.pause();
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  // Generate progress bar
  const progressBar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-void flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Split screen panels for exit animation */}
          <motion.div
            className="absolute inset-0 bg-void"
            animate={isExiting ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Terminal content */}
          <div className="relative z-10 w-full max-w-lg px-8">
            {/* Terminal window */}
            <div className="bg-black/50 border border-cyan/30 rounded-lg p-6">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan/20">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs font-mono text-muted">neural_vision_init.sh</span>
              </div>

              {/* Messages */}
              <div className="space-y-2 mb-6 min-h-[120px]">
                {loadingMessages.slice(0, currentMessage + 1).map((message, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`font-mono text-sm ${
                      index === currentMessage ? 'text-cyan' : 'text-muted'
                    }`}
                  >
                    {message}
                    {index === currentMessage && (
                      <span className="cursor-blink ml-1">▌</span>
                    )}
                  </motion.p>
                ))}
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-muted">
                  <span>Loading assets</span>
                  <span className="text-cyan">{progress}%</span>
                </div>
                <div className="font-mono text-xs text-cyan tracking-wider">
                  [{progressBar}]
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-cyan/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-purple/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
