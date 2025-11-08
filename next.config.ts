import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only treat files with these specific names as pages/routes
  pageExtensions: [
    "page.tsx",
    "page.ts",
    "page.jsx",
    "page.js",
    "layout.tsx",
    "layout.ts",
    "layout.jsx",
    "layout.js",
    "route.ts",
    "route.js",
  ],
};

export default nextConfig;
