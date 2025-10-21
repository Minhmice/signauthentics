import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "static.fifa.com" },
      { protocol: "https", hostname: "media.api-sports.io" }
    ],
  },
};

export default nextConfig;
