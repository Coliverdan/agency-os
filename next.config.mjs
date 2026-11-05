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
        // 1. Domaines dédiés par restaurant (Accès direct à la racine '/')
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
        {
          source: '/',
          has: [
            {
              type: 'host',
              value: 'chezbijou-cotonou.vercel.app',
            },
          ],
          destination: '/sites/chez-bijou/index.html',
        },

        // 2. Raccourcis ultra-courts et propres sans .html
        {
          source: '/chez-bijou',
          destination: '/sites/chez-bijou/index.html',
        },
        {
          source: '/bijou',
          destination: '/sites/chez-bijou/index.html',
        },
        {
          source: '/sites/chez-bijou',
          destination: '/sites/chez-bijou/index.html',
        },
        {
          source: '/le-chablis',
          destination: '/sites/le-chablis/index.html',
        },
        {
          source: '/chablis',
          destination: '/sites/le-chablis/index.html',
        },
        {
          source: '/sites/le-chablis',
          destination: '/sites/le-chablis/index.html',
        },

        // 3. Routage automatique des assets pour les domaines dédiés
        {
          source: '/assets/:path*',
          has: [
            {
              type: 'host',
              value: 'chablis-cotonou.vercel.app',
            },
          ],
          destination: '/sites/le-chablis/assets/:path*',
        },
        {
          source: '/assets/:path*',
          has: [
            {
              type: 'host',
              value: 'chezbijou-cotonou.vercel.app',
            },
          ],
          destination: '/sites/chez-bijou/assets/:path*',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
