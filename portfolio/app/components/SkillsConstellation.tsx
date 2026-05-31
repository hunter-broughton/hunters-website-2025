"use client";

import React, { useState, useRef, useEffect } from "react";
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
  SiGo,
  SiTensorflow,
  SiKubernetes,
  SiGithubactions,
  SiAmazondynamodb,
  SiHuggingface,
} from "react-icons/si";
import { FaJava, FaRobot, FaMicrochip, FaDatabase, FaInfinity } from "react-icons/fa";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BiCloud } from "react-icons/bi";

interface Skill {
  id: string;
  name: string;
  category: "language" | "framework" | "tool" | "concept";
  usedIn: {
    projects?: string[];
    jobs?: string[];
    classes?: string[];
  };
}

const categoryColors = {
  language: "#3399FF",
  framework: "#FFCB05",
  tool: "#00FF94",
  concept: "#FF6B9D",
};

const skills: Skill[] = [
  // Languages
  {
    id: "js",
    name: "JavaScript",
    category: "language",
    usedIn: {
      projects: ["ThriftSwipe", "GreekLink", "HTTPie Authentication"],
      jobs: ["Credo Semiconductor", "Vloggi"],
      classes: ["EECS 481"],
    },
  },
  {
    id: "python",
    name: "Python",
    category: "language",
    usedIn: {
      projects: ["ThriftSwipe", "Chrome Dino Video Game", "S-Parameter Automation"],
      jobs: ["Credo Semiconductor"],
      classes: ["EECS 492", "EECS 445", "EECS 481", "EECS 298", "STATS 206"],
    },
  },
  {
    id: "ts",
    name: "TypeScript",
    category: "language",
    usedIn: {
      projects: ["ThriftSwipe", "GreekLink", "HTTPie Authentication"],
      jobs: ["Credo Semiconductor", "Vloggi"],
      classes: ["EECS 481"],
    },
  },
  {
    id: "cpp",
    name: "C++",
    category: "language",
    usedIn: {
      projects: [],
      jobs: ["Credo Semiconductor"],
      classes: ["EECS 281", "EECS 370"],
    },
  },
  {
    id: "C",
    name: "C",
    category: "language",
    usedIn: {
      projects: [],
      jobs: ["Credo Semiconductor"],
      classes: ["EECS 281", "EECS 370"],
    },
  },
  {
    id: "golang",
    name: "Go",
    category: "language",
    usedIn: {
      projects: [],
      jobs: ["Microsoft"],
      classes: [],
    },
  },
  {
    id: "java",
    name: "Java",
    category: "language",
    usedIn: {
      projects: [],
      jobs: [],
      classes: ["EECS 281"],
    },
  },
  {
    id: "rust",
    name: "Rust",
    category: "language",
    usedIn: {
      projects: ["Rust Compression Algorithms"],
      jobs: [],
      classes: [],
    },
  },
  // Frameworks
  {
    id: "react",
    name: "React",
    category: "framework",
    usedIn: {
      projects: ["ThriftSwipe", "GreekLink", "HTTPie Authentication"],
      jobs: ["Credo Semiconductor", "Vloggi"],
      classes: ["EECS 481"],
    },
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "framework",
    usedIn: {
      projects: ["This Website!", "Hill Street Run Club Website", "GreekLink", "Creo EV Charger System"],
      jobs: ["Credo Semiconductor", "Vloggi"],
      classes: [],
    },
  },
  {
    id: "node",
    name: "Node.js",
    category: "framework",
    usedIn: {
      projects: ["ThriftSwipe", "GreekLink"],
      jobs: ["Credo Semiconductor", "Vloggi"],
      classes: [],
    },
  },
  {
    id: "express",
    name: "Express",
    category: "framework",
    usedIn: {
      projects: ["ThriftSwipe"],
      jobs: ["Credo Semiconductor"],
      classes: [],
    },
  },
  {
    id: "vue",
    name: "Vue",
    category: "framework",
    usedIn: {
      projects: [],
      jobs: ["Credo Semiconductor"],
      classes: [],
    },
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "framework",
    usedIn: {
      projects: [],
      jobs: [],
      classes: ["EECS 492", "EECS 445", "EECS 298", "STATS 206"],
    },
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "framework",
    usedIn: {
      projects: [],
      jobs: [],
      classes: ["EECS 445", "EECS 492"],
    },
  },
  {
    id: "transformers",
    name: "Transformers",
    category: "framework",
    usedIn: {
      projects: [],
      jobs: [],
      classes: ["EECS 449", "EECS 445"],
    },
  },
  {
    id: "tailwind",
    name: "Tailwind",
    category: "framework",
    usedIn: {
      projects: ["ThriftSwipe", "GreekLink"],
      jobs: ["Credo Semiconductor", "Vloggi"],
      classes: [],
    },
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "framework",
    usedIn: {
      projects: [],
      jobs: ["Credo Semiconductor"],
      classes: [],
    },
  },
  {
    id: "vuetify",
    name: "Vuetify",
    category: "framework",
    usedIn: {
      projects: [],
      jobs: ["Credo Semiconductor"],
      classes: [],
    },
  },
  {
    id: "pytest",
    name: "Pytest",
    category: "framework",
    usedIn: {
      projects: ["S-Parameter Automation", "HTTPie Authentication"],
      jobs: ["Credo Semiconductor"],
      classes: ["EECS 481"],
    },
  },
  {
    id: "leptos",
    name: "Leptos",
    category: "framework",
    usedIn: {
      projects: ["Rust Compression Algorithms"],
      jobs: [],
      classes: [],
    },
  },
  {
    id: "pyvisa",
    name: "PyVISA",
    category: "framework",
    usedIn: {
      projects: ["S-Parameter Automation"],
      jobs: ["Credo Semiconductor"],
      classes: [],
    },
  },
  // Tools
  {
    id: "azure",
    name: "Azure",
    category: "tool",
    usedIn: {
      projects: [],
      jobs: ["Microsoft"],
      classes: [],
    },
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "tool",
    usedIn: {
      projects: [],
      jobs: ["Microsoft"],
      classes: [],
    },
  },
  {
    id: "cicd",
    name: "CI/CD",
    category: "tool",
    usedIn: {
      projects: [],
      jobs: ["Microsoft"],
      classes: ["EECS 481"],
    },
  },
  {
    id: "docker",
    name: "Docker",
    category: "tool",
    usedIn: {
      projects: [],
      jobs: ["Credo Semiconductor", "Vloggi", "Microsoft"],
      classes: [],
    },
  },
  {
    id: "git",
    name: "Git",
    category: "tool",
    usedIn: {
      projects: ["All Projects"],
      jobs: ["All Jobs"],
      classes: ["EECS 481"],
    },
  },
  {
    id: "github",
    name: "GitHub",
    category: "tool",
    usedIn: {
      projects: ["All Projects"],
      jobs: ["All Jobs"],
      classes: [],
    },
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "tool",
    usedIn: {
      projects: ["ThriftSwipe"],
      jobs: [],
      classes: [],
    },
  },
  {
    id: "dynamodb",
    name: "DynamoDB",
    category: "tool",
    usedIn: {
      projects: [],
      jobs: [],
      classes: [],
    },
  },
  {
    id: "cosmosdb",
    name: "CosmosDB",
    category: "tool",
    usedIn: {
      projects: [],
      jobs: ["Microsoft"],
      classes: [],
    },
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "tool",
    usedIn: {
      projects: ["S-Parameter Analysis"],
      jobs: ["Credo Semiconductor"],
      classes: ["STATS 206", "EECS 492", "EECS 298"],
    },
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "tool",
    usedIn: {
      projects: [],
      jobs: [],
      classes: ["STATS 206"],
    },
  },
  // Concepts
  {
    id: "distributed-state",
    name: "Distributed State",
    category: "concept",
    usedIn: {
      projects: [],
      jobs: ["Microsoft"],
      classes: ["EECS 491"],
    },
  },
  {
    id: "devops",
    name: "DevOps",
    category: "concept",
    usedIn: {
      projects: [],
      jobs: ["Microsoft"],
      classes: [],
    },
  },
  {
    id: "gitops",
    name: "GitOps",
    category: "concept",
    usedIn: {
      projects: [],
      jobs: ["Microsoft"],
      classes: [],
    },
  },
  {
    id: "ai",
    name: "ML/AI",
    category: "concept",
    usedIn: {
      projects: ["ThriftSwipe"],
      jobs: [],
      classes: ["EECS 492", "EECS 445", "EECS 449", "EECS 298"],
    },
  },
  {
    id: "hardware",
    name: "Hardware",
    category: "concept",
    usedIn: {
      projects: ["S-Parameter Analysis Automation"],
      jobs: ["Credo Semiconductor"],
      classes: ["EECS 370"],
    },
  },
];

const getSkillIcon = (skillId: string) => {
  const iconProps = { size: 24, className: "text-current" };
  switch (skillId) {
    case "js":        return <SiJavascript {...iconProps} className="text-yellow-400" />;
    case "python":    return <SiPython {...iconProps} className="text-blue-400" />;
    case "ts":        return <SiTypescript {...iconProps} className="text-blue-600" />;
    case "cpp":       return <SiCplusplus {...iconProps} className="text-blue-500" />;
    case "C":         return <SiC {...iconProps} className="text-blue-600" />;
    case "golang":    return <SiGo {...iconProps} className="text-cyan-400" />;
    case "java":      return <FaJava {...iconProps} className="text-red-500" />;
    case "rust":      return <SiRust {...iconProps} className="text-orange-600" />;
    case "react":     return <SiReact {...iconProps} className="text-cyan-400" />;
    case "nextjs":    return <SiNextdotjs {...iconProps} className="text-white" />;
    case "node":      return <SiNodedotjs {...iconProps} className="text-green-500" />;
    case "express":   return <SiExpress {...iconProps} className="text-gray-300" />;
    case "vue":       return <SiVuedotjs {...iconProps} className="text-green-500" />;
    case "pytorch":   return <SiPytorch {...iconProps} className="text-orange-500" />;
    case "tensorflow":return <SiTensorflow {...iconProps} className="text-orange-400" />;
    case "transformers": return <SiHuggingface {...iconProps} className="text-yellow-400" />;
    case "tailwind":  return <SiTailwindcss {...iconProps} className="text-teal-400" />;
    case "fastapi":   return <SiFastapi {...iconProps} className="text-green-400" />;
    case "vuetify":   return <SiVuetify {...iconProps} className="text-blue-400" />;
    case "pytest":    return <SiPytest {...iconProps} className="text-yellow-500" />;
    case "leptos":    return <SiRust {...iconProps} className="text-red-500" />;
    case "pyvisa":    return <TbDeviceDesktopAnalytics {...iconProps} className="text-purple-400" />;
    case "azure":     return <BiCloud {...iconProps} className="text-blue-400" />;
    case "kubernetes":return <SiKubernetes {...iconProps} className="text-blue-500" />;
    case "cicd":      return <SiGithubactions {...iconProps} className="text-orange-400" />;
    case "docker":    return <SiDocker {...iconProps} className="text-blue-400" />;
    case "git":       return <SiGit {...iconProps} className="text-orange-600" />;
    case "github":    return <SiGithub {...iconProps} className="text-gray-300" />;
    case "mongodb":   return <SiMongodb {...iconProps} className="text-green-600" />;
    case "dynamodb":  return <SiAmazondynamodb {...iconProps} className="text-yellow-500" />;
    case "cosmosdb":  return <FaDatabase {...iconProps} className="text-blue-300" />;
    case "pandas":    return <SiPandas {...iconProps} className="text-blue-300" />;
    case "numpy":     return <SiNumpy {...iconProps} className="text-blue-500" />;
    case "distributed-state": return <FaDatabase {...iconProps} className="text-cyan-500" />;
    case "devops":    return <FaInfinity {...iconProps} className="text-purple-400" />;
    case "gitops":    return <SiGit {...iconProps} className="text-green-400" />;
    case "ai":        return <FaRobot {...iconProps} className="text-purple-500" />;
    case "hardware":  return <FaMicrochip {...iconProps} className="text-green-400" />;
    default:          return <FaDatabase {...iconProps} className="text-gray-400" />;
  }
};

const SkillsConstellation = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedSkill(null);
        setHoveredSkill(null);
      }
    };
    if (selectedSkill || hoveredSkill) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedSkill, hoveredSkill]);

  const handleMouseEnter = (skillId: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredSkill(skillId);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setHoveredSkill(null), 150);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  Object.keys(groupedSkills).forEach((category) => {
    groupedSkills[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  const activeSkill = skills.find((s) => s.id === (hoveredSkill || selectedSkill));

  return (
    <div className="w-full space-y-8" ref={containerRef}>
      <div className="relative w-full bg-gradient-to-br from-cyber-black via-cyber-black/90 to-cyber-black/80 border border-neon-blue/30 rounded-lg backdrop-blur-sm">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-neon-blue/20">
          <h2 className="text-cyber-white font-tech text-xl md:text-2xl font-bold mb-1">
            Skills & Technologies
          </h2>
          <p className="text-cyber-white/60 font-tech text-sm">
            Click or hover any skill to see where it was used.
          </p>
        </div>

        {/* Skill Detail Popup */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="fixed top-20 right-4 z-50 max-w-sm w-80 bg-cyber-black/95 border border-neon-blue/50 rounded-lg p-4 backdrop-blur-sm shadow-2xl pointer-events-none"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-cyber-white font-tech text-lg font-bold">
                    {activeSkill.name}
                  </h3>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: categoryColors[activeSkill.category],
                      color: "#000",
                    }}
                  >
                    {activeSkill.category}
                  </span>
                </div>

                {activeSkill.usedIn.jobs && activeSkill.usedIn.jobs.length > 0 && (
                  <div>
                    <h4 className="text-cyber-green font-tech font-semibold text-sm mb-1">Experience</h4>
                    <div className="flex flex-wrap gap-1">
                      {activeSkill.usedIn.jobs.map((job) => (
                        <span key={job} className="px-2 py-1 bg-cyber-green/20 text-cyber-green text-xs rounded font-tech border border-cyber-green/30">
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeSkill.usedIn.projects && activeSkill.usedIn.projects.length > 0 && (
                  <div>
                    <h4 className="text-michigan-maize font-tech font-semibold text-sm mb-1">Projects</h4>
                    <div className="flex flex-wrap gap-1">
                      {activeSkill.usedIn.projects.map((project) => (
                        <span key={project} className="px-2 py-1 bg-michigan-maize/20 text-michigan-maize text-xs rounded font-tech border border-michigan-maize/30">
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeSkill.usedIn.classes && activeSkill.usedIn.classes.length > 0 && (
                  <div>
                    <h4 className="text-neon-blue font-tech font-semibold text-sm mb-1">Coursework</h4>
                    <div className="flex flex-wrap gap-1">
                      {activeSkill.usedIn.classes.map((course) => (
                        <span key={course} className="px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded font-tech border border-neon-blue/30">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="p-4 md:p-6 space-y-8">
          {(["language", "framework", "tool", "concept"] as const).map((category) => {
            const categorySkills = groupedSkills[category];
            if (!categorySkills) return null;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3
                  className="text-xl font-tech font-bold mb-4 capitalize flex items-center gap-2"
                  style={{ color: categoryColors[category] }}
                >
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: categoryColors[category] }}
                  />
                  {category}s
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className={`bg-cyber-black/50 border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        (hoveredSkill === skill.id || selectedSkill === skill.id)
                          ? "border-neon-blue/60"
                          : "border-cyber-white/20 hover:border-neon-blue/40"
                      }`}
                      onClick={() =>
                        setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
                      }
                      onMouseEnter={() => handleMouseEnter(skill.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{getSkillIcon(skill.id)}</span>
                        <h4 className="font-tech font-semibold text-cyber-white text-sm md:text-base">
                          {skill.name}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1 text-xs">
                        {skill.usedIn.jobs && skill.usedIn.jobs.length > 0 && (
                          <span className="px-2 py-1 bg-cyber-green/20 text-cyber-green rounded border border-cyber-green/30">
                            {skill.usedIn.jobs.length} {skill.usedIn.jobs.length === 1 ? "Job" : "Jobs"}
                          </span>
                        )}
                        {skill.usedIn.projects && skill.usedIn.projects.length > 0 && (
                          <span className="px-2 py-1 bg-michigan-maize/20 text-michigan-maize rounded border border-michigan-maize/30">
                            {skill.usedIn.projects.length} {skill.usedIn.projects.length === 1 ? "Project" : "Projects"}
                          </span>
                        )}
                        {skill.usedIn.classes && skill.usedIn.classes.length > 0 && (
                          <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded border border-neon-blue/30">
                            {skill.usedIn.classes.length} {skill.usedIn.classes.length === 1 ? "Course" : "Courses"}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsConstellation;
