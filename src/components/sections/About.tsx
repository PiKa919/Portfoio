'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VisionOverlay from '@/components/ui/VisionOverlay';
import { fadeInUp, fadeInLeft, staggerContainer, staggerItem } from '@/lib/animations';

const highlights = [
  { label: 'Education', value: 'B.Tech Computer Engineering (Data Science Honors)' },
  { label: 'CGPA', value: '8.05/10' },
  { label: 'Focus', value: 'Generative AI, Multi-Modal Models, Production ML' },
];

const skills = [
  'Design end-to-end CV pipelines (YOLOv8, ResNet, EfficientNet)',
  'Deploy models on GCP/Azure with <100ms latency',
  'Build AI-powered full-stack applications',
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-12 md:py-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />

      <div className="relative z-10 section-container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 md:mb-12 w-full"
        >
          <span className="font-mono text-cyan text-xs sm:text-sm tracking-wider">
            {'// SYSTEM IDENTIFICATION'}
          </span>
          <h2 className="mt-3 md:mt-4 gradient-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl">From Data to Deployment</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start w-full max-w-5xl mx-auto">
          {/* Left Column - Image with CV Overlay */}
          <motion.div
            style={{ y: imageY }}
            className="relative lg:sticky lg:top-32 mx-auto w-full max-w-sm lg:max-w-none flex flex-col items-center"
          >
            <VisionOverlay
              confidence={0.99}
              label="FACE"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
              delay={0.2}
            >
              <div className="relative aspect-[3/4] bg-gradient-to-br from-cyan/10 to-purple/10 rounded-lg overflow-hidden border border-cyan/20">
                {/* Portrait Image */}
                <div className="absolute inset-0">
                  <img
                    src="/images/portrait.png"
                    alt="Ankit Das - Computer Vision Engineer"
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
                </div>

                {/* Detection boxes */}
                <motion.div
                  className="absolute top-[15%] left-[25%] w-[50%] h-[35%] border-2 border-cyan/60"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <span className="absolute -top-6 left-0 text-xs font-mono text-cyan">
                    FACE: 0.99
                  </span>
                </motion.div>

                <motion.div
                  className="absolute top-[25%] left-[35%] w-[12%] h-[8%] border border-matrix/60"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <span className="absolute -top-5 left-0 text-[10px] font-mono text-matrix whitespace-nowrap">
                    EYE_L: 0.97
                  </span>
                </motion.div>

                <motion.div
                  className="absolute top-[25%] left-[53%] w-[12%] h-[8%] border border-matrix/60"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <span className="absolute -top-5 left-0 text-[10px] font-mono text-matrix whitespace-nowrap">
                    EYE_R: 0.96
                  </span>
                </motion.div>

                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </VisionOverlay>

            {/* Tech stack badges */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mt-6 justify-center"
            >
              {['Python', 'TensorFlow', 'OpenCV', 'PyTorch'].map((tech) => (
                <motion.span
                  key={tech}
                  variants={staggerItem}
                  className="px-3 py-1 text-xs font-mono border border-cyan/30 text-cyan/70 rounded"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div style={{ y: contentY }} className="space-y-6 text-left flex flex-col items-start">
            {/* Bio */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full"
            >
              <p className="text-base sm:text-lg leading-relaxed text-left">
                I build vision systems that{' '}
                <span className="text-cyan font-semibold">see</span>,{' '}
                <span className="text-purple font-semibold">understand</span>, and{' '}
                <span className="text-matrix font-semibold">act</span>.
              </p>
              <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed text-left">
                As a Computer Vision Engineer, I specialize in designing and deploying
                end-to-end machine learning pipelines that transform raw visual data
                into actionable insights. My work spans from training deep learning
                models to building production-ready systems that operate in real-time.
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3 text-left w-full"
            >
              {highlights.map((item) => (
                <motion.div
                  key={item.label}
                  variants={staggerItem}
                  className="flex flex-row items-baseline gap-3"
                >
                  <span className="font-mono text-sm text-cyan uppercase tracking-wider shrink-0">
                    {item.label}:
                  </span>
                  <span className="text-gray-300 text-sm">{item.value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* What I Do */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full"
            >
              <h3 className="text-lg font-mono mb-3 text-white">
                <span className="text-purple">{'<'}</span>
                WHAT_I_DO
                <span className="text-purple">{'/>'}</span>
              </h3>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2"
              >
                {skills.map((skill, index) => (
                  <motion.li
                    key={index}
                    variants={staggerItem}
                    className="flex items-start gap-2 text-gray-400 text-sm"
                  >
                    <span className="text-cyan mt-0.5">▹</span>
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Terminal-style output */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full p-3 bg-black/50 border border-cyan/20 rounded-lg font-mono text-xs sm:text-sm"
            >
              <div className="text-muted mb-2">$ cat current_focus.txt</div>
              <div className="text-cyan break-words">
                {'>>'} Honing Generative AI & MultiModal Models
              </div>
              <div className="text-matrix mt-1 break-words">
                {'>>'} Status: ACTIVE | Building the future of vision AI
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
