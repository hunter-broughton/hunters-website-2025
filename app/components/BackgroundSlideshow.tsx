"use client";

import React from "react";
import Image from "next/image";

const HeroBackgroundImage = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      {/* Full-screen background image */}
      <Image
        src="/assets/headshot.jpeg"
        alt="Hero background"
        fill
        className="object-cover"
        priority
        quality={90}
      />
      {/* Dark overlay to maintain readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-michigan-dark/75 via-michigan-dark/60 to-michigan-dark/80" />
      <div className="absolute inset-0 bg-michigan-dark/40" />
    </div>
  );
};

export default HeroBackgroundImage;
