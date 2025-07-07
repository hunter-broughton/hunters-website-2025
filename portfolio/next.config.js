/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    unoptimized: true,
  },
  basePath: "",
};

module.exports = nextConfig;
