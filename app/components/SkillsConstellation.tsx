"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillNode {
  id: string;
  name: string;
  level: number;
  category: "language" | "framework" | "tool" | "concept";
  x: number;
  y: number;
  connections: string[];
  usedIn: {
    projects?: string[];
    jobs?: string[];
    classes?: string[];
  };
}

const SkillsConstellation = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to deselect skill
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedSkill(null);
        setHoveredSkill(null);
      }
    };

    // Only add listener if a skill is selected or hovered
    if (selectedSkill || hoveredSkill) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedSkill, hoveredSkill]);

  const skills: SkillNode[] = [
    // Languages - Top row
    {
      id: "js",
      name: "JavaScript",
      level: 95,
      category: "language",
      x: 12,
      y: 12,
      connections: ["react", "node", "express", "ts", "tailwind", "vue"],
      usedIn: {
        projects: ["ThriftSwipe", "GreekLink", "HTTPie Authentication"],
        jobs: ["Credo Semiconductor", "Vloggi"],
        classes: ["EECS 481"],
      },
    },
    {
      id: "python",
      name: "Python",
      level: 90,
      category: "language",
      x: 35,
      y: 8,
      connections: ["pytorch", "pandas", "fastapi", "pytest", "pyvisa"],
      usedIn: {
        projects: [
          "ThriftSwipe",
          "Chrome Dino Video Game",
          "S-Parameter Automation",
        ],
        jobs: ["Credo Semiconductor", "SparkRacing"],
        classes: ["EECS 492", "EECS 481", "EECS 298", "STATS 206"],
      },
    },
    {
      id: "ts",
      name: "TypeScript",
      level: 88,
      category: "language",
      x: 58,
      y: 12,
      connections: ["js", "react", "vue"],
      usedIn: {
        projects: ["ThriftSwipe", "GreekLink", "HTTPie Authentication"],
        jobs: ["Credo Semiconductor", "Vloggi"],
        classes: ["EECS 481"],
      },
    },
    {
      id: "cpp",
      name: "C++",
      level: 85,
      category: "language",
      x: 80,
      y: 8,
      connections: ["C", "embedded"],
      usedIn: {
        projects: [],
        jobs: ["Credo Semiconductor", "SparkRacing"],
        classes: ["EECS 281", "EECS 370"],
      },
    },

    // Languages - Second row
    {
      id: "C",
      name: "C",
      level: 80,
      category: "language",
      x: 12,
      y: 28,
      connections: ["cpp", "embedded"],
      usedIn: {
        projects: [],
        jobs: ["Credo Semiconductor", "SparkRacing"],
        classes: ["EECS 281", "EECS 370"],
      },
    },
    {
      id: "java",
      name: "Java",
      level: 80,
      category: "language",
      x: 35,
      y: 32,
      connections: [],
      usedIn: {
        projects: ["Searching Through a Grid"],
        jobs: [],
        classes: ["EECS 281"],
      },
    },
    {
      id: "vue",
      name: "Vue",
      level: 80,
      category: "framework",
      x: 58,
      y: 28,
      connections: ["js", "ts", "vuetify"],
      usedIn: {
        projects: [],
        jobs: ["Credo Semiconductor"],
        classes: [],
      },
    },
    {
      id: "pyvisa",
      name: "PyVISA",
      level: 70,
      category: "framework",
      x: 80,
      y: 32,
      connections: ["python"],
      usedIn: {
        projects: ["S-Parameter Automation"],
        jobs: ["Credo Semiconductor"],
        classes: [],
      },
    },

    // Frameworks - Third row
    {
      id: "react",
      name: "React",
      level: 92,
      category: "framework",
      x: 12,
      y: 48,
      connections: ["js", "ts", "tailwind"],
      usedIn: {
        projects: ["ThriftSwipe", "GreekLink", "HTTPie Authentication"],
        jobs: ["Credo Semiconductor", "Vloggi"],
        classes: ["EECS 481"],
      },
    },
    {
      id: "node",
      name: "Node.js",
      level: 87,
      category: "framework",
      x: 35,
      y: 52,
      connections: ["js", "ts", "express"],
      usedIn: {
        projects: ["ThriftSwipe", "GreekLink"],
        jobs: ["Credo Semiconductor", "Vloggi"],
        classes: [],
      },
    },
    {
      id: "express",
      name: "Express",
      level: 85,
      category: "framework",
      x: 58,
      y: 48,
      connections: ["node", "mongodb"],
      usedIn: {
        projects: ["ThriftSwipe"],
        jobs: ["Credo Semiconductor"],
        classes: [],
      },
    },
    {
      id: "pytorch",
      name: "PyTorch",
      level: 82,
      category: "framework",
      x: 80,
      y: 52,
      connections: ["python", "ai"],
      usedIn: {
        projects: [],
        jobs: [],
        classes: ["EECS 492", "EECS 298", "STATS 206"],
      },
    },

    // Tools & Others - Fourth row
    {
      id: "tailwind",
      name: "Tailwind",
      level: 90,
      category: "framework",
      x: 12,
      y: 68,
      connections: ["react"],
      usedIn: {
        projects: ["ThriftSwipe", "GreekLink"],
        jobs: ["Credo Semiconductor", "Vloggi"],
        classes: [],
      },
    },
    {
      id: "git",
      name: "Git",
      level: 88,
      category: "tool",
      x: 35,
      y: 72,
      connections: ["github"],
      usedIn: {
        projects: ["All Projects"],
        jobs: ["All Jobs"],
        classes: ["EECS 481"],
      },
    },
    {
      id: "mongodb",
      name: "MongoDB",
      level: 83,
      category: "tool",
      x: 58,
      y: 68,
      connections: ["express", "node"],
      usedIn: {
        projects: ["ThriftSwipe"],
        jobs: [],
        classes: [],
      },
    },
    {
      id: "pandas",
      name: "Pandas",
      level: 80,
      category: "tool",
      x: 80,
      y: 72,
      connections: ["python"],
      usedIn: {
        projects: ["S-Parameter Analysis"],
        jobs: ["Credo Semiconductor", "SparkRacing"],
        classes: ["Stats 206", "EECS 492", "EECS 298"],
      },
    },
    {
      id: "numpy",
      name: "NumPy",
      level: 75,
      category: "tool",
      x: 35,
      y: 85,
      connections: ["python", "pandas"],
      usedIn: {
        projects: [],
        jobs: ["SparkRacing"],
        classes: ["Stats 206"],
      },
    },

    // Additional skills - better mobile distribution
    {
      id: "fastapi",
      name: "FastAPI",
      level: 78,
      category: "framework",
      x: 92,
      y: 15,
      connections: ["python"],
      usedIn: {
        projects: [],
        jobs: ["Credo Semiconductor"],
        classes: [],
      },
    },
    {
      id: "vuetify",
      name: "Vuetify",
      level: 75,
      category: "framework",
      x: 92,
      y: 35,
      connections: ["vue"],
      usedIn: {
        projects: [],
        jobs: ["Credo Semiconductor"],
        classes: ["EECS 481"],
      },
    },
    {
      id: "pytest",
      name: "Pytest",
      level: 80,
      category: "framework",
      x: 92,
      y: 55,
      connections: ["python"],
      usedIn: {
        projects: ["S-Parameter Automation", "HTTPie Authentication"],
        jobs: ["Credo Semiconductor"],
        classes: ["EECS 481"],
      },
    },
    {
      id: "docker",
      name: "Docker",
      level: 75,
      category: "tool",
      x: 5,
      y: 15,
      connections: [],
      usedIn: {
        projects: [],
        jobs: ["Credo Semiconductor", "Vloggi"],
        classes: [],
      },
    },
    {
      id: "github",
      name: "GitHub",
      level: 85,
      category: "tool",
      x: 5,
      y: 35,
      connections: ["git"],
      usedIn: {
        projects: ["All Projects"],
        jobs: ["All Jobs"],
        classes: [],
      },
    },
    {
      id: "ai",
      name: "ML/AI",
      level: 78,
      category: "concept",
      x: 5,
      y: 55,
      connections: ["pytorch", "python"],
      usedIn: {
        projects: ["ThriftSwipe"],
        jobs: [],
        classes: ["EECS 492", "EECS 298"],
      },
    },
    {
      id: "embedded",
      name: "Embedded Systems",
      level: 75,
      category: "concept",
      x: 5,
      y: 75,
      connections: ["cpp", "C"],
      usedIn: {
        projects: [],
        jobs: ["Credo Semiconductor", "SparkRacing"],
        classes: [],
      },
    },
  ];

  const categoryColors = {
    language: "#3399FF",
    framework: "#FFCB05",
    tool: "#00FF94",
    concept: "#FF6B9D",
  };

  const getNodeDimensions = (skill: SkillNode) => {
    const textLength = skill.name.length;
    // Twice as large nodes for mobile, normal for desktop
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const baseWidth = isMobile
      ? Math.max(360, textLength * 30 + 100) // Doubled from 180 and 15
      : Math.max(140, textLength * 12 + 40);
    const baseHeight = isMobile ? 140 : 55; // Doubled from 70
    return {
      width: baseWidth,
      height: baseHeight,
      rx: 8,
    };
  };

  // Mobile-specific coordinates for better spacing on narrow screens
  const getMobileCoordinates = (skillId: string): { x: number; y: number } => {
    const mobileCoords: Record<string, { x: number; y: number }> = {
      // First column - Languages (spread out more vertically)
      js: { x: 15, y: 5 },
      python: { x: 15, y: 15 },
      ts: { x: 15, y: 25 },
      cpp: { x: 15, y: 35 },
      C: { x: 15, y: 45 },
      java: { x: 15, y: 55 },

      // Second column - Major Frameworks (better vertical distribution)
      react: { x: 50, y: 8 },
      node: { x: 50, y: 18 },
      express: { x: 50, y: 28 },
      vue: { x: 50, y: 38 },
      pytorch: { x: 50, y: 48 },
      fastapi: { x: 50, y: 58 },

      // Third column - Tools & Libraries (spread out)
      tailwind: { x: 85, y: 5 },
      git: { x: 85, y: 15 },
      mongodb: { x: 85, y: 25 },
      pandas: { x: 85, y: 35 },
      numpy: { x: 85, y: 45 },
      pyvisa: { x: 85, y: 55 },

      // Fourth row - Additional tools (more space)
      docker: { x: 15, y: 65 },
      github: { x: 50, y: 68 },
      vuetify: { x: 85, y: 65 },

      // Fifth row - Concepts (bottom)
      pytest: { x: 15, y: 75 },
      ai: { x: 50, y: 78 },
      embedded: { x: 85, y: 75 },
    };

    return mobileCoords[skillId] || { x: 50, y: 50 };
  };

  const getNodePosition = (skill: SkillNode) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (isMobile) {
      const mobileCoords = getMobileCoordinates(skill.id);
      return {
        x: (mobileCoords.x / 100) * 1200,
        y: (mobileCoords.y / 100) * 1200, // Use 1200 height for mobile viewBox
      };
    } else {
      // Use original desktop coordinates
      return {
        x: (skill.x / 100) * 1200,
        y: (skill.y / 100) * 1000,
      };
    }
  };

  const isConnected = (skill1: string, skill2: string) => {
    const s1 = skills.find((s) => s.id === skill1);
    const s2 = skills.find((s) => s.id === skill2);
    return s1?.connections.includes(skill2) || s2?.connections.includes(skill1);
  };

  const shouldHighlightConnection = (skill1: string, skill2: string) => {
    if (!hoveredSkill && !selectedSkill) return false;
    // Priority: hoveredSkill takes precedence over selectedSkill
    const targetSkill = hoveredSkill || selectedSkill;
    return (
      (skill1 === targetSkill || skill2 === targetSkill) &&
      isConnected(skill1, skill2)
    );
  };

  const shouldHighlightNode = (skillId: string) => {
    if (!hoveredSkill && !selectedSkill) return true;
    // Priority: hoveredSkill takes precedence over selectedSkill
    const targetSkill = hoveredSkill || selectedSkill;
    if (skillId === targetSkill) return true;
    return isConnected(skillId, targetSkill!);
  };

  return (
    <div className="w-full space-y-8" ref={containerRef}>
      {/* Main Skills Constellation Component - Full Section Size */}
      <div className="relative w-full min-h-[100vh] md:min-h-[80vh] bg-gradient-to-br from-cyber-black via-cyber-black/90 to-cyber-black/80 border border-neon-blue/30 rounded-lg overflow-hidden backdrop-blur-sm">
        <p className="text-cyber-white/70 font-tech text-sm md:text-lg text-center pt-5 md:pt-5 pb-6 md:pb-8 px-3 md:px-4">
          Hover or click nodes to explore my skills and their connections!
        </p>

        {/* Cyberpunk grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(51, 153, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(51, 153, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent animate-pulse"
            style={{
              top: "25%",
              animationDelay: "0s",
              animationDuration: "3s",
            }}
          />
          <div
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-michigan-maize/30 to-transparent animate-pulse"
            style={{
              top: "65%",
              animationDelay: "1.5s",
              animationDuration: "4s",
            }}
          />
        </div>

        {/* Skill Usage Indicator */}
        <AnimatePresence>
          {(hoveredSkill || selectedSkill) && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className={`absolute ${(() => {
                const skill = skills.find(
                  (s) => s.id === (hoveredSkill || selectedSkill)
                );
                if (!skill) return "top-1 left-1 right-1";

                const isMobile =
                  typeof window !== "undefined" && window.innerWidth < 768;

                if (isMobile) {
                  // On mobile, always position at top to avoid node overlap
                  return "top-2 left-2 right-2";
                } else {
                  // Desktop positioning - more sophisticated logic to avoid all nodes
                  const { x, y } = skill;

                  // Divide screen into quadrants and position tooltip opposite to node
                  if (x <= 50 && y <= 50) {
                    // Top-left quadrant: position tooltip bottom-right
                    return "bottom-4 right-4 max-w-sm";
                  } else if (x > 50 && y <= 50) {
                    // Top-right quadrant: position tooltip bottom-left
                    return "bottom-4 left-4 max-w-sm";
                  } else if (x <= 50 && y > 50) {
                    // Bottom-left quadrant: position tooltip top-right
                    return "top-4 right-4 max-w-sm";
                  } else {
                    // Bottom-right quadrant: position tooltip top-left
                    return "top-4 left-4 max-w-sm";
                  }
                }
              })()} bg-cyber-black/95 border border-neon-blue/50 rounded-lg p-3 md:p-4 backdrop-blur-sm z-20 text-xs md:text-sm`}
            >
              {(() => {
                // Priority: hoveredSkill takes precedence over selectedSkill
                const skill = skills.find(
                  (s) => s.id === (hoveredSkill || selectedSkill)
                );
                if (!skill) return null;

                return (
                  <div className="space-y-2 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-cyber-white font-tech text-base md:text-xl font-bold">
                        {skill.name}
                      </h3>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-semibold`}
                        style={{
                          backgroundColor: categoryColors[skill.category],
                          color: "#000",
                        }}
                      >
                        {skill.category}
                      </div>
                    </div>

                    {/* Used In - More compact on mobile */}
                    <div className="space-y-2 md:space-y-3">
                      {skill.usedIn.projects &&
                        skill.usedIn.projects.length > 0 && (
                          <div>
                            <h4 className="text-michigan-maize font-tech font-semibold text-xs md:text-sm mb-1">
                              Projects
                            </h4>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {skill.usedIn.projects
                                .slice(
                                  0,
                                  typeof window !== "undefined" &&
                                    window.innerWidth < 768
                                    ? 2
                                    : skill.usedIn.projects.length
                                )
                                .map((project) => (
                                  <span
                                    key={project}
                                    className="px-1.5 py-0.5 md:px-2 md:py-1 bg-michigan-maize/20 text-michigan-maize text-xs rounded font-tech border border-michigan-maize/30"
                                  >
                                    {project}
                                  </span>
                                ))}
                              {typeof window !== "undefined" &&
                                window.innerWidth < 768 &&
                                skill.usedIn.projects.length > 2 && (
                                  <span className="text-michigan-maize/60 text-xs">
                                    +{skill.usedIn.projects.length - 2}
                                  </span>
                                )}
                            </div>
                          </div>
                        )}

                      {skill.usedIn.jobs && skill.usedIn.jobs.length > 0 && (
                        <div>
                          <h4 className="text-cyber-green font-tech font-semibold text-xs md:text-sm mb-1">
                            Experience
                          </h4>
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {skill.usedIn.jobs
                              .slice(
                                0,
                                typeof window !== "undefined" &&
                                  window.innerWidth < 768
                                  ? 1
                                  : skill.usedIn.jobs.length
                              )
                              .map((job) => (
                                <span
                                  key={job}
                                  className="px-1.5 py-0.5 md:px-2 md:py-1 bg-cyber-green/20 text-cyber-green text-xs rounded font-tech border border-cyber-green/30"
                                >
                                  {job}
                                </span>
                              ))}
                            {typeof window !== "undefined" &&
                              window.innerWidth < 768 &&
                              skill.usedIn.jobs.length > 1 && (
                                <span className="text-cyber-green/60 text-xs">
                                  +{skill.usedIn.jobs.length - 1}
                                </span>
                              )}
                          </div>
                        </div>
                      )}

                      {skill.usedIn.classes &&
                        skill.usedIn.classes.length > 0 && (
                          <div>
                            <h4 className="text-neon-blue font-tech font-semibold text-xs md:text-sm mb-1">
                              Coursework
                            </h4>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {skill.usedIn.classes
                                .slice(
                                  0,
                                  typeof window !== "undefined" &&
                                    window.innerWidth < 768
                                    ? 2
                                    : skill.usedIn.classes.length
                                )
                                .map((course) => (
                                  <span
                                    key={course}
                                    className="px-1.5 py-0.5 md:px-2 md:py-1 bg-neon-blue/20 text-neon-blue text-xs rounded font-tech border border-neon-blue/30"
                                  >
                                    {course}
                                  </span>
                                ))}
                              {typeof window !== "undefined" &&
                                window.innerWidth < 768 &&
                                skill.usedIn.classes.length > 2 && (
                                  <span className="text-neon-blue/60 text-xs">
                                    +{skill.usedIn.classes.length - 2}
                                  </span>
                                )}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Connected Technologies - Desktop only */}
                    {skill.connections.length > 0 && (
                      <div className="pt-2 border-t border-cyber-white/20 hidden md:block">
                        <h4 className="text-cyber-white/90 font-tech font-semibold text-sm mb-2">
                          Connected Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.connections.slice(0, 4).map((connId) => {
                            const connectedSkill = skills.find(
                              (s) => s.id === connId
                            );
                            return connectedSkill ? (
                              <span
                                key={connId}
                                className="px-2 py-1 bg-cyber-white/10 text-cyber-white/80 text-xs rounded font-tech border border-cyber-white/20 hover:border-cyber-white/40 transition-colors cursor-pointer"
                                onClick={() => setSelectedSkill(connId)}
                              >
                                {connectedSkill.name}
                              </span>
                            ) : null;
                          })}
                          {skill.connections.length > 4 && (
                            <span className="text-cyber-white/60 text-xs">
                              +{skill.connections.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* SVG Constellation - Responsive Scale */}
        <svg
          viewBox={
            typeof window !== "undefined" && window.innerWidth < 768
              ? "0 0 1200 1200" // Taller viewBox for mobile
              : "0 0 1200 1000" // Standard viewBox for desktop
          }
          className="w-full h-full absolute top-6 md:top-8 inset-x-0 bottom-0"
          style={{
            minHeight:
              typeof window !== "undefined" && window.innerWidth < 768
                ? "600px"
                : "400px",
          }}
          onClick={(e) => {
            // Clear selection when clicking on empty SVG area
            if (e.target === e.currentTarget) {
              setSelectedSkill(null);
            }
          }}
        >
          {/* Connection lines */}
          <g className="opacity-60">
            {skills.map((skill) =>
              skill.connections.map((connId) => {
                const connectedSkill = skills.find((s) => s.id === connId);
                if (!connectedSkill) return null;

                const pos1 = getNodePosition(skill);
                const pos2 = getNodePosition(connectedSkill);
                const x1 = pos1.x;
                const y1 = pos1.y;
                const x2 = pos2.x;
                const y2 = pos2.y;

                const isHighlighted = shouldHighlightConnection(
                  skill.id,
                  connId
                );

                return (
                  <motion.line
                    key={`${skill.id}-${connId}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={
                      isHighlighted
                        ? categoryColors[skill.category]
                        : "rgba(255, 255, 255, 0.2)"
                    }
                    strokeWidth={isHighlighted ? 3 : 2}
                    strokeOpacity={isHighlighted ? 0.8 : 0.3}
                    className="transition-all duration-300"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                );
              })
            )}
          </g>

          {/* Skill nodes */}
          <g>
            {skills.map((skill, index) => {
              const position = getNodePosition(skill);
              const centerX = position.x;
              const centerY = position.y;
              const dimensions = getNodeDimensions(skill);
              const isHovered = hoveredSkill === skill.id;
              const isSelected = selectedSkill === skill.id;
              const isHighlighted = shouldHighlightNode(skill.id);
              const isActive = isHovered || isSelected;

              return (
                <g key={skill.id}>
                  {/* Node background with glow effect */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: isHighlighted ? 1 : 0.4 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() =>
                      setSelectedSkill(
                        selectedSkill === skill.id ? null : skill.id
                      )
                    }
                  >
                    {/* Outer glow */}
                    {isActive && (
                      <motion.rect
                        x={centerX - dimensions.width / 2 - 4}
                        y={centerY - dimensions.height / 2 - 4}
                        width={dimensions.width + 8}
                        height={dimensions.height + 8}
                        rx={dimensions.rx + 2}
                        fill="none"
                        stroke={categoryColors[skill.category]}
                        strokeWidth={2}
                        strokeOpacity={0.6}
                        className="animate-pulse"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.6 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Main node */}
                    <motion.rect
                      x={centerX - dimensions.width / 2}
                      y={centerY - dimensions.height / 2}
                      width={dimensions.width}
                      height={dimensions.height}
                      rx={dimensions.rx}
                      fill={
                        isActive
                          ? `rgba(${
                              skill.category === "language"
                                ? "51, 153, 255"
                                : skill.category === "framework"
                                ? "255, 203, 5"
                                : skill.category === "tool"
                                ? "0, 255, 148"
                                : "255, 107, 157"
                            }, 0.2)`
                          : "rgba(255, 255, 255, 0.05)"
                      }
                      stroke={
                        isActive
                          ? categoryColors[skill.category]
                          : "rgba(255, 255, 255, 0.2)"
                      }
                      strokeWidth={isActive ? 3 : 2}
                      strokeOpacity={isActive ? 0.8 : 0.3}
                      className="transition-all duration-300"
                      whileHover={{
                        fill: `rgba(${
                          skill.category === "language"
                            ? "51, 153, 255"
                            : skill.category === "framework"
                            ? "255, 203, 5"
                            : skill.category === "tool"
                            ? "0, 255, 148"
                            : "255, 107, 157"
                        }, 0.3)`,
                      }}
                    />

                    {/* Inner scan line effect */}
                    {isActive && (
                      <motion.line
                        x1={centerX - dimensions.width / 2 + 4}
                        y1={centerY}
                        x2={centerX + dimensions.width / 2 - 4}
                        y2={centerY}
                        stroke={categoryColors[skill.category]}
                        strokeWidth={1}
                        strokeOpacity={0.6}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.g>

                  {/* Skill text - full name */}
                  <motion.text
                    x={centerX}
                    y={centerY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-tech font-bold pointer-events-none select-none"
                    fontSize={
                      typeof window !== "undefined" && window.innerWidth < 768
                        ? "48"
                        : "20"
                    }
                    fill="#FFFFFF"
                    fillOpacity={0.95}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.95 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {skill.name}
                  </motion.text>

                  {/* Category indicator dot */}
                  <circle
                    cx={centerX + dimensions.width / 2 - 6}
                    cy={centerY - dimensions.height / 2 + 6}
                    r={3}
                    fill={categoryColors[skill.category]}
                    fillOpacity={0.8}
                    className="pointer-events-none"
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default SkillsConstellation;
