"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";

// Skill categories with terminal-style display
const skillCategories = [
  {
    id: "neural-core",
    name: "Neural Core",
    icon: "⚡",
    color: "#00f3ff",
    skills: [
      { name: "Python", level: 95 },
      { name: "Julia", level: 70 },
      { name: "SQL", level: 85 },
      { name: "JavaScript", level: 80 },
    ],
  },
  {
    id: "deep-learning",
    name: "Deep Learning",
    icon: "🧠",
    color: "#bd00ff",
    skills: [
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 88 },
      { name: "Keras", level: 92 },
      { name: "Scikit-learn", level: 88 },
    ],
  },
  {
    id: "computer-vision",
    name: "Computer Vision",
    icon: "👁️",
    color: "#00ff88",
    skills: [
      { name: "OpenCV", level: 93 },
      { name: "YOLOv8", level: 88 },
      { name: "ResNet", level: 85 },
      { name: "EfficientNet", level: 87 },
    ],
  },
  {
    id: "mlops",
    name: "MLOps & Cloud",
    icon: "☁️",
    color: "#ff6b35",
    skills: [
      { name: "Docker", level: 82 },
      { name: "Google Cloud", level: 78 },
      { name: "Azure", level: 75 },
      { name: "Git", level: 90 },
    ],
  },
  {
    id: "visualization",
    name: "Visualization",
    icon: "📊",
    color: "#ffd700",
    skills: [
      { name: "Streamlit", level: 88 },
      { name: "Plotly", level: 85 },
      { name: "Tableau", level: 80 },
      { name: "PowerBI", level: 75 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const hasAnimated = useRef(false);

  // Terminal typing animation with anime.js
  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      // Animate the section entrance
      anime({
        targets: ".skill-hex",
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(100, { from: "center" }),
        duration: 800,
        easing: "easeOutElastic(1, .5)",
      });

      // Animate terminal boot sequence
      const bootSequence = [
        "> Initializing Skills Matrix...",
        "> Loading neural_core.config",
        "> Calibrating proficiency levels...",
        "> System ready. Select category.",
      ];

      bootSequence.forEach((line, index) => {
        setTimeout(() => {
          setTerminalLines((prev) => [...prev, line]);
        }, index * 400);
      });
    }
  }, [isInView]);

  // Animate skill bars when category changes
  useEffect(() => {
    if (isInView) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional for animation trigger
      setIsTyping(true);
      
      // Animate skill progress bars
      anime({
        targets: ".skill-progress-fill",
        width: (el: HTMLElement) => el.dataset.level + "%",
        duration: 1200,
        delay: anime.stagger(100),
        easing: "easeOutExpo",
      });

      // Animate skill values counting up
      anime({
        targets: ".skill-value",
        innerHTML: (el: HTMLElement) => [0, parseInt(el.dataset.level || "0")],
        round: 1,
        duration: 1200,
        delay: anime.stagger(100),
        easing: "easeOutExpo",
      });

      // Terminal output for category change
      const category = skillCategories[activeCategory];
      const newLines = [
        `> cat /skills/${category.id}`,
        `  Loading ${category.name}...`,
        `  Found ${category.skills.length} modules`,
      ];

      setTerminalLines((prev) => [...prev.slice(-4), ...newLines]);
      
      setTimeout(() => setIsTyping(false), 1500);
    }
  }, [activeCategory, isInView]);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #00f3ff 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #bd00ff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan" />
            <span className="text-cyan font-mono text-sm tracking-[0.3em] uppercase">
              System.hyperparameters
            </span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-cyan via-purple to-matrix bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left: Hexagonal Category Selector */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative">
              {/* Hexagonal buttons arranged in a pattern */}
              <div className="grid grid-cols-2 gap-4">
                {skillCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => setActiveCategory(index)}
                    className={`skill-hex relative group ${index === 2 ? "col-span-2 justify-self-center" : ""}`}
                  >
                    <div
                      className={`
                        relative w-28 h-28 flex flex-col items-center justify-center
                        transition-all duration-300 cursor-pointer
                        ${activeCategory === index 
                          ? "scale-110" 
                          : "hover:scale-105 opacity-70 hover:opacity-100"
                        }
                      `}
                      style={{
                        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        background: activeCategory === index 
                          ? `linear-gradient(135deg, ${category.color}33, ${category.color}11)`
                          : "rgba(255,255,255,0.03)",
                        border: `2px solid ${activeCategory === index ? category.color : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      <span className="text-3xl mb-1">{category.icon}</span>
                      <span 
                        className="text-xs font-[family-name:var(--font-gaming)] tracking-wider text-center px-2"
                        style={{ color: activeCategory === index ? category.color : "#888" }}
                      >
                        {category.name.split(" ")[0]}
                      </span>
                      
                      {/* Glow effect when active */}
                      {activeCategory === index && (
                        <div
                          className="absolute inset-0 animate-pulse"
                          style={{
                            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                            background: `radial-gradient(circle, ${category.color}22, transparent)`,
                            filter: `drop-shadow(0 0 20px ${category.color})`,
                          }}
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Skills Display */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6"
              style={{
                borderColor: skillCategories[activeCategory].color + "33",
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <span className="text-4xl">{skillCategories[activeCategory].icon}</span>
                <div>
                  <h3 
                    className="font-[family-name:var(--font-gaming)] text-xl tracking-wide"
                    style={{ color: skillCategories[activeCategory].color }}
                  >
                    {skillCategories[activeCategory].name}
                  </h3>
                  <p className="text-muted text-sm font-mono">
                    {skillCategories[activeCategory].skills.length} modules loaded
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {skillCategories[activeCategory].skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-white/90 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span 
                        className="skill-value font-[family-name:var(--font-gaming)] text-sm"
                        data-level={skill.level}
                        style={{ color: skillCategories[activeCategory].color }}
                      >
                        0
                      </span>
                    </div>
                    <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="skill-progress-fill absolute inset-y-0 left-0 rounded-full"
                        data-level={skill.level}
                        style={{
                          width: 0,
                          background: `linear-gradient(90deg, ${skillCategories[activeCategory].color}, ${skillCategories[activeCategory].color}88)`,
                          boxShadow: `0 0 10px ${skillCategories[activeCategory].color}66`,
                        }}
                      />
                      {/* Animated scan line */}
                      <div 
                        className="absolute inset-y-0 w-8 animate-pulse"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${skillCategories[activeCategory].color}44, transparent)`,
                          animation: "scan 2s ease-in-out infinite",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Terminal Output */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-black/60 backdrop-blur-sm border border-cyan/20 rounded-lg overflow-hidden h-full"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-cyan/20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-muted ml-2">skills.terminal</span>
              </div>

              {/* Terminal Content */}
              <div 
                ref={terminalRef}
                className="p-4 h-64 overflow-y-auto font-mono text-sm"
                style={{ scrollBehavior: "smooth" }}
              >
                {terminalLines.map((line, index) => (
                  <div 
                    key={index}
                    className={`mb-1 ${line.startsWith(">") ? "text-cyan" : "text-muted"}`}
                  >
                    {line}
                  </div>
                ))}
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-cyan animate-pulse" />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { label: "Languages", value: "4+", color: "#00f3ff" },
            { label: "Frameworks", value: "10+", color: "#bd00ff" },
            { label: "Tools", value: "15+", color: "#00ff88" },
            { label: "Years Coding", value: "4+", color: "#ffd700" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <div 
                className="font-[family-name:var(--font-gaming)] text-4xl mb-1 transition-all duration-300 group-hover:scale-110"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-muted text-xs font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(400%); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
