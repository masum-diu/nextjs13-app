/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'nextjs13-app-omega.vercel.app',
          },
        ],
        destination: 'https://sn-agro-farm.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;