import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "futuramaapi.com",
        port: "",
        pathname: "/static/img/**",
        search: "",
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
