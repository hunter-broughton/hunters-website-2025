// app/layout.tsx  (or /src/app/layout.tsx in /app router)

import "./globals.css";
import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

/*  -- VISUAL / THEMING --------------------------------------------- */
export const viewport: Viewport = {
  themeColor: "#1a1b26",
};

/*  -- SEO / SOCIAL -------------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://hunter-broughton.github.io/hunters-website-2025"
  ),
  title: "Hunter Broughton",
  description:
    "Hey, I'm Hunter — a CS Major at the University of Michigan building full-stack apps, efficient firmware, and ML systems. Based in Seattle, currently in the Bay Area.",
  keywords: [
    "Hunter Broughton",
    "Software Engineer",
    "Programmer",
    "Web-Systems",
    "Firmware Engineer",
    "full-stack developer",
    "University of Michigan",
    "Seattle | Bay Area",
  ],
  authors: [
    {
      name: "Hunter Broughton",
      url: "https://hunter-broughton.github.io/hunters-website-2025",
    },
  ],
  creator: "Hunter Broughton",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://hunter-broughton.github.io/hunters-website-2025",
  },

  /* -- Open Graph (Facebook/LinkedIn etc.) -- */
  openGraph: {
    title: "Hunter Broughton • Full-Stack Developer and Engineer",
    description:
      "CS Major at University of Michigan building full-stack apps, efficient firmware, and ML systems.",
    url: "https://hunter-broughton.github.io/hunters-website-2025",
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

  /* -- Twitter / X Card -- */
  twitter: {
    card: "summary_large_image",
    title: "Hunter Broughton • Full-Stack Developer and Engineer",
    description:
      "Hey, I'm Hunter — CS Major at University of Michigan building full-stack apps, efficient firmware, and ML systems.",
    images: ["/assets/headshot.jpeg"],
    creator: "@your_handle", // optional: add if you have one
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
              jobTitle: "Hardware Engineer & Full-Stack Developer",
              affiliation: "University of Michigan",
              alumniOf: "University of Michigan",
              url: "https://hunter-broughton.github.io/hunters-website-2025",
              sameAs: [
                "https://github.com/hunter-broughton",
                "https://www.linkedin.com/in/hunter-broughton/",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Seattle",
                addressRegion: "WA",
                addressCountry: "USA",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="scanline" />
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-0EBMRW3QEB" />
      </body>
    </html>
  );
}
