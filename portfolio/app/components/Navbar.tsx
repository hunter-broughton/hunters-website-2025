"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import TypewriterText from "./TypewriterText";
import Link from "next/link";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // Only hide navbar on mobile when scrolling down
      if (window.innerWidth < 768) {
        if (isScrollingDown && visible) {
          setVisible(false);
        } else if (isScrollingUp && !visible) {
          setVisible(true);
        }
      } else {
        setVisible(true); // Always visible on desktop
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "EDUCATION", href: "#education" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "/socials" },
  ];

  return (
    <>
      {/* Terminal Header */}
      <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
        <div className="flex items-center gap-2 text-neon-blue">
          <CommandLineIcon className="w-4 h-4" />
          <span className="text-matrix-green">~</span>
          <span>/</span>
          <TypewriterText text="cd hunter-broughton/portfolio" />
        </div>
      </div>

      {/* Navigation */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            className="fixed w-full py-3 md:py-6 px-3 md:px-8 flex justify-center md:justify-between items-center z-40 bg-cyber-black/50 backdrop-blur-sm top-12"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="hidden md:block text-xl md:text-2xl font-cyber tracking-wider"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-matrix-green">&lt;</span>
              <span className="text-neon-blue">FullStack</span>
              <span className="text-cyber-white/50 mx-1">/</span>
              <span className="text-michigan-maize">Engineer</span>
              <span className="text-matrix-green">&gt;</span>
            </motion.div>
            <div className="flex gap-3 md:gap-8 text-xs md:text-sm tracking-widest font-tech flex-wrap justify-center">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="hover:text-neon-blue transition-colors whitespace-nowrap"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
