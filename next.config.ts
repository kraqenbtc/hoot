import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['rpg.kraxel.io', 'vercel.app'],
    unoptimized: true
  }
};

export default nextConfig;
