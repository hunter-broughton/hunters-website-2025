"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  CircleStackIcon,
  CommandLineIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import JobList from "./components/JobList";
import Projects from "./components/Projects_New";
import CypherText from "./components/CypherText";
import HeroTypewriter from "./components/HeroTypewriter";
import Navbar from "./components/Navbar";
import LastCommit from "./components/LastCommit";
import ExternalLinks from "./components/ExternalLinks";
import HeroImage from "./components/HeroImage";
import AboutSlideshow from "./components/AboutSlideshow";
import ParticleSystem from "./components/ParticleSystem";
import GlitchCard from "./components/GlitchCard";
import { GeometricBackground } from "./components/GeometricShapes";
import SkillsConstellation from "./components/SkillsConstellation";
import DataStream, {
  HolographicText,
  ScanLine,
} from "./components/CyberpunkEffects";
import PageLoader from "./components/PageLoader";
import PortfolioChatbot from "./components/PortfolioChatbot";

// Component for daily commits
const DailyCommits = () => {
  const [commitCount, setCommitCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyCommits = async () => {
      try {
        // Use our new API route that can access private repos
        const response = await fetch("/api/github/daily-commits");

        if (response.ok) {
          const data = await response.json();
          setCommitCount(data.count);
        } else {
          // Fallback to original method if API route fails
          const today = new Date();
          const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          ).toISOString();
          const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
          ).toISOString();

          const searchResponse = await fetch(
            `https://api.github.com/search/commits?q=author:hunter-broughton+committer-date:${
              startOfDay.split("T")[0]
            }..${endOfDay.split("T")[0]}`
          );

          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            setCommitCount(searchData.total_count);
          } else {
            setCommitCount(0);
          }
        }
      } catch (error) {
        console.error("Error fetching daily commits:", error);
        setCommitCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyCommits();
  }, []);

  if (loading) {
    return (
      <div className="text-michigan-maize font-tech text-sm md:text-base">
        <span className="text-cyber-white/40">commits today:</span>{" "}
        <span className="animate-pulse text-matrix-green">loading...</span>
      </div>
    );
  }

  return (
    <div className="text-michigan-maize font-tech text-sm md:text-base">
      <span className="text-cyber-white/40">commits today:</span>{" "}
      <span className="text-matrix-green">{commitCount}</span>
      {commitCount === 1 ? " commit" : " commits"}
    </div>
  );
};

const techStack = [
  "Full-Stack Development",
  "Machine Learning",
  "Cloud Computing",
  "Financial Modeling",
  "Firmware Engineering",
  "Database Design",
  "API Development",
  "DevOps",
  "Mobile Development",
];

const languageStack = [
  "JavaScript (React • Vue • Angular • Node)",
  "Python (PyTorch • Pandas • PyTest • PyVisa)",
  "C++",
  "C",
  "R",
  "Java",
  "TypeScript",
  "Java",
  "SQL (PostgreSQL • MySQL • SQLite)",
  "HTML/CSS",
  "MongoDB (Mongoose • Express)",
];

const TypewriterText = ({
  text,
  delay = 100,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className="font-tech">
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">▊</span>}
    </span>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-neon-blue z-[100]"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

const SideNav = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Triggers when section is in middle of viewport
        threshold: 0,
      }
    );

    // Observe all sections except contact
    ["home", "about", "skills", "experience", "education", "projects"].forEach(
      (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) observer.observe(element);
      }
    );

    return () => observer.disconnect();
  }, []);

  const sections = [
    { id: "home", href: "#home" },
    { id: "about", href: "#about" },
    { id: "skills", href: "#skills" },
    { id: "experience", href: "#experience" },
    { id: "education", href: "#education" },
    { id: "projects", href: "#projects" },
    { id: "newsletter", href: "#newsletter", label: "Subscribe to Daily News" },
  ];

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {sections.map((section) => (
        <motion.a
          key={section.id}
          href={section.href}
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
            activeSection === section.id
              ? "bg-neon-blue border-neon-blue shadow-[0_0_10px_rgba(0,128,255,0.5)]"
              : "border-cyber-white/30 hover:border-neon-blue"
          }`}
          whileHover={{ scale: 1.2 }}
          onClick={(e) => {
            e.preventDefault();
            if (section.id === "newsletter") {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            } else {
              document
                .getElementById(section.id)
                ?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          title={section.label}
        />
      ))}
    </motion.div>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState<
    "CS" | "ECON"
  >("CS");
  const [isMounted, setIsMounted] = useState(false);

  // Ensure client-side only rendering for loading animation
  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);
  }, []);

  // Course data organized by category
  const coursework: Record<
    "CS" | "ECON",
    Array<{ name: string; number: string; link: string }>
  > = {
    CS: [
      {
        name: "Intro to AI",
        number: "EECS 492",
        link: "https://web.eecs.umich.edu/~kuipers/teaching/eecs492-F11.html",
      },
      {
        name: "Software Engineering",
        number: "EECS 481",
        link: "https://eecs481.org/",
      },
      {
        name: "Mathematics of Machine Learning",
        number: "EECS 298",
        link: "https://rampure.org/math-for-ML/",
      },
      {
        name: "Computer Organization",
        number: "EECS 370",
        link: "https://eecs370.github.io/",
      },
      {
        name: "Theory of Computation",
        number: "EECS 376",
        link: "https://eecs376.org/",
      },
      {
        name: "Data Structures and Algorithms",
        number: "EECS 281",
        link: "https://eecs281staff.github.io/eecs281.org/",
      },
      {
        name: "Discrete Math",
        number: "EECS 203",
        link: "https://eecs203.github.io/eecs203.org/",
      },
      {
        name: "Calculus 3",
        number: "MATH 215",
        link: "https://lsa.umich.edu/math/undergraduates/undergraduate-math-courses/200-level-math-courses.html",
      },
      {
        name: "Intro to Data Science",
        number: "STATS 206",
        link: "https://dept.stat.lsa.umich.edu/~kshedden/stats206/",
      },
    ],
    ECON: [
      {
        name: "Game Theory",
        number: "ECON 398",
        link: "https://www.coursicle.com/umich/courses/ECON/398/",
      },
      {
        name: "Intermediate Microeconomics",
        number: "ECON 401",
        link: "https://secure.rackham.umich.edu/course-list/course-list.php?rackham=Y&program=Economics",
      },
      {
        name: "Intermediate Macroeconomics",
        number: "ECON 402",
        link: "https://secure.rackham.umich.edu/course-list/course-list.php?rackham=Y&program=Economics",
      },
      {
        name: "Business Cycle Theory",
        number: "ECON 396",
        link: "https://secure.rackham.umich.edu/course-list/course-list.php?rackham=Y&program=Economics",
      },
      {
        name: "Macroeconomic Theory",
        number: "ECON 102",
        link: "https://secure.rackham.umich.edu/course-list/course-list.php?rackham=Y&program=Economics",
      },
      {
        name: "Microeconomic Theory",
        number: "ECON 101",
        link: "https://secure.rackham.umich.edu/course-list/course-list.php?rackham=Y&program=Economics",
      },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !fadingOut) {
        setFadingOut(true);
        setTimeout(() => {
          setShowArrow(false);
        }, 300);
      } else if (window.scrollY <= 50 && fadingOut) {
        setFadingOut(false);
        setShowArrow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fadingOut]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <main className="min-h-screen bg-michigan-dark text-michigan-white overflow-hidden relative">
        {/* Page Loader with AnimatePresence - only render on client */}
        <AnimatePresence>
          {isMounted && isLoading && (
            <PageLoader onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        {/* Enhanced Background Layers */}
        <div className="fixed inset-0 overflow-hidden z-[1]">
          {/* Static Cyberpunk Circuit Background */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,203,5,0.12)_1px,transparent_1px),linear-gradient(0deg,rgba(255,203,5,0.12)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Diagonal circuit traces */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(51,153,255,0.08)_1px,transparent_1px),linear-gradient(-45deg,rgba(51,153,255,0.08)_1px,transparent_1px)] bg-[size:120px_120px]" />

          {/* Geometric shapes background */}
          <GeometricBackground density="low" />

          {/* Enhanced fade overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-michigan-dark/40 via-michigan-dark/20 to-michigan-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-michigan-dark/30 via-transparent to-michigan-dark/30" />
        </div>

        {/* Interactive Particle System - client-side only */}
        {isMounted && <ParticleSystem />}

        <ScrollProgress />
        <Navbar />
        {/* Rest of the content with adjusted padding for the terminal header */}
        <div className="pt-20 md:pt-24 relative z-[10]">
          {/* Hero Section */}
          <section
            id="home"
            className="min-h-screen flex items-center justify-center relative px-4 md:px-8"
          >
            <div className="max-w-7xl w-full mt-4 sm:mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left side - Text content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 md:space-y-8 order-2 lg:order-1"
                >
                  <div className="space-y-2">
                    <motion.p
                      className="text-michigan-maize font-tech text-sm md:text-base tracking-[0.2em] uppercase"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      &lt; npm run dev --port=3000 /&gt;
                    </motion.p>

                    {/* Terminal Container */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-michigan-dark/95 border border-tech-gray rounded-lg p-3 md:p-4 font-mono backdrop-blur-sm overflow-x-auto"
                    >
                      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-cyber-white/60 mb-2 whitespace-nowrap">
                        <span className="text-michigan-maize">
                          hunter@umich-dev
                        </span>
                        <span>:~/portfolio$</span>
                        <span className="hidden sm:inline">
                          git log --oneline | head -1
                        </span>
                        <span className="sm:hidden">git log</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative z-50"
                      >
                        <HeroTypewriter />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="flex items-start gap-1 text-xs md:text-base font-tech flex-wrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="text-cyber-white/40">&lt;</span>
                      <span className="text-neon-blue">dev</span>
                      <span className="text-cyber-white/40"> </span>
                      <span className="text-cyber-white/40">stack=</span>
                      <span className="text-michigan-maize">
                        "react|node|python"
                      </span>
                      <span className="text-cyber-white/40"> </span>
                      <span className="text-cyber-white/40">/&gt;</span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="pl-4 border-l-2 border-michigan-maize/30 space-y-3 md:space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-lg md:text-xl text-cyber-white/80 font-tech">
                      A developer who loves to learn and build.
                    </p>
                    <p className="text-cyber-white/60 font-tech text-sm md:text-base leading-relaxed">
                      I solve complex, real-world problems using efficient,
                      high-impact software. From machine learning and resilient
                      web systems to financial modeling and forecasts, I develop
                      efficient, cleanly structured code that's built to last
                      and ready to scale.{" "}
                      <span className="text-neon-blue">
                        {" "}
                        I'm currently searching for an internship opportunity
                        for Summer 2026, and a full-time position starting
                        December 2026.{" "}
                      </span>
                    </p>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
                      <motion.div
                        className="flex flex-col md:flex-row gap-2 md:gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <DailyCommits />
                        <div className="text-neon-blue font-tech text-sm md:text-base">
                          <span className="text-cyber-white/40">
                            current location:
                          </span>{" "}
                          Palo Alto, CA
                        </div>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      {isMounted && <LastCommit />}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right side - Hero Image */}
                <div className="order-1 lg:order-2">
                  <HeroImage />
                </div>
              </div>
            </div>

            {/* Decorative Elements - positioned relative to the section */}
            <motion.div
              className="absolute top-1/4 right-8 mt-[-10vh] sm:mt-0 z-40 hidden xl:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {isMounted && <CypherText />}
            </motion.div>

            {/* Scroll Indicator */}
            {showArrow && (
              <motion.div
                className={`scroll-indicator ${fadingOut ? "fade-out" : ""}`}
                onClick={() => scrollToSection("about")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="arrow" />
              </motion.div>
            )}
          </section>

          {/* About Section */}
          <section
            id="about"
            className="min-h-screen flex items-center relative px-8 py-20"
          >
            <div className="max-w-4xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl font-display text-michigan-maize">
                  / about me
                </h2>
                <div className="space-y-6 max-w-none">
                  <p className="text-cyber-white/80 text-base leading-relaxed">
                    Hey, I'm <span className="text-neon-blue">Hunter</span> — a
                    passionate developer who loves building innovative
                    solutions. I'm a CS and Econ major at the University of
                    Michigan and most days you'll find me coding, building side
                    projects, and diving into something that piques my interest
                    in tech. I thrive on challenges and enjoy creating software
                    that makes a difference. Whether it's a web app, a machine
                    learning model, or firmware, I'm always eager to learn and
                    grow in my craft.
                  </p>

                  <p className="text-cyber-white/80 text-base leading-relaxed">
                    I'm interested in{" "}
                    <span className="text-neon-blue">
                      full-stack development
                    </span>
                    , AI/ML, computing hardware, and leveraging all of them to
                    create user experiences that matter. I enjoy working on
                    projects that combine <em>creativity</em> and{" "}
                    <em>purpose</em> with <em>technical rigor</em>, and I'm
                    always searching for new challenges.
                  </p>

                  <p className="text-cyber-white/80 text-base leading-relaxed">
                    When I'm not coding, you can find me backpacking in
                    Washington, playing the guitar, struggling to learn how to
                    love running, or constantly tweaking my golf swing. From big
                    ideas, to clean execution, I love turning a vision into
                    reality.{" "}
                    <span className="text-michigan-maize">
                      Hiring? Collaborating? Just Curious?
                    </span>{" "}
                    <a
                      href="/socials"
                      className="text-neon-blue hover:text-michigan-maize transition-colors hover:no-underline"
                    >
                      Lets connect!
                    </a>
                  </p>
                </div>

                {/* Personal Photos Slideshow */}
                <div className="mt-12">
                  <AboutSlideshow />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Skills Section */}
          <section
            id="skills"
            className="min-h-screen flex items-center relative px-8 py-20"
          >
            <div className="max-w-6xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl font-display text-michigan-maize">
                  / technologies & skills
                </h2>
                <SkillsConstellation />
              </motion.div>
            </div>
          </section>

          {/* Experience Section */}
          <section
            id="experience"
            className="min-h-screen flex items-center relative px-8 py-20"
          >
            <div className="max-w-4xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl font-display text-michigan-maize">
                  / experience
                </h2>
                <JobList />
              </motion.div>
            </div>
          </section>

          {/* Education Section */}
          <section
            id="education"
            className="min-h-screen flex items-center relative px-8 py-20"
          >
            <div className="max-w-4xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl font-display text-michigan-maize">
                  / education
                </h2>

                <div className="space-y-8">
                  {/* University */}
                  <GlitchCard glitchIntensity="low">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-michigan-light/20 border border-michigan-blue/20 rounded-sm p-6 hover:border-michigan-maize/30 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-cyber text-cyber-white mb-1">
                            University of Michigan
                          </h3>
                          <p className="text-neon-blue font-tech">
                            Bachelor of Science in Computer Science and
                            Economics
                          </p>
                        </div>
                        <span className="text-michigan-maize font-tech text-sm mt-2 md:mt-0">
                          August 2023 - December 2026
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-neon-blue font-tech">
                            Relevant Coursework
                          </h4>
                          <div className="flex gap-2">
                            <motion.button
                              onClick={() => setSelectedCourseCategory("CS")}
                              className={`px-3 py-1 font-tech text-sm border transition-all ${
                                selectedCourseCategory === "CS"
                                  ? "border-michigan-maize text-michigan-maize bg-michigan-maize/10"
                                  : "border-cyber-white/20 text-cyber-white/60 hover:border-michigan-maize/50"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Computer Science
                            </motion.button>
                            <motion.button
                              onClick={() => setSelectedCourseCategory("ECON")}
                              className={`px-3 py-1 font-tech text-sm border transition-all ${
                                selectedCourseCategory === "ECON"
                                  ? "border-michigan-maize text-michigan-maize bg-michigan-maize/10"
                                  : "border-cyber-white/20 text-cyber-white/60 hover:border-michigan-maize/50"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Economics
                            </motion.button>
                          </div>
                        </div>
                        <motion.div
                          key={selectedCourseCategory}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-2 md:grid-cols-3 gap-3"
                        >
                          {coursework[selectedCourseCategory].map(
                            (course, index) => (
                              <motion.a
                                key={course.number}
                                href={course.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="bg-michigan-blue/20 border border-michigan-maize/20 rounded-sm p-3 hover:border-michigan-maize/50 hover:bg-michigan-maize/10 transition-all cursor-pointer group"
                              >
                                <div className="text-michigan-maize font-tech text-sm mb-1 group-hover:text-michigan-maize-light transition-colors">
                                  {course.number}
                                </div>
                                <div className="text-cyber-white/80 text-sm leading-tight group-hover:text-cyber-white transition-colors">
                                  {course.name}
                                </div>
                              </motion.a>
                            )
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  </GlitchCard>

                  {/* Academic Projects */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-michigan-light/20 border border-michigan-blue/20 rounded-sm p-6"
                  >
                    <h3 className="text-xl font-cyber text-cyber-white mb-4">
                      Academic Highlights
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-neon-blue font-tech">
                            HTTPie Open Source Contribution
                          </h4>
                          <ExternalLinks
                            githubLink="https://github.com/hunter-broughton/cli"
                            openLink="https://httpie.io/"
                          />
                        </div>
                        <p className="text-cyber-white/70 text-base">
                          Conducted my final project for EECS 481 (Software
                          Engineering) by contributing to the HTTPie project,
                          enhancing its authentication, error handling, and test
                          suite.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-neon-blue font-tech mb-2">
                          United States TSP Solver
                        </h4>
                        <p className="text-cyber-white/70 text-base">
                          Implemented a C++ program that uses Prim and Kruksal's
                          algorithm to solve the Traveling Salesman Problem for
                          the United States. The program uses a custom-built
                          data structure to store the cities and uses both
                          algorithms to find the minimum spanning tree.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-neon-blue font-tech mb-2">
                          Searching through a Grid
                        </h4>
                        <p className="text-cyber-white/70 text-base">
                          A Java project that used the scientific method to test
                          the efficiency of various search algorithms (BFS, DFS,
                          and A*) on a grid. The program uses a custom-built
                          data structures to store the grid and a GUI to
                          visualize the search.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            className="min-h-screen flex items-center relative px-8 py-20"
          >
            <div className="max-w-6xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl font-display text-michigan-maize">
                  / projects
                </h2>
                <Projects />
              </motion.div>
            </div>
          </section>
        </div>

        {/* Credits */}
        <footer className="py-8 text-center text-cyber-white/60 font-tech text-base relative z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto px-4"
          >
            <div className="border border-neon-blue/20 bg-cyber-black/50 backdrop-blur-sm py-3 px-6 rounded-sm">
              Built by Hunter Broughton.{" "}
              <a
                href="https://github.com/hunter-broughton/hunters-website-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-blue hover:underline"
              >
                View on Github
              </a>
            </div>
          </motion.div>
        </footer>

        {/* Contact Button */}
        <motion.div
          className="fixed bottom-8 right-8 hidden md:block w-fit h-fit z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.a
            href="/socials"
            className="relative py-4 px-8 bg-cyber-black/80 border-2 border-neon-blue/40 rounded-sm text-neon-blue font-tech items-center gap-3 hover:border-neon-blue/80 transition-all duration-300 flex group overflow-hidden backdrop-blur-sm"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />

            {/* Glitch border effect */}
            <div
              className="absolute inset-0 border-2 border-michigan-maize/30 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 animate-pulse"
              style={{ animationDelay: "0.1s" }}
            />

            {/* Terminal prompt indicator */}
            <div className="flex items-center gap-2 text-matrix-green">
              <span className="text-sm font-tech">$</span>
              <CommandLineIcon className="w-4 h-4 animate-pulse" />
            </div>

            {/* Social icons with enhanced hover effects */}
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 group-hover:scale-110 group-hover:text-michigan-maize transition-all duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <svg
                className="w-5 h-5 group-hover:scale-110 group-hover:text-michigan-maize transition-all duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <EnvelopeIcon className="w-5 h-5 group-hover:scale-110 group-hover:text-michigan-maize transition-all duration-300" />
              <ChatBubbleLeftRightIcon className="w-5 h-5 group-hover:scale-110 group-hover:text-michigan-maize transition-all duration-300" />
            </div>

            {/* Enhanced text with terminal styling */}
            <div className="flex items-center gap-2">
              <span className="group-hover:text-michigan-maize transition-colors duration-300 font-tech font-semibold tracking-wide">
                ./initiate_contact
              </span>
              <motion.div
                className="text-matrix-green"
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                _
              </motion.div>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:text-michigan-maize transition-all duration-300" />
            </div>

            {/* Holographic overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none animate-pulse" />
          </motion.a>
        </motion.div>
      </main>

      {/* AI Chatbot */}
      <PortfolioChatbot />
    </>
  );
};

export default Home;
