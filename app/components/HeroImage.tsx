"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroImage = () => {
  return (
    <motion.div
      className="relative w-full h-full min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      style={
        {
          // Improve rendering on high-DPI displays
          imageRendering: "-webkit-optimize-contrast",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        } as React.CSSProperties
      }
    >
      {/* Hero image with responsive optimization */}
      <Image
        src="/assets/headshot.jpeg"
        alt="Hunter Broughton"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
        priority
        quality={95}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        style={{
          objectFit: "cover",
          // Force hardware acceleration for smoother rendering
          transform: "translate3d(0, 0, 0)",
        }}
        // Add placeholder for better loading experience
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XqoqiIqLFWystbXNloLvbvLUQpb3EiNZdNANwuLlsMAz6EfTaGYIhPQTKQ="
      />

      {/* Subtle gradient overlay for better integration with the theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-michigan-dark/60 via-transparent to-transparent" />

      {/* Cyberpunk border glow effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-neon-blue/30 shadow-[0_0_20px_rgba(51,153,255,0.3)] transition-all duration-500 group-hover:border-neon-blue/50 group-hover:shadow-[0_0_30px_rgba(51,153,255,0.5)]" />

      {/* Corner accent lines */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-michigan-maize/60"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-michigan-maize/60"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-michigan-maize/60"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-michigan-maize/60"></div>
    </motion.div>
  );
};

export default HeroImage;
