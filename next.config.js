/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.CLIENT_SERVICE_PATH + '/:path*',
      },
    ];
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
