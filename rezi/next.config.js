/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @react-pdf/renderer uses canvas and some Node APIs; ensure compatibility
  transpilePackages: ['@react-pdf/renderer'],
};

module.exports = nextConfig;
