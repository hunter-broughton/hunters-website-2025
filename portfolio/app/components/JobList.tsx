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
    company: "NeuroSpark AI",
    jobTitle: "Software Engineer Intern",
    duration: "September 2026 - Present",
    location: "Remote",
    companyLink: "https://neuro-spark.ai/",
    desc: [
      <>
        Owning the ground-up build of multi-tenant{" "}
        <span className="text-neon-blue font-bold">Kubernetes</span> clusters at
        a fast-growing AI startup serving{" "}
        <span className="text-neon-blue font-bold">hundreds of GPUs</span>
      </>,
      <>
        Built a chip-level{" "}
        <span className="text-neon-blue font-bold">GPU reservation</span>{" "}
        system, tuning{" "}
        <span className="text-neon-blue font-bold">autoscaling</span> and
        scheduling to maximize utilization at{" "}
        <span className="text-neon-blue font-bold">millions of tokens/day</span>
      </>,
      <>
        Cutting <span className="text-neon-blue font-bold">LLM cold-start</span>{" "}
        times by optimizing model weight and image distribution with{" "}
        <span className="text-neon-blue font-bold">peer-to-peer transfer</span>{" "}
        and <span className="text-neon-blue font-bold">R-Fork</span>
      </>,
      <>
        Hardening security with{" "}
        <span className="text-neon-blue font-bold">token federation</span> and
        building <span className="text-neon-blue font-bold">GPU telemetry</span>{" "}
        with Slack alerts, using{" "}
        <span className="text-neon-blue font-bold">Claude Code</span> daily
      </>,
    ],
  },
  {
    company: "Microsoft",
    jobTitle: "Software Engineer Intern, Azure Arc Kubernetes",
    duration: "May 2026 - July 2026",
    location: "Redmond, WA",
    companyLink: "https://Microsoft.com/",
    logo: "/assets/Mircrosoft.png",
    desc: [
      <>
        Built an{" "}
        <span className="text-neon-blue font-bold">Azure Arc Kubernetes</span>{" "}
        extension using <span className="text-neon-blue font-bold">Go</span>,
        automating private container registry integration across{" "}
        <span className="text-neon-blue font-bold">15K managed clusters</span>
      </>,
      <>
        Designed concurrent{" "}
        <span className="text-neon-blue font-bold">controllers</span> and{" "}
        <span className="text-neon-blue font-bold">webhooks</span> for{" "}
        <span className="text-neon-blue font-bold">workload-identity</span> auth
        with mutex-safe caching, eliminating long-lived secrets
      </>,
      <>
        Instrumented{" "}
        <span className="text-neon-blue font-bold">Azure Monitor</span> telemetry
        for <span className="text-neon-blue font-bold">Argo</span> and{" "}
        <span className="text-neon-blue font-bold">Flux</span> clusters,
        surfacing GitOps sync failures and configuration drift
      </>,
      <>
        Built an{" "}
        <span className="text-neon-blue font-bold">agentic AI workflow</span>{" "}
        autonomously resolving engineering issues, cutting resolution time on a
        15-issue benchmark
      </>,
    ],
  },
  {
    company: "Credo Semiconductor",
    jobTitle: "System Software Engineer Intern",
    duration: "May 2025 - August 2025",
    location: "San Jose, CA",
    companyLink: "https://credosemi.com/",
    logo: "/assets/credo.jpg",
    desc: [
      <>
        Built features for PILOT, Credo's{" "}
        <span className="text-neon-blue font-bold">PCIe</span> monitoring
        software, using <span className="text-neon-blue font-bold">Vue</span>,{" "}
        <span className="text-neon-blue font-bold">Python</span>,{" "}
        <span className="text-neon-blue font-bold">C</span>, and{" "}
        <span className="text-neon-blue font-bold">FastAPI</span> (REST/SSE)
      </>,
      <>
        Implemented{" "}
        <span className="text-neon-blue font-bold">multithreaded</span> test
        algorithms for PCIe lanes in{" "}
        <span className="text-neon-blue font-bold">Python</span>, boosting
        lane-tuning throughput by{" "}
        <span className="text-neon-blue font-bold">~30%</span>
      </>,
      <>
        Automated{" "}
        <span className="text-neon-blue font-bold">S-parameter analysis</span>{" "}
        and <span className="text-neon-blue font-bold">PID control loops</span>{" "}
        in Python, streamlining optical transceiver testing
      </>,
      <>
        Won company{" "}
        <span className="text-neon-blue font-bold">hackathon</span> with an EV
        charger system using{" "}
        <span className="text-neon-blue font-bold">Next.js</span>,{" "}
        <span className="text-neon-blue font-bold">React</span>,{" "}
        <span className="text-neon-blue font-bold">PostgreSQL</span>, and APIs;
        deployed on company intranet
      </>,
    ],
  },
  {
    company: "Vloggi",
    jobTitle: "Software Engineer Intern",
    duration: "May 2024 - August 2024",
    location: "Sydney, Australia",
    companyLink: "https://vloggi.com/",
    logo: "/assets/Vloggi-logo-square.jpg",
    desc: [
      <>
        Built <span className="text-neon-blue font-bold">React</span> +{" "}
        <span className="text-neon-blue font-bold">TypeScript</span> interfaces
        for enterprise video analytics, with lazy loading and pagination to cut
        page load times
      </>,
      <>
        Integrated a <span className="text-neon-blue font-bold">MySQL</span>{" "}
        backend with{" "}
        <span className="text-neon-blue font-bold">Node.js</span> REST APIs,
        enabling efficient querying of large-scale MP4 datasets
      </>,
      <>
        Containerized services with{" "}
        <span className="text-neon-blue font-bold">Docker</span> and deployed on{" "}
        <span className="text-neon-blue font-bold">AWS</span>, establishing a{" "}
        <span className="text-neon-blue font-bold">CI/CD</span> pipeline for
        production releases
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
