import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|frag)$/i,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
