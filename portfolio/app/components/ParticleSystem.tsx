"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: "circuit" | "data" | "node";
}

const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));

      for (let i = 0; i < particleCount; i++) {
        const types: Particle["type"][] = ["circuit", "data", "node"];
        const colors = ["#3399FF", "#FFCB05", "#F8FAFB"];

        particlesRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    };

    initParticles();

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= dx * force * 0.01;
          particle.y -= dy * force * 0.01;
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        if (particle.type === "circuit") {
          // Draw circuit-like squares
          ctx.fillStyle = particle.color;
          ctx.fillRect(
            particle.x - particle.size / 2,
            particle.y - particle.size / 2,
            particle.size,
            particle.size
          );

          // Add a subtle glow
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 10;
          ctx.fillRect(
            particle.x - particle.size / 2,
            particle.y - particle.size / 2,
            particle.size,
            particle.size
          );
        } else if (particle.type === "data") {
          // Draw data dots
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === "node") {
          // Draw diamond shapes
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - particle.size);
          ctx.lineTo(particle.x + particle.size, particle.y);
          ctx.lineTo(particle.x, particle.y + particle.size);
          ctx.lineTo(particle.x - particle.size, particle.y);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      // Draw connections between nearby particles
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = "#3399FF";
      ctx.lineWidth = 0.5;

      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120;
            ctx.globalAlpha = opacity * 0.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after component is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          animate();
        } else if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 2 }}
      style={{
        background: "transparent",
      }}
    />
  );
};

export default ParticleSystem;
