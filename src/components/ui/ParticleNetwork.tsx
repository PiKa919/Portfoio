'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface ParticleNetworkProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseRepelRadius?: number;
  particleColor?: string;
  lineColor?: string;
}

export default function ParticleNetwork({
  particleCount = 40,
  connectionDistance = 150,
  mouseRepelRadius = 100,
  particleColor = '#00f3ff',
  lineColor = 'rgba(0, 243, 255, 0.15)',
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };
    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse repulsion
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRepelRadius && dist > 0) {
          const force = (mouseRepelRadius - dist) / mouseRepelRadius;
          particle.vx += (dx / dist) * force * 0.5;
          particle.vy += (dy / dist) * force * 0.5;
        }

        // Apply velocity with damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const connDx = particle.x - other.x;
          const connDy = particle.y - other.y;
          const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

          if (connDist < connectionDistance) {
            const opacity = 1 - connDist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = lineColor.replace('0.15', (opacity * 0.15).toString());
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, connectionDistance, mouseRepelRadius, particleColor, lineColor]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}
