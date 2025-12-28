import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/analytics',
        permanent: true,
      },
    ]
  },
  env: {
    MIXO_API_URL: process.env.MIXO_API_URL,
  },
};

export default nextConfig;
