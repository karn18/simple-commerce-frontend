import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [new URL("https://sc1.al8m.com/api-media/**")],
  },
};

export default nextConfig;
