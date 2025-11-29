'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// UI Components
import Cursor from '@/components/ui/Cursor';
import NavBar from '@/components/ui/NavBar';
import Preloader from '@/components/ui/Preloader';

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
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Preload critical assets during preloader
    const preloadImages = async () => {
      // Add any critical images to preload here
      await Promise.all([
        // Example: new Promise((resolve) => {
        //   const img = new Image();
        //   img.onload = resolve;
        //   img.src = '/portrait.jpg';
        // }),
      ]);
    };

    preloadImages();
  }, []);

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

      {/* Navigation */}
      {showContent && <NavBar />}

      {/* Main Content */}
      <main
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Certifications & Achievements Section */}
        <Certifications />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Contact Section */}
        <Contact />
      </main>
    </>
  );
}
