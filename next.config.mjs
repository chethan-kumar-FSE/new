/** @type {import('next').NextConfig} */

import withPWA from '@ducanh2912/next-pwa';

const pwaConfig = withPWA({
  dest: 'public',

  disable: false,
  register: true,
  disable: false,
  scope: '/',
  cacheOnFrontEndNav: true,
  cacheStartUrl: '/',
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  fallbacks: '',

  extendDefaultRuntimeCaching: [
    {
      urlPattern: ({ sameOrigin, url: { pathname } }) => {
        // Exclude OAuth callback route for Safari compatibility
        if (
          !sameOrigin ||
          pathname.startsWith('/api/auth/callback') ||
          pathname.startsWith('/api/auth/session')
        ) {
          return false;
        }

        // Cache all other API requests that begin with `/api/`
        if (pathname.startsWith('/api/')) {
          return true;
        }

        return false;
      },
      handler: 'NetworkFirst',
      method: 'GET',
      options: {
        cacheName: 'apis',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10, // fallback to cache if API does not respond within 10 seconds
      },
    },
    {
      urlPattern: ({ sameOrigin, url: { pathname } }) => {
        // Exclude OAuth callback route for Safari compatibility
        if (
          !sameOrigin ||
          pathname.startsWith('/api/auth/callback') ||
          pathname.startsWith('/api/auth/session')
        ) {
          return false;
        }

        // Cache all other API requests that begin with `/api/`
        if (pathname.startsWith('/api/')) {
          return true;
        }

        return false;
      },
      handler: 'NetworkFirst',
      method: 'POST',
      options: {
        cacheName: 'apis',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10, // fallback to cache if API does not respond within 10 seconds
      },
    },
    {
      // Cache image requests
    urlPattern: /^https:\/\/www\.hitzfeed\.com\/trends\/media\/images\/category\/250x250\/.*\.(jpg|jpeg|png)$/,
      handler: 'NetworkFirst', // Cache images
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
         cacheableResponse: {
        statuses: [0, 200],
      },
      fetchOptions: {
        mode: 'cors', // Allows cross-origin caching
      },
      },
    }, 
    {
      urlPattern: /\/_next\/static.+\.js$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-static-js-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-style-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    // Add more caching strategies as needed
  ],
});

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
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
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
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
    ],
  },
  reactStrictMode: false,
  experimental: {
    scrollRestoration: false,
  },
};

export default pwaConfig(nextConfig);
