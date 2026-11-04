/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // 1. Si on visite chablis-cotonou.vercel.app à la racine '/', on sert directement le site du restaurant !
        {
          source: '/',
          has: [
            {
              type: 'host',
              value: 'chablis-cotonou.vercel.app',
            },
          ],
          destination: '/sites/le-chablis/index.html',
        },
        // 2. Liens courts épurés sans .html
        {
          source: '/le-chablis',
          destination: '/sites/le-chablis/index.html',
        },
        {
          source: '/chablis',
          destination: '/sites/le-chablis/index.html',
        },
        {
          source: '/assets/:path*',
          destination: '/sites/le-chablis/assets/:path*',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
