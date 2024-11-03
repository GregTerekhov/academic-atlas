/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    typedRoutes: true,
    scrollRestoration: true,
  },
  // compiler: { //FIXME:--- before production
  //   removeConsole: {
  //     exclude: ['error', 'warn', 'info'],
  //   },
  // },
  images: {
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // async headers() { //FIXME: turn on after checking of deletion unused styles functions
  //   return [
  //     {
  //       source: '/images/(.*)', //FiXME: --- turn on all before production
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
