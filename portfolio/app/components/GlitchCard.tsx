"use client";

import React, { useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface GlitchCardProps {
  children: React.ReactNode;
  className?: string;
  glitchIntensity?: "low" | "medium" | "high";
}

const GlitchCard: React.FC<GlitchCardProps> = ({
  children,
  className = "",
  glitchIntensity = "medium",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { stiffness: 200, damping: 30 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    setMousePosition({ x: mouseX, y: mouseY });
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const glitchKeyframes = {
    low: {
      "0%": { transform: "translate(0)" },
      "20%": { transform: "translate(-1px, 1px)" },
      "40%": { transform: "translate(-1px, -1px)" },
      "60%": { transform: "translate(1px, 1px)" },
      "80%": { transform: "translate(1px, -1px)" },
      "100%": { transform: "translate(0)" },
    },
    medium: {
      "0%": { transform: "translate(0)" },
      "10%": { transform: "translate(-2px, -2px)" },
      "20%": { transform: "translate(2px, -2px)" },
      "30%": { transform: "translate(-2px, 2px)" },
      "40%": { transform: "translate(2px, 2px)" },
      "50%": { transform: "translate(-2px, -2px)" },
      "60%": { transform: "translate(2px, -2px)" },
      "70%": { transform: "translate(-2px, 2px)" },
      "80%": { transform: "translate(-2px, -2px)" },
      "90%": { transform: "translate(2px, 2px)" },
      "100%": { transform: "translate(0)" },
    },
    high: {
      "0%": { transform: "translate(0)" },
      "10%": { transform: "translate(-4px, -4px)" },
      "20%": { transform: "translate(4px, -4px)" },
      "30%": { transform: "translate(-4px, 4px)" },
      "40%": { transform: "translate(4px, 4px)" },
      "50%": { transform: "translate(-4px, -4px)" },
      "60%": { transform: "translate(4px, -4px)" },
      "70%": { transform: "translate(-4px, 4px)" },
      "80%": { transform: "translate(-4px, -4px)" },
      "90%": { transform: "translate(4px, 4px)" },
      "100%": { transform: "translate(0)" },
    },
  };

  return (
    <motion.div
      className={`relative group ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Main content */}
      <div className="relative z-10 h-full">{children}</div>

      {/* Holographic overlay */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, 
                rgba(51, 153, 255, 0.1) 0%, 
                transparent 25%, 
                rgba(255, 203, 5, 0.1) 50%, 
                transparent 75%, 
                rgba(51, 153, 255, 0.1) 100%)`
            : "transparent",
          opacity: isHovered ? 1 : 0,
        }}
        animate={{
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-michigan-maize opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 left-0 w-0.5 h-full bg-michigan-maize opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-0.5 bg-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-michigan-maize opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-michigan-maize opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Glitch effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        animate={isHovered ? glitchKeyframes[glitchIntensity] : {}}
        transition={{
          duration: 0.6,
          repeat: isHovered ? Infinity : 0,
          repeatType: "loop",
        }}
        style={{
          background:
            "linear-gradient(45deg, rgba(51, 153, 255, 0.1), rgba(255, 203, 5, 0.1))",
          opacity: isHovered ? 0.3 : 0,
          mixBlendMode: "overlay",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none -z-10"
        animate={{
          boxShadow: isHovered
            ? [
                "0 0 20px rgba(51, 153, 255, 0.3)",
                "0 0 40px rgba(255, 203, 5, 0.3)",
                "0 0 20px rgba(51, 153, 255, 0.3)",
              ]
            : "0 0 0px rgba(51, 153, 255, 0)",
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default GlitchCard;
