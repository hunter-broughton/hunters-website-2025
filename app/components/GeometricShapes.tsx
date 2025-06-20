"use client";

import React from "react";
import { motion } from "framer-motion";

interface GeometricShapeProps {
  variant?: "hexagon" | "circuit" | "diamond" | "triangle" | "nodes";
  size?: "sm" | "md" | "lg" | "xl";
  color?: "blue" | "maize" | "white" | "mixed";
  opacity?: number;
  className?: string;
  animated?: boolean;
}

const GeometricShape: React.FC<GeometricShapeProps> = ({
  variant = "hexagon",
  size = "md",
  color = "blue",
  opacity = 0.6,
  className = "",
  animated = true,
}) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  const colorSchemes = {
    blue: "#3399FF",
    maize: "#FFCB05",
    white: "#F8FAFB",
    mixed: "url(#mixedGradient)",
  };

  const renderShape = () => {
    const baseColor = colorSchemes[color];

    switch (variant) {
      case "hexagon":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id="mixedGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3399FF" stopOpacity={opacity} />
                <stop offset="50%" stopColor="#FFCB05" stopOpacity={opacity} />
                <stop offset="100%" stopColor="#F8FAFB" stopOpacity={opacity} />
              </linearGradient>
            </defs>
            <polygon
              points="50,5 85,25 85,75 50,95 15,75 15,25"
              fill="none"
              stroke={baseColor}
              strokeWidth="1.5"
              opacity={opacity}
            />
            <polygon
              points="50,15 75,30 75,70 50,85 25,70 25,30"
              fill="none"
              stroke={baseColor}
              strokeWidth="1"
              opacity={opacity * 0.6}
            />
          </svg>
        );

      case "circuit":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id="mixedGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3399FF" stopOpacity={opacity} />
                <stop offset="50%" stopColor="#FFCB05" stopOpacity={opacity} />
                <stop offset="100%" stopColor="#F8FAFB" stopOpacity={opacity} />
              </linearGradient>
            </defs>
            {/* Circuit board pattern */}
            <g stroke={baseColor} strokeWidth="1" fill="none" opacity={opacity}>
              <path d="M10 20 L30 20 L35 25 L35 35 L30 40 L50 40 L55 45 L55 55 L50 60 L70 60 L75 65 L75 75 L70 80 L90 80" />
              <path d="M20 10 L20 30 M40 30 L40 50 M60 50 L60 70 M80 70 L80 90" />
              <circle cx="30" cy="20" r="2" fill={baseColor} />
              <circle cx="35" cy="35" r="2" fill={baseColor} />
              <circle cx="55" cy="55" r="2" fill={baseColor} />
              <circle cx="75" cy="75" r="2" fill={baseColor} />
              <rect x="18" y="18" width="4" height="4" fill={baseColor} />
              <rect x="53" y="53" width="4" height="4" fill={baseColor} />
            </g>
          </svg>
        );

      case "diamond":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id="mixedGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3399FF" stopOpacity={opacity} />
                <stop offset="50%" stopColor="#FFCB05" stopOpacity={opacity} />
                <stop offset="100%" stopColor="#F8FAFB" stopOpacity={opacity} />
              </linearGradient>
            </defs>
            <g opacity={opacity}>
              <polygon
                points="50,10 80,50 50,90 20,50"
                fill="none"
                stroke={baseColor}
                strokeWidth="1.5"
              />
              <polygon
                points="50,25 65,50 50,75 35,50"
                fill="none"
                stroke={baseColor}
                strokeWidth="1"
                opacity="0.6"
              />
              <circle cx="50" cy="50" r="3" fill={baseColor} />
            </g>
          </svg>
        );

      case "triangle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id="mixedGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3399FF" stopOpacity={opacity} />
                <stop offset="50%" stopColor="#FFCB05" stopOpacity={opacity} />
                <stop offset="100%" stopColor="#F8FAFB" stopOpacity={opacity} />
              </linearGradient>
            </defs>
            <g opacity={opacity}>
              <polygon
                points="50,10 85,80 15,80"
                fill="none"
                stroke={baseColor}
                strokeWidth="1.5"
              />
              <polygon
                points="50,25 70,70 30,70"
                fill="none"
                stroke={baseColor}
                strokeWidth="1"
                opacity="0.6"
              />
              <line
                x1="50"
                y1="10"
                x2="50"
                y2="80"
                stroke={baseColor}
                strokeWidth="0.5"
              />
              <line
                x1="15"
                y1="80"
                x2="85"
                y2="80"
                stroke={baseColor}
                strokeWidth="0.5"
              />
            </g>
          </svg>
        );

      case "nodes":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id="mixedGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3399FF" stopOpacity={opacity} />
                <stop offset="50%" stopColor="#FFCB05" stopOpacity={opacity} />
                <stop offset="100%" stopColor="#F8FAFB" stopOpacity={opacity} />
              </linearGradient>
            </defs>
            <g opacity={opacity}>
              {/* Connection lines */}
              <g stroke={baseColor} strokeWidth="0.5" fill="none">
                <line x1="20" y1="20" x2="50" y2="30" />
                <line x1="50" y1="30" x2="80" y2="20" />
                <line x1="20" y1="20" x2="30" y2="50" />
                <line x1="80" y1="20" x2="70" y2="50" />
                <line x1="30" y1="50" x2="50" y2="70" />
                <line x1="70" y1="50" x2="50" y2="70" />
                <line x1="30" y1="50" x2="70" y2="50" />
                <line x1="50" y1="30" x2="50" y2="70" />
              </g>
              {/* Nodes */}
              <g fill={baseColor}>
                <circle cx="20" cy="20" r="2" />
                <circle cx="50" cy="30" r="2.5" />
                <circle cx="80" cy="20" r="2" />
                <circle cx="30" cy="50" r="2" />
                <circle cx="70" cy="50" r="2" />
                <circle cx="50" cy="70" r="2.5" />
              </g>
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  const animationVariants = {
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [opacity, opacity * 1.2, opacity],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const getRandomAnimation = () => {
    const animations = ["rotate", "float", "pulse"];
    return animations[Math.floor(Math.random() * animations.length)];
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      variants={animationVariants}
      animate={animated ? getRandomAnimation() : undefined}
    >
      {renderShape()}
    </motion.div>
  );
};

// Component for creating multiple scattered shapes
interface GeometricBackgroundProps {
  density?: "low" | "medium" | "high";
  className?: string;
}

export const GeometricBackground: React.FC<GeometricBackgroundProps> = ({
  density = "medium",
  className = "",
}) => {
  const densityMap = {
    low: 8,
    medium: 12,
    high: 18,
  };

  const shapeCount = densityMap[density];
  const shapes = [
    "hexagon",
    "circuit",
    "diamond",
    "triangle",
    "nodes",
  ] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const colors = ["blue", "maize", "white"] as const;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {Array.from({ length: shapeCount }).map((_, i) => {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomOpacity = 0.1 + Math.random() * 0.3;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <GeometricShape
              variant={randomShape}
              size={randomSize}
              color={randomColor}
              opacity={randomOpacity}
              animated={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GeometricShape;
