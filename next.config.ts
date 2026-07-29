import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
    // Tự động chuyển ảnh sang WebP/AVIF (nhỏ hơn 30-50% so với JPEG/PNG)
    formats: ["image/avif", "image/webp"],
    // Cache ảnh đã optimize trong 1 giờ (tránh optimize lại mỗi request)
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
      // Production domain
      {
        protocol: "https",
        hostname: "godg1ftjewels.com",
      },
      {
        protocol: "https",
        hostname: "*.godg1ftjewels.com",
      },
    ],
  },
};

export default nextConfig;
