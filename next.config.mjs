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
    return [
      // 1. Accès direct à la racine via le domaine dédié chablis-cotonou.vercel.app
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
      // 2. Raccourcis ultra-courts et propres sans .html
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
      // 3. Routage automatique des assets (images, CSS, JS) pour les URLs courtes
      {
        source: '/assets/:path*',
        destination: '/sites/le-chablis/assets/:path*',
      },
    ];
  },
};

export default nextConfig;
