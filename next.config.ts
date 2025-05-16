import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "guestjourney-subtitles.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "guestjourney-api.onrender.com",
      },
      {
        protocol: "https",
        hostname: "spcdn.shortpixel.ai",
      },
    ],
  },
};

export default nextConfig;
