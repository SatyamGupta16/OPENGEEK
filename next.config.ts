import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com']
  },
  experimental: {
    optimizePackageImports: ['@vercel/font']
  }
};

export default nextConfig;
