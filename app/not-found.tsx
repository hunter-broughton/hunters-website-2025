"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CommandLineIcon,
  ArrowLeftIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import TypewriterText from "@/app/components/TypewriterText";
import { GeometricBackground } from "@/app/components/GeometricShapes";
import DataStream, {
  HolographicText,
  ScanLine,
} from "@/app/components/CyberpunkEffects";

export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white relative overflow-hidden">
      {/* Background Effects */}
      <GeometricBackground />
      <DataStream direction="vertical" speed="slow" density="low" />
      <ScanLine />

      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(76,86,106,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,86,106,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

      {/* Terminal Header */}
      <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
        <div className="flex items-center gap-2 text-neon-blue">
          <CommandLineIcon className="w-4 h-4" />
          <span className="text-matrix-green">~</span>
          <span>/</span>
          <span>cd hunterbroughton/portfolio/</span>
          <TypewriterText text="404" prefix="" />
        </div>
      </div>

      {/* Navigation Bar */}
      <motion.nav
        className="fixed w-full py-3 md:py-6 px-3 md:px-8 flex justify-between items-center z-40 bg-cyber-black/50 backdrop-blur-sm top-12"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-xl md:text-2xl font-cyber tracking-wider"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-neon-blue">Hunter</span>
          <span className="text-matrix-green/50">&lt;</span>
          <span className="text-michigan-maize">Developer</span>
          <span className="text-matrix-green/50">/&gt;</span>
        </motion.div>

        {/* Navigation Actions */}
        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className="py-2 px-4 bg-neon-blue/10 border border-neon-blue/30 rounded-sm text-neon-blue font-tech flex items-center gap-2 hover:bg-neon-blue/20 transition-all duration-300 text-xs md:text-sm"
          >
            <HomeIcon className="w-4 h-4" />
            <span className="hidden md:inline">HOME</span>
          </Link>
        </div>
      </motion.nav>

      <main className="min-h-screen flex items-center justify-center relative px-4 md:px-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-4xl mx-auto relative z-10"
        >
          {/* 404 Display */}
          <motion.div
            className={`text-8xl md:text-[12rem] font-cyber text-neon-blue relative ${
              glitchActive ? "animate-pulse" : ""
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <HolographicText>404</HolographicText>
            {glitchActive && (
              <motion.div
                className="absolute inset-0 text-red-500 mix-blend-multiply"
                initial={{ x: 0 }}
                animate={{ x: [0, -2, 2, 0] }}
                transition={{ duration: 0.1, repeat: 2 }}
              >
                404
              </motion.div>
            )}
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-2xl md:text-4xl font-cyber text-cyber-white/90">
                <span className="text-michigan-maize">&gt;</span> PAGE_NOT_FOUND
              </p>
              <div className="text-cyber-white/60 font-tech space-y-1">
                <p className="text-sm md:text-base">
                  <span className="text-matrix-green">$</span> ls -la
                  ./requested-page
                </p>
                <p className="text-red-400 text-sm">
                  ls: cannot access './requested-page': No such file or
                  directory
                </p>
              </div>
            </div>

            <div className="bg-cyber-black/50 border border-neon-blue/20 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-cyber-white/70 font-tech text-sm md:text-base leading-relaxed">
                Looks like you've ventured into uncharted digital territory.
                <br className="hidden md:block" />
                The page you're looking for doesn't exist in my filesystem yet.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 py-3 px-8 bg-neon-blue/10 border border-neon-blue/30 rounded-sm text-neon-blue font-tech hover:bg-neon-blue/20 transition-all duration-300 text-sm md:text-base"
            >
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Homepage
            </Link>

            <Link
              href="/socials"
              className="group inline-flex items-center gap-3 py-3 px-8 bg-michigan-maize/10 border border-michigan-maize/30 rounded-sm text-michigan-maize font-tech hover:bg-michigan-maize/20 transition-all duration-300 text-sm md:text-base"
            >
              Contact Me
              <ArrowLeftIcon className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Terminal Suggestion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-8"
          >
            <div className="bg-tech-gray/20 border border-cyber-white/10 rounded-lg p-4 font-tech text-xs md:text-sm">
              <div className="flex items-center gap-2 text-matrix-green mb-2">
                <CommandLineIcon className="w-4 h-4" />
                <span>Suggested commands:</span>
              </div>
              <div className="space-y-1 text-cyber-white/60 pl-6">
                <p>
                  <span className="text-neon-blue">cd</span> ~/portfolio
                </p>
                <p>
                  <span className="text-neon-blue">ls</span> -la skills/
                </p>
                <p>
                  <span className="text-neon-blue">cat</span> projects.md
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
