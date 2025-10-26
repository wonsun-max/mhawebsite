import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  /* config options here */
};

export default nextConfig;