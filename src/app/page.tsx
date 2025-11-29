'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// UI Components
import Cursor from '@/components/ui/Cursor';
import NavBar from '@/components/ui/NavBar';
import Preloader from '@/components/ui/Preloader';
import ParticleNetwork from '@/components/ui/ParticleNetwork';

// Section Components
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Certifications from '@/components/sections/Certifications';

// Dynamically import heavier sections for code splitting
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const Experience = dynamic(() => import('@/components/sections/Experience'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

// Loading skeleton for lazy-loaded sections
function SectionSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  // Preloader state
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // No heavy assets to preload currently, but keeping structure for future use
  // The preloader is primarily for the "terminal init" aesthetic effect

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Custom Cursor (Desktop only) */}
      <Cursor />

      {/* Global Particle Network Background */}
      {showContent && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticleNetwork
            particleCount={60}
            connectionDistance={120}
            mouseRepelRadius={80}
          />
        </div>
      )}

      {/* Navigation */}
      {showContent && <NavBar />}

      {/* Main Content */}
      <main
        className={`relative z-10 transition-opacity duration-500 w-full flex flex-col items-center ${showContent ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <div className="mt-16 md:mt-24 w-full">
          <About />
        </div>

        {/* Skills Section */}
        <div className="mt-16 md:mt-24 w-full">
          <Skills />
        </div>

        {/* Certifications & Achievements Section */}
        <div className="mt-16 md:mt-24 w-full">
          <Certifications />
        </div>

        {/* Projects Section */}
        <div className="mt-16 md:mt-24 w-full">
          <Projects />
        </div>

        {/* Experience Section */}
        <div className="mt-16 md:mt-24 w-full">
          <Experience />
        </div>

        {/* Contact Section */}
        <div className="mt-16 md:mt-24 w-full">
          <Contact />
        </div>
      </main>
    </>
  );
}
