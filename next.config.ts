import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.thesportsdb.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

