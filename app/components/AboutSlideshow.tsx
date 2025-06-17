"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const AboutSlideshow = () => {
  // Personal photos for slideshow
  const photos = [
    "/assets/ohitoState.JPG",
    "/assets/australia.JPG",
    "/assets/hunterTalking.jpeg",
    "/assets/dadsWeekend.jpeg",
    "/assets/snowboarding.jpeg",
    "/assets/kangaroo.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 4000); // Change photo every 4 seconds

    return () => clearInterval(interval);
  }, [photos.length, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  return (
    <motion.div
      className="relative w-full h-96 rounded-lg overflow-hidden bg-michigan-dark/20 border border-michigan-blue/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={photos[currentIndex]}
            alt={`Personal photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            quality={85}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-michigan-dark/60 via-transparent to-michigan-dark/20" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-michigan-dark/50 backdrop-blur-sm border border-michigan-maize/30 rounded-full p-2 text-michigan-maize hover:bg-michigan-maize/10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-michigan-dark/50 backdrop-blur-sm border border-michigan-maize/30 rounded-full p-2 text-michigan-maize hover:bg-michigan-maize/10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </motion.button>

      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <motion.button
          onClick={togglePlayPause}
          className="bg-michigan-dark/50 backdrop-blur-sm border border-michigan-maize/30 rounded-sm p-2 text-michigan-maize hover:bg-michigan-maize/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <PauseIcon className="w-4 h-4" />
          ) : (
            <PlayIcon className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* Slideshow indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {photos.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-michigan-maize shadow-[0_0_10px_rgba(255,203,5,0.6)]"
                : "bg-cyber-white/40 hover:bg-cyber-white/70"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Photo counter */}
      <div className="absolute bottom-4 right-4 z-10 bg-michigan-dark/50 backdrop-blur-sm border border-michigan-maize/30 rounded-sm px-2 py-1">
        <span className="text-michigan-maize font-tech text-xs">
          {currentIndex + 1} / {photos.length}
        </span>
      </div>
    </motion.div>
  );
};

export default AboutSlideshow;
