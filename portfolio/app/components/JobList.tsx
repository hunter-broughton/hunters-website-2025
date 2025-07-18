"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";

interface Job {
  company: string;
  jobTitle: string;
  duration: string;
  location: string;
  desc: (string | JSX.Element)[];
  companyLink?: string;
  githubLink?: string;
  logo?: string;
}

const experienceItems: Job[] = [
  {
    company: "Credo Semiconductor",
    jobTitle: "System and Software Engineering Intern",
    duration: "May 2025 - August 2025",
    location: "San Jose, CA",
    companyLink: "https://credosemi.com/",
    logo: "/assets/credo.jpg",
    desc: [
      <>
        Developed features for the new{" "}
        <span className="text-neon-blue font-bold">PCIe</span> software: Pilot
        using <span className="text-neon-blue font-bold">Vue</span>,{" "}
        <span className="text-neon-blue font-bold">Vite</span>,{" "}
        <span className="text-neon-blue font-bold">JavaScript</span>,{" "}
        <span className="text-neon-blue font-bold">Python</span>,{" "}
        <span className="text-neon-blue font-bold">C</span>, and{" "}
        <span className="text-neon-blue font-bold">Fast API</span>
      </>,
      <>
        Implemented efficient algorithms for{" "}
        <span className="text-neon-blue font-bold">PCIe-SDK</span> with{" "}
        <span className="text-neon-blue font-bold">Python</span>,{" "}
        <span className="text-neon-blue font-bold">PyTest</span>,{" "}
        <span className="text-neon-blue font-bold">Regex</span>, and{" "}
        <span className="text-neon-blue font-bold">Multithreading</span>,
        boosting throughput speed by{" "}
        <span className="text-neon-blue font-bold">30%</span>
      </>,
      <>
        Programmed{" "}
        <span className="text-neon-blue font-bold">S-parameter analysis</span>{" "}
        automation and{" "}
        <span className="text-neon-blue font-bold">
          Proportional-Integral-Derivative Controllers
        </span>{" "}
        to streamlinbe optical testing
      </>,
      <>
        Gained hands-on experience with{" "}
        <span className="text-neon-blue font-bold">
          Thermoelectric Temperature Controllers (TC-720)
        </span>
        , a{" "}
        <span className="text-neon-blue font-bold">
          Vector Network Analyzer
        </span>
        , and <span className="text-neon-blue font-bold">Grafana</span>
      </>,
    ],
  },
  {
    company: "Vloggi",
    jobTitle: "Software Developer Intern",
    duration: "June 2024 - August 2024",
    location: "Sydney, Australia",
    companyLink: "https://vloggi.com/",
    logo: "/assets/Vloggi-logo-square.jpg",
    desc: [
      <>
        Engineered full-stack features for Vloggi: a platform that offers{" "}
        <span className="text-neon-blue font-bold">MP4</span> data collection
        and management for companies
      </>,
      <>
        Developed and optimized web interfaces to optimize product usage using{" "}
        <span className="text-neon-blue font-bold">React</span>,{" "}
        <span className="text-neon-blue font-bold">Tailwind CSS</span>,
         and{" "}
        <span className="text-neon-blue font-bold">TypeScript</span>
      </>,
      <>
        Integrated configurable{" "}
        <span className="text-neon-blue font-bold">CSS</span> components to
        address diverse client needs on the Vloggi platform
      </>,
      <>
        Integrated Vloggi's front-end with a{" "}
        <span className="text-neon-blue font-bold">MySQL</span> backend using{" "}
        <span className="text-neon-blue font-bold">Node.js</span> and deployed
        it using <span className="text-neon-blue font-bold">AWS</span> and{" "}
        <span className="text-neon-blue font-bold">Docker</span>
      </>,
    ],
  },
  {
    company: "SparkRacing",
    jobTitle: "Data Engineer",
    duration: "January 2024 - May 2024",
    location: "Ann Arbor, MI",
    companyLink: "https://spark.engin.umich.edu/",
    logo: "/assets/spark.png",
    desc: [
      <>
        Created a system design to convert{" "}
        <span className="text-neon-blue font-bold">16-bit diagnostic data</span>{" "}
        into a readable,{" "}
        <span className="text-neon-blue font-bold">real-time message</span> for
        the driver
      </>,
      <>
        Coded the{" "}
        <span className="text-neon-blue font-bold">Bike Diagnostic system</span>{" "}
        using <span className="text-neon-blue font-bold">Python</span> and the{" "}
        <span className="text-neon-blue font-bold">Pandas</span> library
      </>,
      <>
        Tested the software by implementing{" "}
        <span className="text-neon-blue font-bold">unit tests</span> and program
        test files
      </>,
      <>
        Implemented the software into our{" "}
        <span className="text-neon-blue font-bold">185+ MPH</span> race winning
        bike
      </>,
    ],
  },
];

const JobList = () => {
  const [selectedJob, setSelectedJob] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-8`}>
        {/* Job Navigation */}
        <div
          className={`${
            isMobile
              ? "flex flex-wrap justify-center gap-2"
              : "flex flex-col gap-4"
          }`}
        >
          {experienceItems.map((job, index) => (
            <motion.button
              key={job.company}
              onClick={() => setSelectedJob(index)}
              className={`${
                isMobile
                  ? "px-3 py-2 text-xs min-w-[120px]"
                  : "px-4 py-2 min-w-[200px]"
              } text-left font-tech text-sm border ${
                selectedJob === index
                  ? "border-michigan-maize text-michigan-maize bg-michigan-maize/10"
                  : "border-cyber-white/20 text-cyber-white/60 hover:border-michigan-maize/50"
              } transition-colors`}
              whileHover={{ x: isMobile ? 0 : 4 }}
            >
              <span className="text-michigan-maize/50 mr-1">{`0${
                index + 1
              }.`}</span>
              <span className={isMobile ? "truncate" : ""}>{job.company}</span>
            </motion.button>
          ))}
        </div>

        {/* Job Details */}
        <motion.div
          key={selectedJob}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 space-y-4"
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                {experienceItems[selectedJob].logo && (
                  <div className="flex-shrink-0">
                    <img
                      src={experienceItems[selectedJob].logo}
                      alt={`${experienceItems[selectedJob].company} logo`}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg border border-cyber-white/20 bg-cyber-white/5 p-2 cursor-pointer hover:border-michigan-maize/50 transition-colors"
                      onClick={() => {
                        if (experienceItems[selectedJob].companyLink) {
                          window.open(
                            experienceItems[selectedJob].companyLink,
                            "_blank"
                          );
                        }
                      }}
                    />
                  </div>
                )}

                {/* Job Info */}
                <div>
                  <h3 className="text-xl font-cyber text-neon-blue">
                    {experienceItems[selectedJob].jobTitle}
                  </h3>
                  <p className="text-michigan-maize font-tech">
                    @ {experienceItems[selectedJob].company}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <p className="text-cyber-white/60 font-tech text-sm">
                      {experienceItems[selectedJob].duration}
                    </p>
                    <p className="text-cyber-white/60 font-tech text-sm">
                      📍 {experienceItems[selectedJob].location}
                    </p>
                  </div>
                </div>
              </div>
              <ExternalLinks
                githubLink={experienceItems[selectedJob].githubLink}
                openLink={experienceItems[selectedJob].companyLink}
              />
            </div>
          </div>

          <ul className="space-y-4">
            {experienceItems[selectedJob].desc.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-cyber-white/80"
              >
                <span className="text-michigan-maize mt-1.5">▹</span>
                <span className="flex-1">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default JobList;
