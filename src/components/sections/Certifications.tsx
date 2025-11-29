"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";

const achievements = [
  {
    type: "publication",
    title: "Book Chapter Publication",
    subtitle: "Quantum Optimization Algorithms and Applications",
    description: "Co-authored chapter with Dr. Namrata Manglani and Mr. Dhruv Solanki",
    icon: "📖",
    color: "#ffd700",
    status: "Upcoming",
  },
  {
    type: "achievement",
    title: "Smart India Hackathon 2023",
    subtitle: "Grand Finalist",
    description: "Competed at national level among top engineering teams",
    icon: "🏆",
    color: "#00ff88",
    status: "Achieved",
  },
  {
    type: "role",
    title: "SAKEC Research Cell",
    subtitle: "President",
    description: "Leading research initiatives and managing senior projects team",
    icon: "👨‍💼",
    color: "#00f3ff",
    status: "Active",
  },
  {
    type: "role",
    title: "SAKEC Student Council",
    subtitle: "Web & App Secretary",
    description: "Managing digital presence and technical initiatives",
    icon: "💻",
    color: "#bd00ff",
    status: "Active",
  },
];

const certifications = [
  { name: "TensorFlow Developer Certificate", provider: "Google", color: "#ff6b35" },
  { name: "Deep Learning Specialization", provider: "Coursera", color: "#00f3ff" },
  { name: "Machine Learning with Python", provider: "IBM", color: "#bd00ff" },
  { name: "Computer Vision Fundamentals", provider: "OpenCV", color: "#00ff88" },
  { name: "Azure AI Fundamentals", provider: "Microsoft", color: "#00a2ed" },
  { name: "Data Science Professional", provider: "IBM", color: "#ffd700" },
  { name: "Python for Data Science", provider: "Coursera", color: "#00f3ff" },
  { name: "Neural Networks & Deep Learning", provider: "DeepLearning.AI", color: "#ff6b35" },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;

      // Animate achievement cards
      anime({
        targets: ".achievement-card",
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 800,
        easing: "easeOutExpo",
      });

      // Animate certification badges
      anime({
        targets: ".cert-badge",
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(50, { from: "center" }),
        duration: 600,
        easing: "easeOutBack",
      });

      // Animate the connecting lines
      anime({
        targets: ".connecting-line",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1500,
        delay: 500,
        easing: "easeInOutSine",
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #00f3ff 1px, transparent 1px),
              linear-gradient(-45deg, #bd00ff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12 w-full"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan" />
            <span className="text-cyan font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              System.achievements
            </span>
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-cyan via-purple to-matrix bg-clip-text text-transparent">
              Achievements & Certs
            </span>
          </h2>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto mb-12 md:mb-20">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="achievement-card opacity-0"
            >
              <div
                className="relative p-4 md:p-6 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:border-opacity-50 transition-all duration-300"
                style={{ borderColor: item.color + "33" }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color}11, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center gap-3 md:gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center text-xl md:text-2xl"
                    style={{ background: item.color + "22" }}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex flex-col items-center gap-2 mb-2">
                      <h3 className="font-[family-name:var(--font-gaming)] text-white text-lg tracking-wide">
                        {item.title}
                      </h3>
                      <p
                        className="font-mono text-sm"
                        style={{ color: item.color }}
                      >
                        {item.subtitle}
                      </p>
                      <span
                        className="px-2 py-1 text-xs font-mono rounded inline-block"
                        style={{
                          background: item.color + "22",
                          color: item.color,
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-muted text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-8"
        >
          <h3 className="font-[family-name:var(--font-gaming)] text-2xl text-white mb-2">
            Certifications
          </h3>
          <p className="text-muted font-mono text-sm">
            Professional credentials and completed courses
          </p>
        </motion.div>

        {/* Certification Badges */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="cert-badge opacity-0"
            >
              <div
                className="px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg hover:scale-105 transition-transform duration-300 cursor-default"
                style={{ borderColor: cert.color + "44" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: cert.color }}
                  />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {cert.name}
                    </p>
                    <p
                      className="text-xs font-mono"
                      style={{ color: cert.color }}
                    >
                      {cert.provider}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 md:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-12 max-w-2xl mx-auto"
        >
          {[
            { value: "8+", label: "Certifications", color: "#00f3ff" },
            { value: "1", label: "Book Chapter", color: "#ffd700" },
            { value: "Grand", label: "SIH Finalist", color: "#00ff88" },
            { value: "2+", label: "Leadership Roles", color: "#bd00ff" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-[family-name:var(--font-gaming)] text-2xl sm:text-3xl md:text-4xl mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-muted text-[10px] sm:text-xs font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
