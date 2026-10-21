// app/layout.tsx  (or /src/app/layout.tsx in /app router)

import "./globals.css";
import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/*  -- VISUAL / THEMING --------------------------------------------- */
export const viewport: Viewport = {
  themeColor: "#1a1b26",
};

/*  -- SEO / SOCIAL -------------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL("https://hunterbroughton.com"),
  title: "Hunter Broughton",
  description:
    "Hey, I'm Hunter, a CS and Economics major at the University of Michigan and SWE intern at NeuroSpark AI working on AI inference infrastructure. Based in Ann Arbor, MI.",
  keywords: [
    "Hunter Broughton",
    "Software Engineer",
    "Programmer",
    "Web-Systems",
    "Firmware Engineer",
    "full-stack developer",
    "University of Michigan",
    "Ann Arbor, MI",
  ],
  authors: [
    {
      name: "Hunter Broughton",
      url: "https://hunterbroughton.com",
    },
  ],
  creator: "Hunter Broughton",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://hunterbroughton.com",
  },

  /* -- Open Graph (Facebook/LinkedIn etc.) -- */
  openGraph: {
    title: "Hunter Broughton • Full-Stack Developer and Engineer",
    description:
      "CS and Economics at the University of Michigan, working on AI infrastructure and ML systems.",
    url: "https://hunterbroughton.com",
    siteName: "Hunter Broughton",
    images: [
      {
        url: "/assets/headshot.jpeg",
        width: 1200,
        height: 630,
        alt: "Hunter Broughton Profile",
      },
    ],
    locale: "en_US",
    type: "profile",
  },

  /* -- Favicon bundle -- */
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

/* ------------- ROOT LAYOUT ---------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Basic icons + PWA */}
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD profile card for richer results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hunter Broughton",
              jobTitle: "Engineer & Full-Stack Developer",
              affiliation: "University of Michigan",
              url: "https://hunterbroughton.com",
              sameAs: [
                "https://github.com/hunter-broughton",
                "https://www.linkedin.com/in/hunter-broughton/",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ann Arbor",
                addressRegion: "MI",
                addressCountry: "USA",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="scanline" />
        {children}
      </body>
    </html>
  );
}
