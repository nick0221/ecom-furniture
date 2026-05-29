import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      
    ],
    deviceSizes: [480, 768, 1024, 1280, 1536],
   
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Enable HTTP/2 server push for critical assets
  httpAgentOptions: {
    keepAlive: true,
  },
};

export default nextConfig;
