"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";

interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  role: string;
  details: string[];
  status: "ACTIVE" | "COMPLETED" | "ACHIEVEMENT";
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "sakec-president",
    period: "2024-Present",
    title: "SAKEC Research Cell",
    role: "President",
    details: [
      "Managing Senior Projects Team",
      "Team Administration & Mentorship",
      "Research Publication Guidance",
      "Organizing Technical Workshops",
    ],
    status: "ACTIVE",
    color: "#00f3ff",
  },
  {
    id: "sakec-council",
    period: "2024-Present",
    title: "SAKEC Student Council",
    role: "Web & App Secretary",
    details: [
      "Managing Digital Presence",
      "Technical Initiative Leadership",
      "Website & App Development",
    ],
    status: "ACTIVE",
    color: "#bd00ff",
  },
  {
    id: "cybranex",
    period: "Oct 2023 → Mar 2024",
    title: "CybraneX",
    role: "ML Engineer Intern",
    details: [
      "Stripe Payment Gateway (Django)",
      "TrOCR Deployment (Azure)",
      "Quantum ML Module Development",
      "Pipeline Optimization",
    ],
    status: "COMPLETED",
    color: "#00ff88",
  },
  {
    id: "sih",
    period: "Dec 2023",
    title: "Smart India Hackathon",
    role: "Team Lead",
    details: [
      "GRAND FINALIST Achievement",
      "National Level Competition",
      "Real-time CV Solution",
    ],
    status: "ACHIEVEMENT",
    color: "#ffd700",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const hasAnimated = useRef(false);

  // Generate all terminal lines
  const generateLines = () => {
    const lines: { text: string; color: string; delay: number }[] = [];
    let delay = 0;

    lines.push({ text: "$ cat /var/log/experience.log", color: "#00ff88", delay: delay });
    delay += 300;
    lines.push({ text: "", color: "", delay: delay });
    delay += 100;
    lines.push({ text: "┌─ EXECUTION LOGS ────────────────────────────────────────┐", color: "#4a4a4a", delay: delay });
    delay += 200;
    lines.push({ text: "│", color: "#4a4a4a", delay: delay });
    delay += 100;

    experiences.forEach((exp) => {
      lines.push({ 
        text: `│ [${exp.period}] ${exp.title}`, 
        color: exp.color, 
        delay: delay 
      });
      delay += 150;
      
      lines.push({ 
        text: `│ ├─ Role: ${exp.role}`, 
        color: "#bd00ff", 
        delay: delay 
      });
      delay += 100;

      exp.details.forEach((detail, i) => {
        const prefix = i === exp.details.length - 1 ? "└─" : "├─";
        lines.push({ 
          text: `│ │  ${prefix} ${detail}`, 
          color: "#e8e8e8", 
          delay: delay 
        });
        delay += 80;
      });

      lines.push({ 
        text: `│ └─ Status: ${exp.status}`, 
        color: exp.status === "ACTIVE" ? "#00ff88" : exp.status === "ACHIEVEMENT" ? "#ffd700" : "#00f3ff", 
        delay: delay 
      });
      delay += 150;
      
      lines.push({ text: "│", color: "#4a4a4a", delay: delay });
      delay += 100;
    });

    lines.push({ text: "└──────────────────────────────────────────────────────────┘", color: "#4a4a4a", delay: delay });
    delay += 200;
    lines.push({ text: "", color: "", delay: delay });
    lines.push({ text: "$ _", color: "#00ff88", delay: delay + 100 });

    return lines;
  };

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional for animation trigger
      setIsTyping(true);

      const lines = generateLines();
      
      lines.forEach((line, index) => {
        setTimeout(() => {
          setDisplayedLines(prev => [...prev, line.text]);
          
          // Scroll terminal to bottom
          if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
          }

          // Animate the new line with anime.js
          anime({
            targets: `.terminal-line-${index}`,
            opacity: [0, 1],
            translateX: [-10, 0],
            duration: 300,
            easing: "easeOutQuad",
          });

          if (index === lines.length - 1) {
            setIsTyping(false);
          }
        }, line.delay);
      });
    }
  }, [isInView]);

  const getLineColor = (index: number) => {
    const lines = generateLines();
    return lines[index]?.color || "#e8e8e8";
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void to-void/95" />

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
              Execution.logs
            </span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-cyan via-purple to-matrix bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Terminal Header */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-t-xl px-4 py-3 flex items-center gap-3 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs font-mono text-muted">
                experience_timeline.sh — bash — 80×24
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="bg-black/80 backdrop-blur-sm rounded-b-xl p-6 font-mono text-sm border border-t-0 border-cyan/20 min-h-[400px] max-h-[500px] overflow-y-auto"
            style={{ scrollBehavior: "smooth" }}
          >
            {displayedLines.map((line, index) => (
              <div
                key={index}
                className={`terminal-line-${index} whitespace-pre opacity-0`}
                style={{ 
                  color: getLineColor(index),
                  minHeight: line === "" ? "1em" : "auto",
                }}
              >
                {line}
              </div>
            ))}
            
            {/* Blinking cursor */}
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-cyan animate-pulse ml-1" />
            )}
          </div>
        </motion.div>

        {/* Experience Cards (Mobile/Visual Alternative) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="group"
            >
              <div
                className="p-6 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl hover:border-opacity-50 transition-all duration-300"
                style={{ borderColor: exp.color + "33" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="text-xs font-mono"
                      style={{ color: exp.color }}
                    >
                      {exp.period}
                    </span>
                    <h3 className="font-[family-name:var(--font-gaming)] text-white text-lg mt-1">
                      {exp.title}
                    </h3>
                    <p className="text-purple text-sm font-mono mt-1">
                      {exp.role}
                    </p>
                  </div>
                  <span
                    className="px-2 py-1 text-xs font-mono rounded shrink-0"
                    style={{
                      background: exp.color + "22",
                      color: exp.color,
                    }}
                  >
                    {exp.status}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {exp.details.slice(0, 3).map((detail, i) => (
                    <li key={i} className="text-muted text-sm flex items-start gap-2">
                      <span style={{ color: exp.color }}>▸</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
