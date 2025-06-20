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
      y: 15,
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
      y: 12,
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
      y: 15,
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
      y: 12,
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
      y: 35,
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
      y: 38,
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
      y: 35,
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
      y: 38,
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
      y: 58,
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
      y: 61,
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
      y: 58,
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
      y: 61,
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
      y: 81,
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
      y: 84,
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
      y: 81,
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
      y: 84,
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
      x: 12,
      y: 105,
      connections: ["python", "pandas"],
      usedIn: {
        projects: [],
        jobs: ["SparkRacing"],
        classes: ["Stats 206"],
      },
    },

    // Additional skills - distributed to avoid overlap
    {
      id: "fastapi",
      name: "FastAPI",
      level: 78,
      category: "framework",
      x: 92,
      y: 25,
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
      y: 48,
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
      y: 71,
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
      y: 25,
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
      y: 48,
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
      y: 71,
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
      y: 94,
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
    // Larger nodes for better text readability
    const baseWidth = Math.max(120, textLength * 10 + 30);
    const baseHeight = 45;
    return {
      width: baseWidth,
      height: baseHeight,
      rx: 6,
    };
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
      <div className="relative w-full min-h-[60vh] md:min-h-[70vh] bg-gradient-to-br from-cyber-black via-cyber-black/90 to-cyber-black/80 border border-neon-blue/30 rounded-lg overflow-hidden backdrop-blur-sm">
        <p className="text-cyber-white/70 font-tech text-xs md:text-lg text-center pt-2 md:pt-6 pb-1 md:pb-3 px-2 md:px-4">
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
                if (!skill)
                  return "top-1 left-1 right-1 md:top-4 md:right-4 md:left-auto";

                // If node is in the right half, position tooltip on the left
                if (skill.x > 50) {
                  return "top-1 left-1 md:top-4 md:left-4 md:right-auto";
                }
                // Otherwise position on the right (default)
                return "top-1 left-1 right-1 md:top-4 md:right-4 md:left-auto";
              })()} bg-cyber-black/95 border border-neon-blue/50 rounded-lg p-3 md:p-6 max-w-xs md:max-w-md backdrop-blur-sm z-20 text-sm md:text-base`}
            >
              {(() => {
                // Priority: hoveredSkill takes precedence over selectedSkill
                const skill = skills.find(
                  (s) => s.id === (hoveredSkill || selectedSkill)
                );
                if (!skill) return null;

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-cyber-white font-tech text-xl font-bold">
                        {skill.name}
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold`}
                        style={{
                          backgroundColor: categoryColors[skill.category],
                          color: "#000",
                        }}
                      >
                        {skill.category}
                      </div>
                    </div>

                    {/* Used In */}
                    <div className="space-y-3">
                      {skill.usedIn.projects &&
                        skill.usedIn.projects.length > 0 && (
                          <div>
                            <h4 className="text-michigan-maize font-tech font-semibold text-sm mb-1">
                              Projects
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {skill.usedIn.projects.map((project) => (
                                <span
                                  key={project}
                                  className="px-2 py-1 bg-michigan-maize/20 text-michigan-maize text-xs rounded font-tech border border-michigan-maize/30"
                                >
                                  {project}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      {skill.usedIn.jobs && skill.usedIn.jobs.length > 0 && (
                        <div>
                          <h4 className="text-cyber-green font-tech font-semibold text-sm mb-1">
                            Experience
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skill.usedIn.jobs.map((job) => (
                              <span
                                key={job}
                                className="px-2 py-1 bg-cyber-green/20 text-cyber-green text-xs rounded font-tech border border-cyber-green/30"
                              >
                                {job}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {skill.usedIn.classes &&
                        skill.usedIn.classes.length > 0 && (
                          <div>
                            <h4 className="text-neon-blue font-tech font-semibold text-sm mb-1">
                              Coursework
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {skill.usedIn.classes.map((course) => (
                                <span
                                  key={course}
                                  className="px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded font-tech border border-neon-blue/30"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Connected Technologies */}
                    {skill.connections.length > 0 && (
                      <div className="pt-2 border-t border-cyber-white/20">
                        <h4 className="text-cyber-white/90 font-tech font-semibold text-sm mb-2">
                          Connected Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.connections.map((connId) => {
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
          viewBox="0 0 1200 800"
          className="w-full h-full absolute inset-0"
          style={{ minHeight: "400px" }}
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

                const x1 = (skill.x / 100) * 1200;
                const y1 = (skill.y / 100) * 800;
                const x2 = (connectedSkill.x / 100) * 1200;
                const y2 = (connectedSkill.y / 100) * 800;

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
              const centerX = (skill.x / 100) * 1200;
              const centerY = (skill.y / 100) * 800;
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
                    fontSize="18"
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
