/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: "@import '@/styles/colors.scss';",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {fs: false};

    return config;
  },
};

export default nextConfig;
