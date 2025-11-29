'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisionMode } from '@/context/VisionModeContext';
import { navbarVariants } from '@/lib/animations';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function NavBar() {
  const { visionMode, toggleVisionMode } = useVisionMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-void/80 backdrop-blur-md border-b border-cyan/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="font-mono text-lg md:text-xl font-bold text-white interactive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            <span className="text-cyan">&gt;</span> ANKIT
            <span className="text-purple">_</span>DAS
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="font-mono text-sm text-muted hover:text-cyan transition-colors interactive"
                whileHover={{ y: -2 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Vision Mode Toggle */}
            <motion.button
              onClick={toggleVisionMode}
              className={`relative w-12 h-6 rounded-full border-2 transition-colors interactive ${
                visionMode
                  ? 'border-matrix bg-matrix/20'
                  : 'border-cyan bg-cyan/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Vision Mode"
            >
              <motion.div
                className={`absolute top-0.5 w-4 h-4 rounded-full ${
                  visionMode ? 'bg-matrix' : 'bg-cyan'
                }`}
                animate={{ x: visionMode ? 22 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
              <span className="sr-only">
                {visionMode ? 'Disable' : 'Enable'} Vision Mode
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Vision Mode Toggle - Mobile */}
            <motion.button
              onClick={toggleVisionMode}
              className={`p-2 rounded-lg border transition-colors ${
                visionMode
                  ? 'border-matrix text-matrix'
                  : 'border-cyan text-cyan'
              }`}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Vision Mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </motion.button>

            {/* Hamburger */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-cyan origin-left"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? -2 : 0,
                  }}
                />
                <motion.span
                  className="w-full h-0.5 bg-cyan"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    x: isMobileMenuOpen ? -20 : 0,
                  }}
                />
                <motion.span
                  className="w-full h-0.5 bg-cyan origin-left"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? 2 : 0,
                  }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-void/95 backdrop-blur-md border-b border-cyan/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  className="block font-mono text-lg text-muted hover:text-cyan transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  <span className="text-cyan mr-2">&gt;</span>
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
