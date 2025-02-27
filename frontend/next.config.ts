import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    "d3",
    "d3-color",
    "recharts",
    "internmap",
    "d3-array",
    "d3-scale",
    "d3-shape",
    "d3-format",
  ],
};

export default nextConfig;
