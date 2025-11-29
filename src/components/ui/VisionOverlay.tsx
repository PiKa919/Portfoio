'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './VisionOverlay.module.css';

interface VisionOverlayProps {
  children: ReactNode;
  confidence?: number;
  label?: string;
  className?: string;
  delay?: number;
}

export default function VisionOverlay({
  children,
  confidence = 0.95,
  label = 'DETECTED',
  className = '',
  delay = 0,
}: VisionOverlayProps) {
  // Generate a pseudo-random confidence based on provided value
  const displayConfidence = confidence.toFixed(2);

  return (
    <motion.div
      className={`${styles.visionBox} ${className}`}
      data-confidence={displayConfidence}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {/* Top-left corner */}
      <motion.div
        className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-cyan"
        initial={{ scaleX: 0, scaleY: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.3 }}
        style={{ transformOrigin: 'top left' }}
      />

      {/* Top-right corner */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-cyan"
        initial={{ scaleX: 0, scaleY: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.3 }}
        style={{ transformOrigin: 'top right' }}
      />

      {/* Bottom-left corner */}
      <motion.div
        className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-cyan"
        initial={{ scaleX: 0, scaleY: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4, duration: 0.3 }}
        style={{ transformOrigin: 'bottom left' }}
      />

      {/* Bottom-right corner */}
      <motion.div
        className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-cyan"
        initial={{ scaleX: 0, scaleY: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5, duration: 0.3 }}
        style={{ transformOrigin: 'bottom right' }}
      />

      {/* Label */}
      <motion.span
        className="absolute -top-7 left-0 text-xs font-mono text-cyan whitespace-nowrap"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.6, duration: 0.3 }}
      >
        {label}: {displayConfidence}
      </motion.span>

      {/* Content */}
      {children}
    </motion.div>
  );
}
