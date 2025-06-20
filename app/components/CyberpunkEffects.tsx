"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DataStreamProps {
  direction?: "horizontal" | "vertical";
  speed?: "slow" | "medium" | "fast";
  density?: "low" | "medium" | "high";
  color?: string;
  className?: string;
}

const DataStream: React.FC<DataStreamProps> = ({
  direction = "vertical",
  speed = "medium",
  density = "medium",
  color = "#3399FF",
  className = "",
}) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
    }>
  >([]);

  const speedMap = {
    slow: 8000,
    medium: 5000,
    fast: 3000,
  };

  const densityMap = {
    low: 5,
    medium: 10,
    high: 15,
  };

  const duration = speedMap[speed];
  const particleCount = densityMap[density];

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: direction === "horizontal" ? 0 : Math.random() * 100,
      y: direction === "vertical" ? 0 : Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setParticles(newParticles);
  }, [direction, particleCount]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            opacity: particle.opacity,
          }}
          initial={{
            x: direction === "horizontal" ? "-10px" : `${particle.x}%`,
            y: direction === "vertical" ? "-10px" : `${particle.y}%`,
          }}
          animate={{
            x:
              direction === "horizontal"
                ? "calc(100vw + 10px)"
                : `${particle.x}%`,
            y:
              direction === "vertical"
                ? "calc(100vh + 10px)"
                : `${particle.y}%`,
            opacity: [
              particle.opacity,
              particle.opacity * 0.3,
              particle.opacity,
            ],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            delay: index * (duration / 1000 / particleCount),
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Cyberpunk grid overlay
export const CyberGrid: React.FC<{
  intensity?: number;
  animated?: boolean;
}> = ({ intensity = 0.1, animated = true }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(51, 153, 255, ${intensity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(51, 153, 255, ${intensity}) 1px, transparent 1px),
            linear-gradient(rgba(255, 203, 5, ${
              intensity * 0.5
            }) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 203, 5, ${
              intensity * 0.5
            }) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px, 50px 50px, 100px 100px, 100px 100px",
        }}
        animate={
          animated
            ? {
                backgroundPosition: [
                  "0px 0px, 0px 0px, 0px 0px, 0px 0px",
                  "50px 50px, 50px 50px, 100px 100px, 100px 100px",
                ],
              }
            : undefined
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Enhanced holographic text effect
export const HolographicText: React.FC<{
  children: React.ReactNode;
  className?: string;
  glitchOnHover?: boolean;
}> = ({ children, className = "", glitchOnHover = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main text */}
      <motion.div
        className="relative z-10"
        animate={
          isHovered && glitchOnHover
            ? {
                textShadow: [
                  "0 0 5px rgba(51, 153, 255, 0.5)",
                  "0 0 10px rgba(51, 153, 255, 0.8), 0 0 20px rgba(255, 203, 5, 0.3)",
                  "0 0 5px rgba(51, 153, 255, 0.5)",
                ],
              }
            : {
                textShadow: "none",
              }
        }
        transition={{
          duration: isHovered && glitchOnHover ? 2 : 0.3,
          ease: "easeInOut",
          repeat: isHovered && glitchOnHover ? Infinity : 0,
        }}
      >
        {children}
      </motion.div>

      {/* Holographic layers */}
      <AnimatePresence>
        {isHovered && glitchOnHover && (
          <>
            {/* Soft outer glow */}
            <motion.div
              className="absolute inset-0 text-neon-blue blur-lg opacity-30"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: [0, 0.4, 0.2, 0.4, 0.2],
                scale: [1, 1.05, 1.02, 1.05, 1.02],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {children}
            </motion.div>

            {/* Inner glow */}
            <motion.div
              className="absolute inset-0 text-neon-blue blur-sm"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.6, 0.3, 0.6, 0.3],
                scale: [1, 1.02, 1, 1.02, 1],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {children}
            </motion.div>

            {/* Holographic shimmer overlay */}
            <motion.div
              className="absolute inset-0 text-michigan-maize opacity-25"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 0.3, 0.1, 0.3, 0.1],
                x: [0, 1, -0.5, 1, -0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.2,
              }}
            >
              {children}
            </motion.div>

            {/* Cyberpunk scan line */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-80"
                initial={{ top: "100%" }}
                animate={{ top: ["-5%", "105%"] }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </motion.div>

            {/* Holographic data fragments */}
            <motion.div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-michigan-maize opacity-60"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    y: [0, -10, -20],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.4,
                    repeat: Infinity,
                    repeatDelay: 4,
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Scanning line effect
export const ScanLine: React.FC<{
  direction?: "horizontal" | "vertical";
  color?: string;
  duration?: number;
}> = ({ direction = "vertical", color = "#3399FF", duration = 3 }) => {
  return (
    <motion.div
      className="absolute z-10 pointer-events-none"
      style={{
        background: `linear-gradient(${
          direction === "vertical" ? "90deg" : "0deg"
        }, 
          transparent 0%, 
          ${color}40 45%, 
          ${color}80 50%, 
          ${color}40 55%, 
          transparent 100%)`,
        width: direction === "vertical" ? "100%" : "2px",
        height: direction === "horizontal" ? "100%" : "2px",
      }}
      animate={{
        [direction === "vertical" ? "y" : "x"]: ["-100%", "100%"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 2,
      }}
    />
  );
};

export default DataStream;
