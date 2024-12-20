export default function manifest() {
  // public/manifest.js

  return {
    name: 'Hitzfeed',
    short_name: 'Hitzfeed',
    description: 'sample description',
    start_url: '/',
    display: 'standalone',
    background_color: '#e0f7fa',
    theme_color: '#0077cc',
    icons: [
      {
        src: '/images/icons-72x72.webp',
        sizes: '72x72',
        type: 'image/webp',
      },
      {
        src: '/images/icons-128x128.webp',
        sizes: '128x128',
        type: 'image/webp',
      },
      {
        src: '/images/icons-144x144.webp',
        sizes: '144x144',
        type: 'image/webp',
      },
      {
        src: '/images/icons-192x192.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/images/icons-512x512.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/screenshot2.png',
        sizes: '434x556',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/screenshots/screenshot3.png',
        sizes: '533x553',
        type: 'image/png',
      },
    ],
    scope: '/',
  };
}
