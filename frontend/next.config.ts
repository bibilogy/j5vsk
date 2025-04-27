// next.config.ts
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        "@": path.resolve(__dirname, "src"),
      },
    };

    return config;
  },
  allowedDevOrigins: [
    "http://192.168.8.183:3000", // 👈 Add your IP here
  ],
};

export default nextConfig;
