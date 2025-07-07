"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  variant?: "circuit" | "data" | "matrix";
  size?: "sm" | "md" | "lg";
  color?: "blue" | "maize" | "white";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  variant = "circuit",
  size = "md",
  color = "blue",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  };

  const colorSchemes = {
    blue: "#3399FF",
    maize: "#FFCB05",
    white: "#F8FAFB",
  };

  const selectedColor = colorSchemes[color];

  if (variant === "circuit") {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 50 50" className="w-full h-full">
          {/* Outer ring */}
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={selectedColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="31.416"
            animate={{
              strokeDashoffset: [31.416, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner circuit pattern */}
          <motion.g
            animate={{ rotate: [0, -360] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <line
              x1="25"
              y1="5"
              x2="25"
              y2="15"
              stroke={selectedColor}
              strokeWidth="1"
            />
            <line
              x1="45"
              y1="25"
              x2="35"
              y2="25"
              stroke={selectedColor}
              strokeWidth="1"
            />
            <line
              x1="25"
              y1="45"
              x2="25"
              y2="35"
              stroke={selectedColor}
              strokeWidth="1"
            />
            <line
              x1="5"
              y1="25"
              x2="15"
              y2="25"
              stroke={selectedColor}
              strokeWidth="1"
            />

            <circle cx="25" cy="10" r="2" fill={selectedColor} />
            <circle cx="40" cy="25" r="2" fill={selectedColor} />
            <circle cx="25" cy="40" r="2" fill={selectedColor} />
            <circle cx="10" cy="25" r="2" fill={selectedColor} />
          </motion.g>

          {/* Center core */}
          <motion.circle
            cx="25"
            cy="25"
            r="3"
            fill={selectedColor}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "data") {
    return (
      <div
        className={`${sizeClasses[size]} relative flex items-center justify-center`}
      >
        <div className="relative">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: selectedColor,
                left: `${i * 8 - 8}px`,
                top: "0px",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "matrix") {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 40 40" className="w-full h-full">
          {[...Array(8)].map((_, i) => (
            <motion.rect
              key={i}
              x={4 + (i % 4) * 8}
              y={4 + Math.floor(i / 4) * 8}
              width="6"
              height="6"
              fill={selectedColor}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>
    );
  }

  return null;
};

// Enhanced typing animation component
export const TypingIndicator: React.FC<{ color?: string }> = ({
  color = "#3399FF",
}) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            y: [0, -4, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Code compilation animation
export const CodeCompiling: React.FC<{ isActive?: boolean }> = ({
  isActive = true,
}) => {
  if (!isActive) return null;

  return (
    <div className="flex items-center gap-2 font-tech text-xs text-cyber-white/60">
      <motion.div
        className="w-2 h-2 border border-neon-blue rounded-full"
        animate={{
          rotate: [0, 360],
          borderColor: ["#3399FF", "#FFCB05", "#3399FF"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.span
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Compiling...
      </motion.span>
    </div>
  );
};

export default LoadingSpinner;
