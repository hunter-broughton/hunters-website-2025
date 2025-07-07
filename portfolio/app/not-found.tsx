"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CommandLineIcon,
  ArrowLeftIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import TypewriterText from "@/app/components/TypewriterText";
import { HolographicText } from "@/app/components/CyberpunkEffects";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white overflow-hidden">
      {/* Terminal Header */}
      <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
        <div className="flex items-center gap-2 text-neon-blue">
          <CommandLineIcon className="w-4 h-4" />
          <span className="text-matrix-green">hunter@portfolio</span>
          <span>:</span>
          <span className="text-cyber-white/80">~/404</span>
          <span className="text-matrix-green">$</span>
          <TypewriterText text="page_not_found --help" prefix="" />
        </div>
      </div>

      {/* Return Home Button */}
      <Link
        href="/"
        className="fixed top-16 left-8 py-2 px-4 bg-cyber-black/80 border border-neon-blue/30 rounded-sm text-neon-blue font-tech flex items-center gap-2 hover:bg-neon-blue/20 hover:border-neon-blue/50 transition-all duration-300 backdrop-blur-sm z-50"
      >
        <HomeIcon className="w-4 h-4" /> Return Home
      </Link>

      <main className="min-h-screen flex items-center justify-center relative px-4 md:px-8">
        {/* Cyberpunk Grid Background */}
        <div className="fixed inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(51, 153, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(51, 153, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Animated scan lines */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent animate-pulse"
            style={{
              top: "30%",
              animationDelay: "0s",
              animationDuration: "3s",
            }}
          />
          <div
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-matrix-green/30 to-transparent animate-pulse"
            style={{
              top: "70%",
              animationDelay: "1.5s",
              animationDuration: "4s",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-3xl mx-auto relative z-10"
        >
          {/* Glitch Effect 404 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <HolographicText className="text-8xl md:text-9xl font-cyber">
              404
            </HolographicText>

            {/* Terminal-style error code */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 font-tech text-matrix-green text-lg"
            >
              ERROR_CODE: PAGE_NOT_FOUND
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-cyber text-neon-blue">
              System Error: Route Not Found
            </h2>

            <div className="space-y-4 font-tech text-cyber-white/80">
              <p className="text-lg">
                <span className="text-michigan-maize">[WARNING]</span> The
                requested page does not exist in the portfolio database.
              </p>
              <p>
                <span className="text-matrix-green">[INFO]</span> This could be
                due to:
              </p>
              <div className="text-left max-w-md mx-auto space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-neon-blue">•</span>
                  <span>Incorrect URL path</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neon-blue">•</span>
                  <span>Page under development</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neon-blue">•</span>
                  <span>Server misconfiguration</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 py-3 px-6 bg-neon-blue/10 border border-neon-blue/30 rounded-sm text-neon-blue font-tech hover:bg-neon-blue/20 hover:border-neon-blue/50 transition-all duration-300 group"
            >
              <HomeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Return to Portfolio
            </Link>

            <Link
              href="/socials"
              className="inline-flex items-center gap-2 py-3 px-6 bg-matrix-green/10 border border-matrix-green/30 rounded-sm text-matrix-green font-tech hover:bg-matrix-green/20 hover:border-matrix-green/50 transition-all duration-300 group"
            >
              <CommandLineIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Contact Me
            </Link>
          </motion.div>

          {/* Terminal Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-12 p-4 bg-cyber-black/50 border border-cyber-white/20 rounded-lg font-tech text-sm text-cyber-white/60"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-matrix-green">hunter@portfolio</span>
              <span>:</span>
              <span className="text-cyber-white/80">~/404</span>
              <span className="text-matrix-green">$</span>
            </div>
            <div className="text-neon-blue">
              Try: <span className="text-cyber-white">cd /home</span> or{" "}
              <span className="text-cyber-white">ls /portfolio</span>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
