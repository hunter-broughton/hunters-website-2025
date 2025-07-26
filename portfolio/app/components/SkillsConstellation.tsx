"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiJavascript,
  SiPython,
  SiTypescript,
  SiCplusplus,
  SiC,
  SiVuedotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPytorch,
  SiTailwindcss,
  SiGit,
  SiMongodb,
  SiPandas,
  SiNumpy,
  SiFastapi,
  SiVuetify,
  SiPytest,
  SiDocker,
  SiGithub,
  SiRust,
  SiNextdotjs,
} from "react-icons/si";
import { FaJava, FaRobot, FaMicrochip } from "react-icons/fa";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

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
  const [viewMode, setViewMode] = useState<"constellation" | "list">(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      return "constellation"; // Default to constellation view on desktop
    }
    return "list"; // Default to list view on mobile
  });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [algorithmState, setAlgorithmState] = useState<{
    isRunning: boolean;
    type: "prim" | "kruskal" | null;
    step: number;
    mstEdges: Array<{ from: string; to: string; weight: number }>;
    visitedNodes: Set<string>;
    highlightedEdge: { from: string; to: string } | null;
  }>({
    isRunning: false,
    type: null,
    step: 0,
    mstEdges: [],
    visitedNodes: new Set(),
    highlightedEdge: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const algorithmTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAbortedRef = useRef<boolean>(false);

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
      connections: [
        "react",
        "node",
        "express",
        "ts",
        "tailwind",
        "vue",
        "nextjs",
      ],
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
      connections: ["js", "react", "vue", "nextjs"],
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
      connections: ["C", "hardware"],
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
      connections: ["cpp", "hardware"],
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
      connections: ["python", "hardware"],
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
      connections: ["js", "ts", "tailwind", "nextjs"],
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
      connections: ["react", "nextjs"],
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
      y: 82,
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
      id: "rust",
      name: "Rust",
      level: 75,
      category: "language",
      x: 58,
      y: 82,
      connections: ["leptos"],
      usedIn: {
        projects: ["Rust Compression Algorithms"],
        jobs: [],
        classes: [],
      },
    },
    {
      id: "leptos",
      name: "Leptos",
      level: 70,
      category: "framework",
      x: 80,
      y: 88,
      connections: ["rust"],
      usedIn: {
        projects: ["Rust Compression Algorithms"],
        jobs: [],
        classes: [],
      },
    },
    {
      id: "nextjs",
      name: "Next.js",
      level: 90,
      category: "framework",
      x: 12,
      y: 88,
      connections: ["react", "js", "ts", "tailwind"],
      usedIn: {
        projects: [
          "This Website!",
          "Hill Street Run Club Website",
          "GreekLink",
          "Creo EV Charger System",
        ],
        jobs: ["Credo Semiconductor", "Vloggi"],
        classes: [],
      },
    },
    {
      id: "hardware",
      name: "Hardware",
      level: 70,
      category: "concept",
      x: 5,
      y: 75,
      connections: ["C", "cpp", "pyvisa"],
      usedIn: {
        projects: ["S-Parameter Analysis Automation"],
        jobs: ["Credo Semiconductor", "SparkRacing"],
        classes: ["EECS 370"],
      },
    },
  ];

  const categoryColors = {
    language: "#3399FF",
    framework: "#FFCB05",
    tool: "#00FF94",
    concept: "#FF6B9D",
  };

  // Skill icons mapping
  const getSkillIcon = (skillId: string) => {
    const iconProps = { size: 24, className: "text-current" };

    switch (skillId) {
      case "js":
        return <SiJavascript {...iconProps} className="text-yellow-400" />;
      case "python":
        return <SiPython {...iconProps} className="text-blue-400" />;
      case "ts":
        return <SiTypescript {...iconProps} className="text-blue-600" />;
      case "cpp":
        return <SiCplusplus {...iconProps} className="text-blue-500" />;
      case "C":
        return <SiC {...iconProps} className="text-blue-600" />;
      case "java":
        return <FaJava {...iconProps} className="text-red-500" />;
      case "vue":
        return <SiVuedotjs {...iconProps} className="text-green-500" />;
      case "pyvisa":
        return (
          <TbDeviceDesktopAnalytics
            {...iconProps}
            className="text-purple-400"
          />
        );
      case "react":
        return <SiReact {...iconProps} className="text-cyan-400" />;
      case "node":
        return <SiNodedotjs {...iconProps} className="text-green-500" />;
      case "express":
        return <SiExpress {...iconProps} className="text-gray-300" />;
      case "pytorch":
        return <SiPytorch {...iconProps} className="text-orange-500" />;
      case "tailwind":
        return <SiTailwindcss {...iconProps} className="text-teal-400" />;
      case "git":
        return <SiGit {...iconProps} className="text-orange-600" />;
      case "mongodb":
        return <SiMongodb {...iconProps} className="text-green-600" />;
      case "pandas":
        return <SiPandas {...iconProps} className="text-blue-300" />;
      case "numpy":
        return <SiNumpy {...iconProps} className="text-blue-500" />;
      case "fastapi":
        return <SiFastapi {...iconProps} className="text-green-400" />;
      case "vuetify":
        return <SiVuetify {...iconProps} className="text-blue-400" />;
      case "pytest":
        return <SiPytest {...iconProps} className="text-yellow-500" />;
      case "docker":
        return <SiDocker {...iconProps} className="text-blue-400" />;
      case "github":
        return <SiGithub {...iconProps} className="text-gray-300" />;
      case "ai":
        return <FaRobot {...iconProps} className="text-purple-500" />;
      case "rust":
        return <SiRust {...iconProps} className="text-orange-600" />;
      case "leptos":
        return <SiRust {...iconProps} className="text-red-500" />;
      case "nextjs":
        return <SiNextdotjs {...iconProps} className="text-white" />;
      case "hardware":
        return <FaMicrochip {...iconProps} className="text-green-400" />;
      default:
        return <SiJavascript {...iconProps} className="text-gray-400" />;
    }
  };

  // Group skills by category for list view
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillNode[]>);

  // Sort skills within each category alphabetically
  Object.keys(groupedSkills).forEach((category) => {
    groupedSkills[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  const renderListView = () => (
    <div className="space-y-8">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="space-y-4">
          <h3
            className="text-xl md:text-2xl font-tech font-bold capitalize flex items-center gap-3"
            style={{
              color: categoryColors[category as keyof typeof categoryColors],
            }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor:
                  categoryColors[category as keyof typeof categoryColors],
              }}
            />
            {category}s
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categorySkills.map((skill) => (
              <motion.div
                key={skill.id}
                className="group relative bg-cyber-black/50 border border-cyber-white/20 rounded-lg p-4 hover:border-neon-blue/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
                }
                onMouseEnter={() => handleMouseEnter(skill.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Skill Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{getSkillIcon(skill.id)}</div>
                  <div className="flex-1">
                    <h4 className="text-cyber-white font-tech font-semibold text-lg group-hover:text-neon-blue transition-colors">
                      {skill.name}
                    </h4>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-2 text-xs">
                  {skill.usedIn.projects &&
                    skill.usedIn.projects.length > 0 && (
                      <span className="px-2 py-1 bg-michigan-maize/20 text-michigan-maize rounded font-tech">
                        {skill.usedIn.projects.length} Projects
                      </span>
                    )}
                  {skill.usedIn.jobs && skill.usedIn.jobs.length > 0 && (
                    <span className="px-2 py-1 bg-cyber-green/20 text-cyber-green rounded font-tech">
                      {skill.usedIn.jobs.length} Jobs
                    </span>
                  )}
                  {skill.usedIn.classes && skill.usedIn.classes.length > 0 && (
                    <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded font-tech">
                      {skill.usedIn.classes.length} Courses
                    </span>
                  )}
                </div>

                {/* Connections indicator */}
                {skill.connections.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-cyber-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-cyber-white/60 font-tech">
                        Connected to:
                      </span>
                      <div className="flex gap-1">
                        {skill.connections.slice(0, 3).map((connId) => {
                          const connectedSkill = skills.find(
                            (s) => s.id === connId
                          );
                          return connectedSkill ? (
                            <span key={connId} className="text-xs">
                              {getSkillIcon(connId)}
                            </span>
                          ) : null;
                        })}
                        {skill.connections.length > 3 && (
                          <span className="text-xs text-cyber-white/40">
                            +{skill.connections.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover effect glow */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(45deg, ${
                      categoryColors[skill.category]
                    }22, transparent)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

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
      // Mobile Layout - 3 column design with tighter vertical spacing
      // Reduced spacing to 10-12 units between nodes to fit mobile viewport

      // First column - Languages
      js: { x: 15, y: 6 },
      python: { x: 15, y: 18 },
      ts: { x: 15, y: 30 },
      cpp: { x: 15, y: 42 },
      C: { x: 15, y: 54 },
      java: { x: 15, y: 66 },

      // Second column - Major Frameworks (center column)
      react: { x: 50, y: 8 },
      node: { x: 50, y: 20 },
      express: { x: 50, y: 32 },
      vue: { x: 50, y: 44 },
      pytorch: { x: 50, y: 56 },
      fastapi: { x: 50, y: 68 },

      // Third column - Tools & Libraries (right column)
      tailwind: { x: 85, y: 6 },
      git: { x: 85, y: 18 },
      mongodb: { x: 85, y: 30 },
      pandas: { x: 85, y: 42 },
      numpy: { x: 85, y: 54 },
      pyvisa: { x: 85, y: 66 },

      // Bottom section - Additional tools (spread across full width)
      docker: { x: 15, y: 78 },
      github: { x: 50, y: 80 },
      vuetify: { x: 85, y: 78 },

      // Final section - Concepts (bottom row)
      pytest: { x: 15, y: 90 },
      ai: { x: 50, y: 92 },

      // New skills - continuing the layout
      rust: { x: 85, y: 90 },
      leptos: { x: 15, y: 102 },
      nextjs: { x: 50, y: 104 },
      hardware: { x: 85, y: 102 },
    };

    return mobileCoords[skillId] || { x: 50, y: 50 };
  };

  const getNodePosition = (skill: SkillNode) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (isMobile) {
      const mobileCoords = getMobileCoordinates(skill.id);
      return {
        x: (mobileCoords.x / 100) * 1200,
        y: (mobileCoords.y / 100) * 1200, // Reduced from 1600 to 1200 for tighter spacing
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

  // Algorithm implementations
  const calculateEdgeWeight = (skill1: SkillNode, skill2: SkillNode) => {
    // Calculate distance between nodes as weight
    const pos1 = getNodePosition(skill1);
    const pos2 = getNodePosition(skill2);
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
    );
  };

  const getAllEdges = () => {
    const edges: Array<{
      from: string;
      to: string;
      weight: number;
      skill1: SkillNode;
      skill2: SkillNode;
    }> = [];

    skills.forEach((skill) => {
      skill.connections.forEach((connId) => {
        const connectedSkill = skills.find((s) => s.id === connId);
        if (connectedSkill) {
          // Avoid duplicate edges by ensuring consistent ordering
          if (skill.id < connId) {
            edges.push({
              from: skill.id,
              to: connId,
              weight: calculateEdgeWeight(skill, connectedSkill),
              skill1: skill,
              skill2: connectedSkill,
            });
          }
        }
      });
    });

    return edges.sort((a, b) => a.weight - b.weight);
  };

  const runPrimAlgorithm = async () => {
    if (algorithmState.isRunning) {
      return;
    }

    // Reset abort flag
    isAbortedRef.current = false;

    setAlgorithmState((prev) => ({
      ...prev,
      isRunning: true,
      type: "prim",
      step: 0,
      mstEdges: [],
      visitedNodes: new Set(),
      highlightedEdge: null,
    }));

    const allEdges = getAllEdges();
    const mstEdges: Array<{ from: string; to: string; weight: number }> = [];
    const visitedNodes = new Set<string>();

    // Start with TypeScript node (well connected and central)
    visitedNodes.add("ts");

    while (
      visitedNodes.size < skills.length &&
      mstEdges.length < skills.length - 1 &&
      !isAbortedRef.current
    ) {
      // Check for abort before each iteration
      if (isAbortedRef.current) break;

      // Find minimum weight edge connecting visited to unvisited nodes
      let minEdge: (typeof allEdges)[0] | null = null;

      for (const edge of allEdges) {
        const fromVisited = visitedNodes.has(edge.from);
        const toVisited = visitedNodes.has(edge.to);

        // Edge connects visited to unvisited
        if (fromVisited !== toVisited) {
          if (!minEdge || edge.weight < minEdge.weight) {
            minEdge = edge;
          }
        }
      }

      if (minEdge && !isAbortedRef.current) {
        // Highlight the edge being added
        setAlgorithmState((prev) => ({
          ...prev,
          highlightedEdge: { from: minEdge!.from, to: minEdge!.to },
        }));

        await new Promise((resolve) => {
          algorithmTimeoutRef.current = setTimeout(resolve, 500);
        });

        // Check for abort after timeout
        if (isAbortedRef.current) break;

        // Add edge to MST
        mstEdges.push({
          from: minEdge.from,
          to: minEdge.to,
          weight: minEdge.weight,
        });
        visitedNodes.add(minEdge.from);
        visitedNodes.add(minEdge.to);

        setAlgorithmState((prev) => ({
          ...prev,
          mstEdges: [...mstEdges],
          visitedNodes: new Set(visitedNodes),
          highlightedEdge: null,
        }));

        await new Promise((resolve) => {
          algorithmTimeoutRef.current = setTimeout(resolve, 400);
        });
      } else {
        break;
      }
    }

    // Algorithm complete - only if not aborted
    if (!isAbortedRef.current) {
      algorithmTimeoutRef.current = setTimeout(() => {
        if (!isAbortedRef.current) {
          setAlgorithmState((prev) => ({ ...prev, isRunning: false }));
        }
      }, 1500);
    }
  };

  const runKruskalAlgorithm = async () => {
    if (algorithmState.isRunning) {
      return;
    }

    // Reset abort flag
    isAbortedRef.current = false;

    setAlgorithmState((prev) => ({
      ...prev,
      isRunning: true,
      type: "kruskal",
      step: 0,
      mstEdges: [],
      visitedNodes: new Set(),
      highlightedEdge: null,
    }));

    const allEdges = getAllEdges();
    const mstEdges: Array<{ from: string; to: string; weight: number }> = [];

    // Union-Find data structure
    const parent = new Map<string, string>();
    const rank = new Map<string, number>();

    // Initialize union-find
    skills.forEach((skill) => {
      parent.set(skill.id, skill.id);
      rank.set(skill.id, 0);
    });

    const find = (x: string): string => {
      if (parent.get(x) !== x) {
        parent.set(x, find(parent.get(x)!));
      }
      return parent.get(x)!;
    };

    const union = (x: string, y: string): boolean => {
      const rootX = find(x);
      const rootY = find(y);

      if (rootX === rootY) return false;

      const rankX = rank.get(rootX)!;
      const rankY = rank.get(rootY)!;

      if (rankX < rankY) {
        parent.set(rootX, rootY);
      } else if (rankX > rankY) {
        parent.set(rootY, rootX);
      } else {
        parent.set(rootY, rootX);
        rank.set(rootX, rankX + 1);
      }

      return true;
    };

    // Process edges in order of weight
    for (const edge of allEdges) {
      if (mstEdges.length >= skills.length - 1 || isAbortedRef.current) break;

      // Check for abort before each iteration
      if (isAbortedRef.current) break;

      // Highlight the edge being considered
      setAlgorithmState((prev) => ({
        ...prev,
        highlightedEdge: { from: edge.from, to: edge.to },
      }));

      await new Promise((resolve) => {
        algorithmTimeoutRef.current = setTimeout(resolve, 400);
      });

      // Check for abort after timeout
      if (isAbortedRef.current) break;

      // Check if adding this edge creates a cycle
      if (union(edge.from, edge.to)) {
        // Edge accepted - add to MST
        mstEdges.push({ from: edge.from, to: edge.to, weight: edge.weight });

        const visitedNodes = new Set<string>();
        mstEdges.forEach((e) => {
          visitedNodes.add(e.from);
          visitedNodes.add(e.to);
        });

        setAlgorithmState((prev) => ({
          ...prev,
          mstEdges: [...mstEdges],
          visitedNodes: new Set(visitedNodes),
          highlightedEdge: null,
        }));

        await new Promise((resolve) => {
          algorithmTimeoutRef.current = setTimeout(resolve, 500);
        });
      } else {
        // Edge rejected - creates cycle
        setAlgorithmState((prev) => ({ ...prev, highlightedEdge: null }));
        await new Promise((resolve) => {
          algorithmTimeoutRef.current = setTimeout(resolve, 300);
        });
      }
    }

    // Algorithm complete - only if not aborted
    if (!isAbortedRef.current) {
      algorithmTimeoutRef.current = setTimeout(() => {
        if (!isAbortedRef.current) {
          setAlgorithmState((prev) => ({ ...prev, isRunning: false }));
        }
      }, 1500);
    }
  };

  const resetAlgorithm = () => {
    setAlgorithmState({
      isRunning: false,
      type: null,
      step: 0,
      mstEdges: [],
      visitedNodes: new Set(),
      highlightedEdge: null,
    });
  };

  const abortAlgorithm = () => {
    // Set abort flag
    isAbortedRef.current = true;

    // Clear any running timeout
    if (algorithmTimeoutRef.current) {
      clearTimeout(algorithmTimeoutRef.current);
      algorithmTimeoutRef.current = null;
    }

    // Reset algorithm state completely
    setAlgorithmState({
      isRunning: false,
      type: null,
      step: 0,
      mstEdges: [],
      visitedNodes: new Set(),
      highlightedEdge: null,
    });
  };

  // Debounced hover handlers to prevent glitching
  const handleMouseEnter = (skillId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredSkill(skillId);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSkill(null);
    }, 150); // Small delay to prevent rapid toggling
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full space-y-8" ref={containerRef}>
      {/* Main Skills Constellation Component - Adjusted for better mobile view */}
      <div className="relative w-full min-h-[85vh] bg-gradient-to-br from-cyber-black via-cyber-black/90 to-cyber-black/80 border border-neon-blue/30 rounded-lg backdrop-blur-sm">
        {/* Header with Title and Controls */}
        <div className="flex flex-col space-y-3 md:space-y-4 p-3 md:p-6 border-b border-neon-blue/20 relative z-10">
          {/* Title and Description */}
          <div>
            <h2 className="text-cyber-white font-tech text-xl md:text-2xl font-bold mb-2">
              Skills & Technologies
            </h2>
            <p className="text-cyber-white/70 font-tech text-sm md:text-base">
              {viewMode === "constellation"
                ? "Hover or click nodes to explore my skills and their connections!"
                : "Click on any skill card to see detailed information and connections!"}
            </p>
          </div>

          {/* View Toggle and Algorithm Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("constellation")}
                className={`px-4 py-2 rounded-lg font-tech text-sm font-semibold transition-all duration-300 border ${
                  viewMode === "constellation"
                    ? "bg-neon-blue/20 border-neon-blue text-neon-blue"
                    : "bg-cyber-white/10 border-cyber-white/20 text-cyber-white/70 hover:bg-cyber-white/20"
                }`}
              >
                🌌 Constellation
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg font-tech text-sm font-semibold transition-all duration-300 border ${
                  viewMode === "list"
                    ? "bg-neon-blue/20 border-neon-blue text-neon-blue"
                    : "bg-cyber-white/10 border-cyber-white/20 text-cyber-white/70 hover:bg-cyber-white/20"
                }`}
              >
                📋 List View
              </button>
            </div>

            {/* Algorithm Controls - Only show in constellation mode */}
            {viewMode === "constellation" && (
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={runPrimAlgorithm}
                    disabled={algorithmState.isRunning}
                    className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-tech text-xs md:text-sm font-semibold transition-all duration-300 border ${
                      algorithmState.isRunning
                        ? "bg-cyber-white/10 border-cyber-white/20 text-cyber-white/50 cursor-not-allowed"
                        : algorithmState.type === "prim"
                        ? "bg-michigan-maize/20 border-michigan-maize text-michigan-maize hover:bg-michigan-maize/30"
                        : "bg-neon-blue/20 border-neon-blue text-neon-blue hover:bg-neon-blue/30 hover:border-neon-blue/80"
                    }`}
                  >
                    {algorithmState.isRunning &&
                    algorithmState.type === "prim" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-michigan-maize border-t-transparent rounded-full animate-spin"></div>
                        Prim's
                      </div>
                    ) : (
                      "Prim's MST"
                    )}
                  </button>

                  <button
                    onClick={runKruskalAlgorithm}
                    disabled={algorithmState.isRunning}
                    className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-tech text-xs md:text-sm font-semibold transition-all duration-300 border ${
                      algorithmState.isRunning
                        ? "bg-cyber-white/10 border-cyber-white/20 text-cyber-white/50 cursor-not-allowed"
                        : algorithmState.type === "kruskal"
                        ? "bg-cyber-green/20 border-cyber-green text-cyber-green hover:bg-cyber-green/30"
                        : "bg-neon-purple/20 border-neon-purple text-neon-purple hover:bg-neon-purple/30 hover:border-neon-purple/80"
                    }`}
                  >
                    {algorithmState.isRunning &&
                    algorithmState.type === "kruskal" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-cyber-green border-t-transparent rounded-full animate-spin"></div>
                        Kruskal's
                      </div>
                    ) : (
                      "Kruskal's MST"
                    )}
                  </button>
                </div>

                <button
                  onClick={resetAlgorithm}
                  disabled={algorithmState.isRunning}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-tech text-xs md:text-sm font-semibold transition-all duration-300 border ${
                    algorithmState.isRunning
                      ? "bg-cyber-white/10 border-cyber-white/20 text-cyber-white/50 cursor-not-allowed"
                      : "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30 hover:border-red-500/80"
                  }`}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Algorithm Status Display */}
        {algorithmState.isRunning && (
          <div className="absolute top-28 md:top-28 left-4 right-4 z-30">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-cyber-black/90 border border-neon-blue/50 rounded-lg p-3 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                  <span className="text-cyber-white font-tech text-sm">
                    Running{" "}
                    {algorithmState.type === "prim" ? "Prim's" : "Kruskal's"}{" "}
                    Algorithm...
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-neon-blue font-tech text-xs">
                    {algorithmState.type === "prim"
                      ? "Time: O(E log V) | Space: O(V)"
                      : "Time: O(E log E) | Space: O(V)"}
                  </div>
                  <button
                    onClick={abortAlgorithm}
                    className="px-2 py-1 bg-red-500/20 border border-red-500/50 rounded text-red-400 font-tech text-xs hover:bg-red-500/30 hover:border-red-500/80 transition-all duration-300"
                  >
                    Abort
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

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
              className={`fixed pointer-events-none z-50 ${(() => {
                const skill = skills.find(
                  (s) => s.id === (hoveredSkill || selectedSkill)
                );
                if (!skill) return "top-4 right-4 max-w-sm";

                const isMobile =
                  typeof window !== "undefined" && window.innerWidth < 768;

                // Simplified positioning logic to prevent glitching
                if (isMobile) {
                  return "top-16 left-4 right-4 max-w-none";
                } else {
                  // Always position on the right side with consistent spacing
                  return "top-20 right-4 max-w-sm";
                }
              })()} bg-cyber-black/95 border border-neon-blue/50 rounded-lg p-3 md:p-4 backdrop-blur-sm shadow-2xl`}
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

        {/* Main Content Area - Conditional Rendering */}
        {viewMode === "constellation" ? (
          /* SVG Constellation - Responsive Scale */
          <svg
            viewBox={
              typeof window !== "undefined" && window.innerWidth < 768
                ? "0 0 1200 1400" // Expanded viewBox for mobile to accommodate bottom skills
                : "0 0 1200 1100" // Expanded viewBox for desktop to accommodate bottom skills
            }
            className="w-full h-full absolute top-36 md:top-32 inset-x-0 bottom-0"
            style={{
              minHeight:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? "700px" // Increased height for mobile to show bottom skills
                  : "500px", // Increased height for desktop to show bottom skills
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

                  // Check if this edge is part of MST or highlighted
                  const isMSTEdge = algorithmState.mstEdges.some(
                    (edge) =>
                      (edge.from === skill.id && edge.to === connId) ||
                      (edge.from === connId && edge.to === skill.id)
                  );

                  const isHighlightedEdge =
                    algorithmState.highlightedEdge &&
                    ((algorithmState.highlightedEdge.from === skill.id &&
                      algorithmState.highlightedEdge.to === connId) ||
                      (algorithmState.highlightedEdge.from === connId &&
                        algorithmState.highlightedEdge.to === skill.id));

                  const isRegularHighlight =
                    !algorithmState.isRunning &&
                    !algorithmState.mstEdges.length &&
                    shouldHighlightConnection(skill.id, connId);

                  // Determine edge color and style
                  let strokeColor = "rgba(255, 255, 255, 0.2)";
                  let strokeWidth = 2;
                  let strokeOpacity = 0.3;

                  if (isHighlightedEdge) {
                    // Currently being processed by algorithm
                    strokeColor =
                      algorithmState.type === "prim" ? "#FFCB05" : "#00FF94";
                    strokeWidth = 4;
                    strokeOpacity = 1;
                  } else if (isMSTEdge) {
                    // Part of the MST
                    strokeColor =
                      algorithmState.type === "prim" ? "#FFCB05" : "#00FF94";
                    strokeWidth = 3;
                    strokeOpacity = 0.9;
                  } else if (isRegularHighlight) {
                    // Regular skill hover/selection highlight
                    strokeColor = categoryColors[skill.category];
                    strokeWidth = 3;
                    strokeOpacity = 0.8;
                  } else if (
                    algorithmState.isRunning ||
                    algorithmState.mstEdges.length > 0
                  ) {
                    // Fade non-MST edges during algorithm
                    strokeOpacity = 0.1;
                  }

                  return (
                    <motion.line
                      key={`${skill.id}-${connId}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                      className="transition-all duration-500"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: 1,
                        stroke: strokeColor,
                        strokeWidth: strokeWidth,
                        strokeOpacity: strokeOpacity,
                      }}
                      transition={{
                        duration: isHighlightedEdge ? 0.3 : 1,
                        delay: isHighlightedEdge ? 0 : 0.5,
                      }}
                      style={{
                        filter:
                          isMSTEdge || isHighlightedEdge
                            ? "drop-shadow(0 0 4px currentColor)"
                            : "none",
                      }}
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
                const isHighlighted =
                  !algorithmState.isRunning && !algorithmState.mstEdges.length
                    ? shouldHighlightNode(skill.id)
                    : true;
                const isActive = isHovered || isSelected;
                const isInMST = algorithmState.visitedNodes.has(skill.id);
                const isMSTActive =
                  algorithmState.isRunning ||
                  algorithmState.mstEdges.length > 0;

                return (
                  <g key={skill.id}>
                    {/* Node background with glow effect */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: isMSTActive
                          ? isInMST
                            ? 1
                            : 0.3
                          : isHighlighted
                          ? 1
                          : 0.4,
                      }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ scale: isMSTActive ? 1 : 1.1 }}
                      whileTap={{ scale: isMSTActive ? 1 : 0.95 }}
                      className={
                        isMSTActive ? "cursor-default" : "cursor-pointer"
                      }
                      onMouseEnter={() =>
                        !isMSTActive && handleMouseEnter(skill.id)
                      }
                      onMouseLeave={() => !isMSTActive && handleMouseLeave()}
                      onClick={() =>
                        !isMSTActive &&
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
                          isMSTActive && isInMST
                            ? `rgba(${
                                algorithmState.type === "prim"
                                  ? "255, 203, 5"
                                  : "0, 255, 148"
                              }, 0.3)`
                            : isActive && !isMSTActive
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
                          isMSTActive && isInMST
                            ? algorithmState.type === "prim"
                              ? "#FFCB05"
                              : "#00FF94"
                            : isActive && !isMSTActive
                            ? categoryColors[skill.category]
                            : "rgba(255, 255, 255, 0.2)"
                        }
                        strokeWidth={
                          isMSTActive && isInMST
                            ? 3
                            : isActive && !isMSTActive
                            ? 3
                            : 2
                        }
                        strokeOpacity={
                          isMSTActive && isInMST
                            ? 0.9
                            : isActive && !isMSTActive
                            ? 0.8
                            : 0.3
                        }
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
        ) : (
          /* List View */
          <div className="absolute top-44 md:top-40 inset-x-0 bottom-0 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {Object.entries(groupedSkills).map(
                ([category, categorySkills]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h3
                      className="text-xl md:text-2xl font-tech font-bold mb-4 capitalize"
                      style={{
                        color:
                          categoryColors[
                            category as keyof typeof categoryColors
                          ],
                      }}
                    >
                      {category}s
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {categorySkills.map((skill) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="bg-cyber-black/50 border border-cyber-white/20 rounded-lg p-4 cursor-pointer hover:border-neon-blue/50 transition-all duration-300"
                          onClick={() => setSelectedSkill(skill.id)}
                          onMouseEnter={() => handleMouseEnter(skill.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {/* Skill Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">
                                {getSkillIcon(skill.id)}
                              </span>
                              <h4 className="font-tech font-semibold text-cyber-white text-sm md:text-base">
                                {skill.name}
                              </h4>
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div className="flex flex-wrap gap-2 text-xs">
                            {skill.usedIn.projects &&
                              skill.usedIn.projects.length > 0 && (
                                <span className="px-2 py-1 bg-michigan-maize/20 text-michigan-maize rounded border border-michigan-maize/30">
                                  {skill.usedIn.projects.length} Projects
                                </span>
                              )}
                            {skill.usedIn.jobs &&
                              skill.usedIn.jobs.length > 0 && (
                                <span className="px-2 py-1 bg-cyber-green/20 text-cyber-green rounded border border-cyber-green/30">
                                  {skill.usedIn.jobs.length} Jobs
                                </span>
                              )}
                            {skill.usedIn.classes &&
                              skill.usedIn.classes.length > 0 && (
                                <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded border border-neon-blue/30">
                                  {skill.usedIn.classes.length} Classes
                                </span>
                              )}
                          </div>

                          {/* Connections indicator */}
                          {skill.connections.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-cyber-white/10">
                              <span className="text-xs text-cyber-white/60 font-tech">
                                Connected to {skill.connections.length}{" "}
                                technologies
                              </span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsConstellation;
