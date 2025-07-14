"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
  CommandLineIcon,
  PlayIcon,
  EyeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  image: string;
  featured: boolean;
  category: "web" | "mobile" | "ai" | "game" | "tool";
  status: "completed" | "in-progress" | "archived";
  impact?: string;
  year: number;
}

const projects: Project[] = [
  {
    id: "thriftswipe",
    title: "ThriftSwipe",
    description:
      "AI-powered online marketplace for thrift clothing. Our algorithm matches users with clothing based on their preferences and style, making sustainable fashion discovery effortless.",
    techStack: ["Express", "MongoDB", "React", "Tailwind", "Python", "AI/ML"],
    githubLink: "https://github.com/hunter-broughton/ThriftSwipe",
    image: "/assets/ThriftSwipe.jpg",
    featured: true,
    category: "web",
    status: "in-progress",
    impact: "Scaling with UMich students",
    year: 2024,
  },
  {
    id: "greeklink",
    title: "GreekLink",
    description:
      "Anonymous social media platform connecting Greek life communities nationwide. Led both front-end and back-end development for this community-focused platform.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Firebase",
      "Firestore",
    ],
    githubLink: "https://github.com/rkaelle/greeklink",
    liveLink: "https://www.greeklink.xyz/",
    image: "/assets/GreekLink.jpeg",
    featured: true,
    category: "web",
    status: "completed",
    impact: "Connecting students nationwide",
    year: 2023,
  },
  {
    id: "chrome-dino",
    title: "Chrome Dino Time Travel",
    description:
      "Level-based parody of Chrome's Dino game featuring different time periods. Collaborative game development with immersive time-travel mechanics.",
    techStack: ["PyGame", "Python", "Game Dev"],
    githubLink: "https://github.com/mkPuzon/CS269DinoGame",
    image: "/assets/chromeDino.png",
    featured: true,
    category: "game",
    status: "completed",
    year: 2023,
  },
  {
    id: "portfolio-website",
    title: "This Website!",
    description:
      "The website you are currently viewing, built with Next.js, Tailwind CSS, and TypeScript. Features cyberpunk aesthetics, interactive components, and responsive design.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "React",
      "Framer Motion",
    ],
    githubLink: "https://github.com/hunter-broughton/hunters-website-2025",
    liveLink: "https://hunterbroughton.com",
    image: "/assets/headshot-optimized.jpeg",
    featured: true,
    category: "web",
    status: "completed",
    impact: "Personal portfolio showcase",
    year: 2025,
  },
  {
    id: "run-club",
    title: "Hill Street Run Club Website",
    description:
      "As VP of Communications for the Hill Street Run Club at UMich, I'm developing a website to promote the club and its events. Features interest forms, event calendar, and membership database.",
    techStack: ["Next.js", "Tailwind CSS", "SQLite", "Node.js", "TypeScript"],
    githubLink: "https://github.com/hunter-broughton/1012-Run-Club",
    image: "/assets/HillStreetRunClub.PNG",
    featured: false,
    category: "web",
    status: "in-progress",
    impact: "University club promotion",
    year: 2024,
  },
  {
    id: "s-parameter-analysis",
    title: "S-Parameter Analysis Automation",
    description:
      "Developed a Python program to automate S-parameter analysis using a TC-720 temperature controller and VNA. Includes interactive GUI for data visualization and user-friendly analysis interface.",
    techStack: ["Python", "PyVisa", "Tkinter", "NumPy", "Matplotlib"],
    image: "/assets/credo.jpg",
    featured: false,
    category: "tool",
    status: "completed",
    impact: "Laboratory automation",
    year: 2023,
  },
  {
    id: "httpie-contributions",
    title: "HTTPie Authentication Contributions",
    description:
      "Added a new authentication method to HTTPie, a command-line HTTP client. Implemented username/password authentication with proper parsing functionality.",
    techStack: ["Python", "PyTest", "JavaScript", "React"],
    githubLink: "https://github.com/hunter-broughton/cli",
    liveLink: "https://httpie.io/",
    image: "/assets/httpie.png",
    featured: false,
    category: "tool",
    status: "completed",
    impact: "Open source contribution",
    year: 2023,
  },
  {
    id: "maze-search",
    title: "Maze Search Algorithms",
    description:
      "Implemented various search algorithms to solve mazes, including DFS, BFS, A*, and Dijkstra's algorithm. Developed a visualizer to compare algorithm performance on different maze structures.",
    techStack: ["Java"],
    githubLink: "https://github.com/hunter-broughton/maze-search-algorithms",
    image: "/assets/MazeSearch.png",
    featured: false,
    category: "tool",
    status: "completed",
    impact: "Algorithm visualization and comparison",
    year: 2023,
  },
  {
    id: "Reddit-Word-Frequency-Analysis",
    title: "Reddit Word Frequency Analysis",
    description:
      "Developed a tool to analyze word frequency in Reddit comments using Java using a custom-built HashMap implementation. The tool processes large datasets to identify common words and their frequencies, providing insights into user discussions.",
    techStack: ["Java"],
    githubLink: "https://github.com/hunter-broughton/Reddit-Frequency-Analyzer",
    image: "/assets/reddit.png",
    featured: false,
    category: "tool",
    status: "completed",
    impact: "Social media analysis",
    year: 2023,
  },
  {
    id: "Pursuit-Evasion-Simulator",
    title: "Pursuit-Evasion Simulator",
    description:
      "Developed a simulation of Dijkstra's Pursuit-Evasion problem using Java. The simulation models the interactions between pursuers and evaders in a graph.",
    techStack: ["Java"],
    githubLink:
      "https://github.com/hunter-broughton/Pursuit-Evasion-Game-Simulation",
    image: "/assets/graphSim.png",
    featured: false,
    category: "tool",
    status: "completed",
    impact: "Graph theory simulation",
    year: 2023,
  },
  {
    id: "algo-trading-bot",
    title: "Algorithmic Trading System",
    description:
      "Developed an algorithmic trading system using Python. The system analyzes market data and executes trades based on predefined strategies, and tests strategies using historical data.",
    techStack: [
      "Python",
      "Matplotlib",
      "Pandas",
      "NumPy",
      "ML",
      "Scikit-learn",
    ],
    githubLink: "https://github.com/hunter-broughton/trading-bot",
    image: "/assets/algotrading.jpeg",
    featured: false,
    category: "web",
    status: "completed",
    impact: "Financial market analysis and trading",
    year: 2025,
  },
];

const categoryColors = {
  web: "#3399FF",
  mobile: "#FFCB05",
  ai: "#00FF94",
  game: "#FF6B9D",
  tool: "#8B5CF6",
};

const InteractiveProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "terminal">("grid");

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-cyber text-neon-blue mb-2">
            Project Portfolio
          </h2>
          <p className="text-cyber-white/70 font-tech">
            Interactive showcase of my development work. Click on a project to
            learn more.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-sm font-tech text-sm transition-all border ${
              viewMode === "grid"
                ? "bg-neon-blue/20 border-neon-blue text-neon-blue"
                : "bg-cyber-white/10 border-cyber-white/20 text-cyber-white/70 hover:bg-cyber-white/20"
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode("terminal")}
            className={`px-4 py-2 rounded-sm font-tech text-sm transition-all border ${
              viewMode === "terminal"
                ? "bg-neon-blue/20 border-neon-blue text-neon-blue"
                : "bg-cyber-white/10 border-cyber-white/20 text-cyber-white/70 hover:bg-cyber-white/20"
            }`}
          >
            Terminal View
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {["all", "web", "game", "tool"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-3 py-1 rounded-full text-xs font-tech transition-all border ${
              filter === category
                ? "bg-matrix-green/20 border-matrix-green text-matrix-green"
                : "bg-cyber-white/10 border-cyber-white/20 text-cyber-white/60 hover:bg-cyber-white/20"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Project Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative bg-cyber-black/50 border border-cyber-white/20 rounded-lg overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(51,153,255,0.3)]">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent" />

                  {/* Status Badge */}
                  <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-tech ${
                      project.status === "completed"
                        ? "bg-matrix-green/20 text-matrix-green border border-matrix-green/30"
                        : project.status === "in-progress"
                        ? "bg-michigan-maize/20 text-michigan-maize border border-michigan-maize/30"
                        : "bg-cyber-white/20 text-cyber-white/60 border border-cyber-white/30"
                    }`}
                  >
                    {project.status.replace("-", " ")}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-cyber text-neon-blue group-hover:text-michigan-maize transition-colors">
                      {project.title}
                    </h3>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: categoryColors[project.category],
                      }}
                    />
                  </div>

                  <p className="text-cyber-white/70 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-cyber-white/10 text-cyber-white/80 rounded text-xs font-tech"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 text-cyber-white/60 text-xs">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Click anywhere on card to view details */}
                  <div className="text-xs text-cyber-white/50 mt-2">
                    Click to view details
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Terminal View */
        <div className="bg-cyber-black/80 border border-neon-blue/30 rounded-lg p-6 font-tech">
          <div className="flex items-center gap-2 mb-4 text-matrix-green">
            <CommandLineIcon className="w-4 h-4" />
            <span>~/projects $</span>
            <span className="animate-pulse">ls -la</span>
          </div>

          <div className="space-y-2">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 py-2 hover:bg-cyber-white/5 rounded cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <span className="text-matrix-green text-sm w-20">
                  {project.year}
                </span>
                <span className="text-neon-blue w-4">
                  {project.featured ? "★" : "○"}
                </span>
                <span className="text-cyber-white flex-1 hover:text-michigan-maize transition-colors">
                  {project.title}
                </span>
                <span className="text-cyber-white/60 text-sm">
                  {project.techStack[0]}
                </span>
                <span
                  className="text-sm"
                  style={{ color: categoryColors[project.category] }}
                >
                  {project.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cyber-black border border-neon-blue/50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Project Image Header */}
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-cyber-black/50 border border-cyber-white/20 rounded text-cyber-white hover:text-neon-blue transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Project Details */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-cyber text-neon-blue mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-cyber-white/70">
                        {selectedProject.description}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-neon-blue/10 border border-neon-blue/30 rounded text-neon-blue hover:bg-neon-blue/20 transition-colors"
                        >
                          <CodeBracketIcon className="w-5 h-5" />
                        </a>
                      )}
                      {selectedProject.liveLink && (
                        <a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-matrix-green/10 border border-matrix-green/30 rounded text-matrix-green hover:bg-matrix-green/20 transition-colors"
                        >
                          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h3 className="text-michigan-maize font-tech font-semibold mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cyber-white/10 border border-cyber-white/20 rounded text-cyber-white/80 font-tech text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Meta */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-cyber-white/60">Status</span>
                      <p className="text-cyber-white font-tech capitalize">
                        {selectedProject.status.replace("-", " ")}
                      </p>
                    </div>
                    <div>
                      <span className="text-cyber-white/60">Category</span>
                      <p className="text-cyber-white font-tech capitalize">
                        {selectedProject.category}
                      </p>
                    </div>
                    <div>
                      <span className="text-cyber-white/60">Year</span>
                      <p className="text-cyber-white font-tech">
                        {selectedProject.year}
                      </p>
                    </div>
                    {selectedProject.impact && (
                      <div>
                        <span className="text-cyber-white/60">Impact</span>
                        <p className="text-cyber-white font-tech">
                          {selectedProject.impact}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveProjectShowcase;
