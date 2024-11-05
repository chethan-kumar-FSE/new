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

  runtimeCaching: [
      {
        urlPattern: /https:\/\/(www\.hitzfeed\.com|imagesvs\.oneindia\.com)\/.*/, // Match your external domains
        handler: 'CacheFirst', // Use CacheFirst strategy to load cached images first
        options: {
          cacheName: 'external-image-cache', // Name of the cache storage
          expiration: {
            maxEntries: 50, // Max number of entries to cache
            maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
          },
        },
      },
      {
        urlPattern: /.*\.(jpg|jpeg|png|gif|webp|svg)$/, // Match other image URLs globally
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 100, // Max entries to cache
            maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
          },
        },
      },
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
