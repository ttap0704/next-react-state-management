/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mysql2"],
    fontLoaders: [{loader: "@next/font/google", options: {subsets: ["latin"]}}],
  },
};

module.exports = nextConfig;
