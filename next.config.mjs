/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  webpack: (config) => {
    config.optimization.minimize = true;
    return config;
  },
};

export default nextConfig; 