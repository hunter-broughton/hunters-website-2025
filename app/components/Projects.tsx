"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FolderIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";
import Image from "next/image";

interface SpotlightProject {
  title: string;
  desc: string;
  techStack: string;
  link: string;
  open: string;
  image: string;
  objectFit?: string;
}

const spotlightProjects: Record<string, SpotlightProject> = {
  ThriftSwipe: {
    title: "ThriftSwipe",
    desc: "Building ThriftSwipe, an online marketplace for all things thrift. Our AI algorithm matches users with clothing based on their preferences and style, making it easier to find unique and sustainable fashion. Currently looking to scale the platform with students from the University of Michigan",
    techStack: "Express, MongoDB, React, Tailwind, Python",
    link: "https://github.com/hunter-broughton/ThriftSwipe",
    open: "",
    image: "/assets/ThriftSwipe.jpg",
  },
  GreekLink: {
    title: "GreekLink",
    desc: "GreekLink is a social media platform for all Greek life across the country. It allows users to annonymously chat and connect within their school community. I helped lead both the front-end and back-end web development.",
    techStack:
      "Next.js, React, Typescript, Tailwind, Firebase, Firestore, Python",
    link: "https://www.greeklink.xyz/",
    open: "https://github.com/rkaelle/greeklink",
    image: "/assets/GreekLink.jpeg",
  },
  "Chrome Dino Time Travel - Video Game": {
    title: "Chrome Dino Time Travel - Video Game",
    desc: "Worked with a team to create a level based parody of Chrome's Dino game featuring different time periods. ",
    techStack: "PyGame, Python",
    link: "",
    open: "https://github.com/mkPuzon/CS269DinoGame",
    image: "/assets/chromeDino.png",
    objectFit: "contain",
  },
};

const projects = {
  ThriftSwipe: {
    title: "ThriftSwipe",
    desc: "Building ThriftSwipe, an online marketplace for all things thrift. Our AI algorithm matches users with clothing based on their preferences and style, making it easier to find unique and sustainable fashion. Currently looking to scale the platform with students from the University of Michigan",
    techStack: "Express, MongoDB, React, Tailwind, Python",
    link: "https://github.com/hunter-broughton/ThriftSwipe",
    open: "",
  },
  GreekLink: {
    title: "GreekLink",
    desc: "GreekLink is a social media platform for all Greek life across the country. It allows users to annonymously chat and connect within their school community. I helped lead both the front-end and back-end web development.",
    techStack:
      "Next.js, React, Typescript, Tailwind, Firebase, Firestore, Python",
    open: "https://www.greeklink.xyz/",
    link: "https://github.com/rkaelle/greeklink",
  },
  "Automation and GUI of S-Parameter Analysis: TC-720 and VNA": {
    desc: "Developed a python program to automate S-parameter analysis using a TC-720 temperature controller and a VNA. The script allows for easy data collection and analysis, streamlining the process of measuring and interpreting S-parameters. Also developed an interactive GUI to visualize the data and provide a user-friendly interface for analysis.",
    techStack: "Python, Pyvisa, Tkinter, Numpy, Matplotlib",
    link: "",
    open: "",
  },
  ChromeDinoTimeTravel: {
    title: "Chrome Dino Time Travel - Video Game",
    desc: "Worked with a team to create a level based parody of Chrome's Dino game featuring different time periods. ",
    techStack: "PyGame, Python",
    link: "https://github.com/mkPuzon/CS269DinoGame",
    open: "",
  },
  "HTTPie Authentication Contributions": {
    desc: "Added a new authentication method to HTTPie, a command-line HTTP client, allowing users to authenticate with a username and password while the program correctly parses it. ",
    techStack: "Python, PyTest, JavaScript, React",
    link: "https://github.com/hunter-broughton/cli",
    open: "https://httpie.io/",
  },
};

const Projects = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const totalSlides = Object.keys(spotlightProjects).length;

  // Auto-rotate slides
  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [totalSlides, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="space-y-16">
      {/* Spotlight Projects Carousel */}
      <div
        className="relative h-[600px] w-full overflow-hidden rounded-lg border border-neon-blue/20 group cursor-pointer"
        onClick={togglePlayPause}
      >
        {Object.entries(spotlightProjects).map(([key, project], index) => (
          <motion.div
            key={key}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`${
                  project.objectFit ? "object-contain" : "object-cover"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-cyber text-neon-blue mb-2">
                  {project.title}
                </h3>
                <p className="text-cyber-white/80 mb-4">{project.desc}</p>
                <p className="text-matrix-green font-tech text-sm mb-4">
                  {project.techStack}
                </p>
                <ExternalLinks
                  githubLink={project.link}
                  openLink={project.open}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          {currentSlide > 0 && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevSlide();
              }}
              className="p-2 bg-cyber-black/50 backdrop-blur-sm border border-neon-blue/20 rounded-r-sm text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity ml-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </motion.button>
          )}
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          {currentSlide < totalSlides - 1 && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                goToNextSlide();
              }}
              className="p-2 bg-cyber-black/50 backdrop-blur-sm border border-neon-blue/20 rounded-l-sm text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity mr-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </motion.button>
          )}
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {Object.keys(spotlightProjects).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-neon-blue" : "bg-cyber-white/30"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
            />
          ))}
        </div>

        {/* Play/Pause Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            className="bg-michigan-dark/50 backdrop-blur-sm border border-michigan-maize/30 rounded-sm p-3 text-michigan-maize hover:bg-michigan-maize/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(projects).map(([key, project], index) => (
          <FadeInSection key={key} delay={`${index * 100}ms`}>
            <motion.div
              className="p-6 border border-cyber-white/20 hover:border-neon-blue bg-cyber-black/50 backdrop-blur-sm transition-colors h-[320px] flex flex-col"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-4">
                <FolderIcon className="w-8 h-8 text-matrix-green" />
                <ExternalLinks
                  githubLink={project.link}
                  openLink={project.open}
                />
              </div>
              <h3 className="text-xl font-cyber text-neon-blue mb-2">{key}</h3>
              <p className="text-cyber-white/70 mb-4 text-sm line-clamp-4 flex-grow">
                {project.desc}
              </p>
              <p className="text-matrix-green font-tech text-xs mt-auto">
                {project.techStack}
              </p>
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default Projects;
