'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import ParticleNetwork from '@/components/ui/ParticleNetwork';
import { letterContainer, letterAnimation, fadeInUp, staggerContainer } from '@/lib/animations';

const name = 'ANKIT DAS';
const role = 'Computer Vision Engineer';

export default function Hero() {
  const statusRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [particleCount, setParticleCount] = useState(40);

  useEffect(() => {
    const handleResize = () => {
      setParticleCount(window.innerWidth < 768 ? 15 : 40);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (hasAnimated.current) return;

    // Animate status value with Anime.js
    const timer = setTimeout(() => {
      if (statusRef.current) {
        anime({
          targets: statusRef.current,
          innerHTML: [0, 93],
          round: 1,
          duration: 2000,
          easing: 'easeInOutQuad',
        });
      }
      hasAnimated.current = true;
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Network Background */}
      <ParticleNetwork
        particleCount={particleCount}
        connectionDistance={150}
        mouseRepelRadius={100}
      />

      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50" />

      {/* Content */}
      <div className="relative z-10 section-container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Terminal prefix */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-mono text-xs sm:text-sm text-cyan"
            >
              <span className="text-muted">&gt;</span> initializing portfolio
              <span className="cursor-blink ml-1">_</span>
            </motion.div>

            {/* Name with letter animation */}
            <motion.h1
              variants={letterContainer}
              initial="hidden"
              animate="visible"
              className="glitch text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              data-text={name}
            >
              {name.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterAnimation}
                  className="inline-block interactive"
                  whileHover={{
                    scale: 1.2,
                    color: '#00f3ff',
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Role */}
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl font-mono text-muted"
            >
              <span className="text-cyan">&lt;</span>
              {role}
              <span className="text-cyan">/&gt;</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
              className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-gray-400 leading-relaxed"
            >
              I build vision systems that{' '}
              <span className="text-cyan">see</span>,{' '}
              <span className="text-purple">understand</span>, and{' '}
              <span className="text-matrix">act</span>. Specializing in deep
              learning, computer vision, and production ML systems.
            </motion.p>

            {/* Status Bar */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 sm:gap-4 pt-4 justify-center lg:justify-start"
            >
              <StatusItem
                label="Focus"
                value="Generative AI"
                delay={0.9}
              />
              <StatusItem
                label="Status"
                value="Building"
                delay={1.0}
                isActive
              />
              <StatusItem
                label="Accuracy"
                valueRef={statusRef}
                suffix="%"
                delay={1.1}
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-3 sm:gap-4 pt-6 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 243, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-primary border-purple text-purple hover:border-purple"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(189, 0, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  ['--primary-cyan' as string]: '#bd00ff',
                }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Code Snippets */}
          <motion.div
            className="lg:col-span-2 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="space-y-4">
              <CodeSnippet
                code="model = Sequential()"
                delay={1.2}
              />
              <CodeSnippet
                code="cv2.VideoCapture(0)"
                delay={1.4}
                className="ml-8"
              />
              <CodeSnippet
                code="tf.keras.layers.Dense(128)"
                delay={1.6}
                className="ml-4"
              />
              <CodeSnippet
                code="yolo.detect(frame)"
                delay={1.8}
                className="ml-12"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cyan/50 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-cyan rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Status Item Component
interface StatusItemProps {
  label: string;
  value?: string;
  valueRef?: React.RefObject<HTMLSpanElement | null>;
  suffix?: string;
  delay: number;
  isActive?: boolean;
}

function StatusItem({ label, value, valueRef, suffix = '', delay, isActive }: StatusItemProps) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay }}
      className="flex items-center gap-2 px-4 py-2 bg-void/50 border border-cyan/20 rounded"
    >
      {isActive && (
        <span className="w-2 h-2 bg-matrix rounded-full animate-pulse" />
      )}
      <span className="text-xs font-mono text-muted uppercase">{label}:</span>
      {valueRef ? (
        <span ref={valueRef} className="text-sm font-mono text-cyan">
          0
        </span>
      ) : (
        <span className="text-sm font-mono text-cyan">{value}</span>
      )}
      {suffix && <span className="text-sm font-mono text-cyan">{suffix}</span>}
    </motion.div>
  );
}

// Code Snippet Component
interface CodeSnippetProps {
  code: string;
  delay: number;
  className?: string;
}

function CodeSnippet({ code, delay, className = '' }: CodeSnippetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.6, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ opacity: 1, scale: 1.02 }}
      className={`font-mono text-sm text-cyan/70 bg-void/30 border border-cyan/10 rounded px-4 py-2 backdrop-blur-sm ${className}`}
    >
      <span className="text-purple">{'>>> '}</span>
      {code}
    </motion.div>
  );
}
