import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // images: {
  //   domains: ["example.com"], // add image host domains
  // },
  //   basePath: "/order",  // IMPORTANT
  // assetPrefix: "/order",

  images: {
    domains: ["127.0.0.1", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
      {
        protocol: "https",
        hostname: "e7.pngegg.com",
      },
      {
        hostname: "i.pinimg.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
