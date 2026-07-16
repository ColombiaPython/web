import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath: "/web",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
