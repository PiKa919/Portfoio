import { Variants } from 'framer-motion';

// ===== FADE VARIANTS =====
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// ===== SCALE VARIANTS =====
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

// ===== STAGGER CONTAINER =====
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ===== LETTER ANIMATION =====
export const letterContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const letterAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// ===== SLIDE VARIANTS =====
export const slideInFromLeft: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};

export const slideInFromRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};

// ===== BOUNDING BOX DRAW =====
export const boundingBoxDraw: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
};

// ===== GLOW PULSE =====
export const glowPulse: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(0, 243, 255, 0)',
  },
  animate: {
    boxShadow: [
      '0 0 0 rgba(0, 243, 255, 0)',
      '0 0 20px rgba(0, 243, 255, 0.5)',
      '0 0 0 rgba(0, 243, 255, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ===== NAVBAR VARIANTS =====
export const navbarVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// ===== PRELOADER VARIANTS =====
export const preloaderExit: Variants = {
  initial: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeIn' },
  },
};

export const splitScreenLeft: Variants = {
  initial: { x: 0 },
  animate: {
    x: '-100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const splitScreenRight: Variants = {
  initial: { x: 0 },
  animate: {
    x: '100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

// ===== CARD HOVER =====
export const cardHover: Variants = {
  initial: { y: 0 },
  hover: {
    y: -10,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// ===== SKILL CHIP =====
export const skillChipVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  highlighted: {
    scale: 1.1,
    boxShadow: '0 0 20px rgba(0, 243, 255, 0.5)',
    transition: { duration: 0.3 },
  },
  dimmed: {
    opacity: 0.3,
    transition: { duration: 0.3 },
  },
};
