/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Michigan Maize and Blue Theme
        michigan: {
          // Background shades (lighter than original)
          dark: "#1B2951", // Dark Michigan blue
          darker: "#0D1B2A", // Darker blue for contrast
          light: "#2D3E63", // Lighter blue background
          lighter: "#3A4F75", // Even lighter blue

          // Maize variations
          maize: "#FFCB05", // Official Michigan maize
          "maize-light": "#FFD633", // Lighter maize
          "maize-dark": "#E6B800", // Darker maize
          "maize-glow": "#FFF066", // Glowing maize

          // Blue variations
          blue: "#00274C", // Official Michigan blue
          "blue-light": "#003366", // Lighter blue
          "blue-bright": "#0066CC", // Bright blue
          "blue-neon": "#3399FF", // Neon blue

          // Neutral tones
          gray: "#E8F4FD", // Light blue-gray
          "gray-dark": "#B8D4E8", // Darker blue-gray
          white: "#F8FAFB", // Slightly blue-tinted white
        },
        // Updated main color mappings
        "cyber-black": "#1B2951", // Lighter background
        "cyber-white": "#F8FAFB", // Light text
        "neon-blue": "#3399FF", // Bright Michigan blue
        "neon-purple": "#FF6B9D", // Neon purple for algorithms
        "cyber-green": "#00FF94", // Cyber green for Kruskal's
        "michigan-maize": "#FFCB05", // Michigan maize for Prim's
        "matrix-green": "#FFCB05", // Michigan maize instead of green
        "tech-gray": "#2D3E63", // Medium blue-gray
      },
      fontFamily: {
        cyber: ["Rubik", "Space Grotesk", "sans-serif"],
        tech: ["Fira Code", "JetBrains Mono", "monospace"],
        display: ["Orbitron", "Space Grotesk", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        scanline: "scanline 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { textShadow: "0 0 5px #BF616A, 0 0 15px #BF616A" },
          "50%": { textShadow: "0 0 20px #EBCB8B, 0 0 30px #EBCB8B" },
          "100%": { textShadow: "0 0 5px #D08770, 0 0 15px #D08770" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
