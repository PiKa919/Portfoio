'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  keyStat: string;
  color: string;
  problem?: string;
  approach?: string;
  results?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 'pune-metro',
    title: 'Pune Metro Hackathon',
    subtitle: 'Real-time Queue Monitoring System',
    description: 'Developed a computer vision system for monitoring passenger queues in metro stations, enabling real-time crowd density analysis and wait time estimation.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'YOLOv8'],
    keyStat: '85% Accuracy',
    color: 'cyan',
    problem: 'Metro stations struggle with unpredictable passenger flow, leading to overcrowding and safety concerns.',
    approach: 'Implemented YOLOv8 for person detection with custom tracking algorithms to monitor queue density in real-time.',
    results: 'Achieved 85% accuracy in real-world environments with <200ms inference time.',
  },
  {
    id: 'visiondoc',
    title: 'VisionDoc',
    subtitle: 'Eye Disease Detection Automation',
    description: 'An automated system for detecting various eye diseases from retinal images using deep learning ensemble methods.',
    techStack: ['ResNet', 'EfficientNetB3', 'TensorFlow', 'Keras'],
    keyStat: '93% Accuracy',
    color: 'purple',
    problem: 'Manual diagnosis of eye diseases is time-consuming and requires specialist expertise.',
    approach: 'Created an ensemble model combining ResNet and EfficientNetB3 with extensive hyperparameter tuning.',
    results: '93% accuracy via hyperparameter optimization, processed 10K+ images during training.',
  },
  {
    id: 'stocksight',
    title: 'StockSight',
    subtitle: 'LSTM Neural Network System',
    description: 'A stock price prediction system using LSTM neural networks for analyzing and forecasting tech stock movements.',
    techStack: ['Keras', 'Scikit-learn', 'Seaborn', 'Pandas'],
    keyStat: 'Minimized RMSE',
    color: 'matrix',
    problem: 'Traditional analysis methods fail to capture complex temporal patterns in stock data.',
    approach: 'Built LSTM architecture with attention mechanisms, trained on historical tech stock data.',
    results: 'Achieved minimal RMSE for tech stock predictions with robust backtesting results.',
  },
  {
    id: 'pratishtha',
    title: 'Pratishtha Website',
    subtitle: 'SAKECFEST Official Platform',
    description: 'Designed and developed the official website for SAKEC\'s cultural fest featuring immersive 3D experiences.',
    techStack: ['React Three Fiber', 'Firebase', 'Spline', 'Next.js'],
    keyStat: '5000+ Users',
    color: 'cyan',
    problem: 'Needed an engaging digital platform to showcase the cultural fest and handle registrations.',
    approach: 'Combined 3D web graphics with efficient backend systems for seamless user experience.',
    results: 'Successfully handled 5000+ users during peak traffic with zero downtime.',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  return (
    <section id="projects" className="relative min-h-screen py-16 md:py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/95 to-void" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="section-container px-4 sm:px-6 mb-6 md:mb-8"
        >
          <span className="font-mono text-cyan text-xs sm:text-sm tracking-wider">
            {'// MODEL ZOO'}
          </span>
          <h2 className="mt-3 md:mt-4 gradient-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Featured Projects</h2>
          <p className="mt-3 md:mt-4 text-gray-400 text-sm sm:text-base max-w-2xl">
            A collection of computer vision and machine learning projects that
            demonstrate end-to-end pipeline development, from research to deployment.
          </p>
        </motion.div>

        {/* Horizontal Scroll Carousel */}
        <div className="relative">
          {/* Scroll Progress Indicator */}
          <div className="section-container mb-4">
            <div className="w-full h-1 bg-muted/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan to-purple"
                style={{ scaleX: scrollXProgress, transformOrigin: '0%' }}
              />
            </div>
          </div>

          {/* Carousel Container */}
          <motion.div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto pb-8 px-4 md:px-8 lg:px-16 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="snap-center shrink-0"
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="section-container text-center mt-4"
          >
            <span className="text-sm font-mono text-muted">
              ← Drag to explore more projects →
            </span>
          </motion.div>
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const colorClasses = {
    cyan: 'border-cyan/30 hover:border-cyan',
    purple: 'border-purple/30 hover:border-purple',
    matrix: 'border-matrix/30 hover:border-matrix',
  };

  const glowClasses = {
    cyan: 'hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]',
    purple: 'hover:shadow-[0_0_30px_rgba(189,0,255,0.2)]',
    matrix: 'hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]',
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-[280px] sm:w-[320px] md:w-[400px] h-[420px] sm:h-[450px] md:h-[480px] bg-void/80 backdrop-blur-sm border rounded-xl p-4 sm:p-5 md:p-6 cursor-pointer transition-all duration-300 flex flex-col ${
        colorClasses[project.color as keyof typeof colorClasses]
      } ${glowClasses[project.color as keyof typeof glowClasses]}`}
    >
      {/* Preview Area */}
      <div className="h-32 sm:h-36 md:h-40 bg-black/50 rounded-lg mb-4 sm:mb-5 md:mb-6 overflow-hidden relative">
        {/* Animated preview placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={`w-20 h-20 border-2 border-${project.color}/50 rounded-lg flex items-center justify-center`}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <span className={`text-${project.color} font-mono text-xs`}>
              [PREVIEW]
            </span>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className={`absolute top-2 left-2 w-2 h-2 bg-${project.color} rounded-full`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="absolute top-2 right-2 text-xs font-mono text-muted">
          {project.keyStat}
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-xl font-mono text-white mb-2">{project.title}</h3>
        <p className={`text-sm text-${project.color} mb-3`}>{project.subtitle}</p>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono border border-muted/30 text-muted rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          className={`w-full py-2 border border-${project.color}/50 text-${project.color} font-mono text-sm rounded hover:bg-${project.color}/10 transition-colors`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Details →
        </motion.button>
      </div>
    </motion.div>
  );
}

// Project Modal Component
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/90 backdrop-blur-md" />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-void border border-cyan/30 rounded-xl p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-cyan/30 rounded-full text-cyan hover:bg-cyan/10 transition-colors"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-8">
          <span className={`text-sm font-mono text-${project.color}`}>
            {project.keyStat}
          </span>
          <h3 className="text-3xl font-mono text-white mt-2">{project.title}</h3>
          <p className="text-gray-400 mt-2">{project.subtitle}</p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1 text-sm font-mono border border-${project.color}/30 text-${project.color} rounded`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-6">
          {project.problem && (
            <div>
              <h4 className="text-cyan font-mono mb-2">Problem Statement</h4>
              <p className="text-gray-400">{project.problem}</p>
            </div>
          )}

          {project.approach && (
            <div>
              <h4 className="text-purple font-mono mb-2">Technical Approach</h4>
              <p className="text-gray-400">{project.approach}</p>
            </div>
          )}

          {project.results && (
            <div>
              <h4 className="text-matrix font-mono mb-2">Results & Metrics</h4>
              <p className="text-gray-400">{project.results}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-cyan/20">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-cyan text-cyan font-mono text-sm rounded hover:bg-cyan/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View on GitHub →
            </motion.a>
          )}
          <motion.button
            onClick={onClose}
            className="px-6 py-2 border border-muted/50 text-muted font-mono text-sm rounded hover:border-white hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
