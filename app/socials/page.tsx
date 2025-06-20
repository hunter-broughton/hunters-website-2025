"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import TypewriterText from "@/app/components/TypewriterText";
import { GeometricBackground } from "@/app/components/GeometricShapes";
import ParticleSystem from "@/app/components/ParticleSystem";

const SocialsPage = () => {
  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white">
      {/* Terminal Header */}
      <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
        <div className="flex items-center gap-2 text-neon-blue -ml-1">
          <CommandLineIcon className="w-4 h-4" />
          <span className="text-matrix-green">~</span>
          <span>/</span>
          <span>cd hunter-broughton/portfolio/</span>
          <TypewriterText text="socials" prefix="" />
        </div>
      </div>

      {/* Return Home Button */}
      <Link
        href="/"
        className="fixed top-16 left-8 py-2 px-4 bg-nord-polar-2/80 border border-neon-blue/30 rounded-sm text-neon-blue font-tech flex items-center gap-2 hover:bg-neon-blue/20 transition-colors z-50"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Return Home
      </Link>

      <main className="min-h-screen bg-cyber-black text-cyber-white overflow-hidden relative">
        {/* Floating Geometric Shapes */}
        <GeometricBackground density="medium" />

        {/* Particle System */}
        <ParticleSystem />

        {/* Background Grid */}
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(76,86,106,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,86,106,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

        <div className="container mx-auto px-4 pt-32 md:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-2 border-neon-blue/30 hover:border-neon-blue/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(51,153,255,0.3)] group"
            >
              <Image
                src="/assets/headshot-optimized.jpeg"
                alt="Hunter Broughton"
                width={320}
                height={320}
                quality={100}
                priority
                sizes="(max-width: 768px) 128px, 160px"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                style={{
                  imageRendering: "crisp-edges",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <h1 className="text-4xl md:text-5xl font-cyber text-neon-blue tracking-wider hover:text-michigan-maize transition-colors duration-300">
                HUNTER BROUGHTON
              </h1>
              <p className="text-cyber-white/60 font-tech text-sm md:text-base tracking-wider hover:text-cyber-white/80 transition-colors duration-300">
                CS & Econ Student | Software Engineer
              </p>
            </motion.div>

            {/* Intro Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-cyber-white/60 font-tech text-lg md:text-xl hover:text-cyber-white/80 transition-colors duration-300"
            >
              Want to connect? Here are all the ways you can reach me:
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
            >
              <motion.button
                onClick={() =>
                  window.open("https://hunterbroughton.com", "_blank")
                }
                className="group p-6 border border-cyber-white/20 hover:border-neon-blue rounded-sm transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(51,153,255,0.2)] hover:bg-neon-blue/5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-neon-blue group-hover:text-matrix-green transition-colors">
                  <svg
                    className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                  <span className="font-tech text-sm font-semibold">
                    Website
                  </span>
                </div>
              </motion.button>

              <motion.button
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/hunter-broughton/",
                    "_blank"
                  )
                }
                className="group p-6 border border-cyber-white/20 hover:border-neon-blue rounded-sm transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(51,153,255,0.2)] hover:bg-neon-blue/5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-neon-blue group-hover:text-matrix-green transition-colors">
                  <svg
                    className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span className="font-tech text-sm font-semibold">
                    LinkedIn
                  </span>
                </div>
              </motion.button>

              <motion.button
                onClick={() =>
                  window.open("https://github.com/hunter-broughton", "_blank")
                }
                className="group p-6 border border-cyber-white/20 hover:border-neon-blue rounded-sm transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(51,153,255,0.2)] hover:bg-neon-blue/5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-neon-blue group-hover:text-matrix-green transition-colors">
                  <svg
                    className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                  <span className="font-tech text-sm font-semibold">
                    GitHub
                  </span>
                </div>
              </motion.button>

              <motion.button
                onClick={() =>
                  window.open("mailto:huntbro@umich.edu", "_blank")
                }
                className="group p-6 border border-cyber-white/20 hover:border-neon-blue rounded-sm transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(51,153,255,0.2)] hover:bg-neon-blue/5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-neon-blue group-hover:text-matrix-green transition-colors">
                  <svg
                    className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span className="font-tech text-sm font-semibold">Email</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SocialsPage;
