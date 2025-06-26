"use client";

import { useEffect, useState } from "react";

const HeroTypewriter = () => {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const prefix = "Hi, I'm ";
  const firstPart = "Hunter";
  const secondPart = "Hunter Broughton!";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 0) {
      // Type "Hi, I'm Hunter"
      if (!isDeleting && displayText.length < (prefix + firstPart).length) {
        timeout = setTimeout(() => {
          setDisplayText(
            (prev) => prev + (prefix + firstPart)[displayText.length]
          );
        }, 100);
      } else if (
        !isDeleting &&
        displayText.length === (prefix + firstPart).length
      ) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1000);
      } else if (isDeleting && displayText.length > prefix.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, 50);
      } else if (isDeleting && displayText.length === prefix.length) {
        setIsDeleting(false);
        setPhase(1);
      }
    } else if (phase === 1) {
      if (displayText.length < (prefix + secondPart).length) {
        timeout = setTimeout(() => {
          setDisplayText(
            (prev) => prev + secondPart[displayText.length - prefix.length]
          );
        }, 100);
      } else {
        // Hide cursor after typing is complete
        timeout = setTimeout(() => {
          setShowCursor(false);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, isDeleting]);

  return (
    <div className="relative">
      <span className="text-2xl md:text-4xl lg:text-6xl font-mono tracking-wide">
        <span className="text-cyber-white/80">{prefix}</span>
        <span className="text-neon-blue">
          {displayText.slice(prefix.length)}
        </span>
        <span
          className={`inline-block w-[2px] h-[1em] ml-[1px] ${
            showCursor ? "bg-michigan-maize animate-pulse" : "opacity-0"
          }`}
        />
      </span>
    </div>
  );
};

export default HeroTypewriter;
