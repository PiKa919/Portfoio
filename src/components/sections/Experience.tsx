"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

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
  const [lineColors, setLineColors] = useState<string[]>([]);
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
      setIsTyping(true);

      const lines = generateLines();

      lines.forEach((line, index) => {
        setTimeout(() => {
          setDisplayedLines(prev => [...prev, line.text]);
          setLineColors(prev => [...prev, line.color]);

          // Scroll terminal to bottom
          if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
          }

          if (index === lines.length - 1) {
            setIsTyping(false);
          }
        }, line.delay);
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-16 md:py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void to-void/95" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 w-full"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan" />
            <span className="text-cyan font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              Execution.logs
            </span>
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-cyan via-purple to-matrix bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Terminal Window - Hidden on mobile, visible on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden sm:block w-full max-w-4xl mb-8 md:mb-12"
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
            className="bg-black/90 backdrop-blur-sm rounded-b-xl p-4 md:p-6 font-mono text-xs md:text-sm border border-t-0 border-cyan/20 min-h-[300px] max-h-[400px] overflow-y-auto text-left"
            style={{ scrollBehavior: "smooth" }}
          >
            {displayedLines.map((line, index) => (
              <div
                key={index}
                className="whitespace-pre-wrap break-words leading-relaxed"
                style={{
                  color: lineColors[index] || "#e8e8e8",
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

        {/* Experience Cards */}
        <div className="sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div
                className="h-full p-4 md:p-6 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl hover:border-opacity-50 transition-all duration-300 text-center flex flex-col items-center"
                style={{ borderColor: exp.color + "33" }}
              >
                <div className="flex flex-col items-center gap-2 w-full mb-4">
                  <span
                    className="text-xs font-mono"
                    style={{ color: exp.color }}
                  >
                    {exp.period}
                  </span>
                  <h3 className="font-[family-name:var(--font-gaming)] text-white text-base md:text-lg mt-1">
                    {exp.title}
                  </h3>
                  <p className="text-purple text-sm font-mono mt-1">
                    {exp.role}
                  </p>
                  <span
                    className="px-2 py-1 text-[10px] md:text-xs font-mono rounded inline-block mt-2"
                    style={{
                      background: exp.color + "22",
                      color: exp.color,
                    }}
                  >
                    {exp.status}
                  </span>
                </div>

                <ul className="space-y-2 w-full">
                  {exp.details.slice(0, 3).map((detail, i) => (
                    <li key={i} className="text-muted text-xs md:text-sm flex items-center justify-center gap-2">
                      <span className="shrink-0" style={{ color: exp.color }}>▸</span>
                      <span className="break-words">{detail}</span>
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
