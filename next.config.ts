import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  // Ref: https://nextjs.org/docs/advanced-features/output-file-tracing
  output: 'standalone',
  
  images: {
    unoptimized: true, // Disable image optimization for now
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "static.fifa.com" },
      { protocol: "https", hostname: "media.api-sports.io" },
      // Add imgproxy domain
      { protocol: "https", hostname: "img.minhmice.com" }
    ]
  },
};

export default nextConfig;
