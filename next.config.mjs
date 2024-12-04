export default {
  // Configure headers for all pages and service worker
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during production builds
  },
  // Images configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagesvs.oneindia.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hitzfeed.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'demo3.greynium.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com', // Ensure Google Fonts is allowed
      },
    ],
  },

  poweredByHeader: false, // Disable the "X-Powered-By: Next.js" header

  reactStrictMode: false,
  experimental: {
    scrollRestoration: false,
  },
};
