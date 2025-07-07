"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING");

  const loadingSteps = [
    "INITIALIZING",
    "LOADING SYSTEMS",
    "CONNECTING NETWORKS",
    "COMPILING PORTFOLIO",
    "RENDERING INTERFACE",
    "READY",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);

        if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-michigan-dark flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,128,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,128,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="text-center space-y-8 relative z-10">
        {/* Hunter Broughton Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-2"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-neon-blue font-tech">
            H<span className="text-michigan-maize">B</span>
          </h1>
          <p className="text-cyber-white/60 font-tech text-sm tracking-wider">
            HUNTER BROUGHTON
          </p>
        </motion.div>

        {/* Loading progress */}
        <div className="space-y-4 w-80">
          <div className="flex justify-between items-center">
            <span className="text-michigan-maize font-tech text-sm">
              {loadingText}
            </span>
            <span className="text-cyber-white/60 font-tech text-sm">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-cyber-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-michigan-maize rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-neon-blue rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader;
