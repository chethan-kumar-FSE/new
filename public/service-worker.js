console.log('Service Worker script loaded');
const CACHED_VERSION = 1;
// Define cache names
const CACHE_LIST = [
  `PRE_CACHING_ASSETS_V${CACHED_VERSION}`,
  `PAGES_CACHE_V${CACHED_VERSION}`,
  `STATIC_CACHE_V${CACHED_VERSION}`,
  `NEXT_IMAGE_CACHE_V${CACHED_VERSION}`,
];

// Pre-caching static resources during install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');

  // Using waitUntil to ensure the install event completes
  event.waitUntil(
    caches.open(CACHE_LIST[0]).then((cache) => {
      return cache.addAll([
        '/',
        '/offline.html',
        './../app/global.css',
        '/others/loader.gif',
        '/others/logo.svg',
        '/others/copyIcon.svg',
        '/others/embedIcon.svg',
        '/others/googleLogo.png',
        '/others/userFallback.webp',
        '/others/postFallback.jpg',
      ]);
    })
  );

  self.skipWaiting(); // Activate the service worker immediately
});

// Activate event for cleanup and cache management
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');

  // Delete old caches that are no longer in the CACHE_LIST
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!CACHE_LIST.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim(); // Make the service worker immediately take control of the clients
});

// Cache API responses with a proper strategy (NetworkFirst or CacheFirst)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle fetch events for pages that need caching (e.g., login, profile pages, etc.)
  if (
    url.pathname === '/' ||
    url.pathname === '/offline.html' ||
    url.pathname.match(/^\/[a-zA-Z]{2}(\/)?$/i) ||
    url.pathname.match(/^\/([a-zA-Z]{2}\/)?[a-zA-Z\-]+-c\d+$/)
  ) {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          const cache = await caches.open(CACHE_LIST[1]);
          cache.put(event.request, response.clone());
          return response; // Return the network response
        })
        .catch(async () => {
          // If network fails, try serving from cache
          const cachedResponse = await caches.match(event.request);
          return cachedResponse || caches.match('/offline.html'); // Fallback to offline.html
        })
    );
  }

  // Cache images fetched via Next.js
  if (url.pathname.startsWith('/_next/image')) {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          const cache = await caches.open(CACHE_LIST[2]);
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(event.request);
          return cachedResponse || caches.match('/offline.html'); // Fallback to offline.html
        })
    );
  }

  // Cache static assets such as images, JS, CSS, fonts, etc.
  if (
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i) ||
    url.pathname.includes('.js') ||
    url.origin === 'https://fonts.googleapis.com' ||
    url.pathname.startsWith('/_next/static/css') ||
    url.origin === 'https://fonts.gstatic.com'
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return from cache if available
          return cachedResponse;
        }

        // Otherwise, fetch from network and cache for future use
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_LIST[3]).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse; // Return network response
          });
        });
      })
    );
  }

  if (!url.pathname.startsWith('/api')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // If the request matches a cached response, return it
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from network and return offline.html in case of failure
        return fetch(event.request).catch(() => {
          return caches.match('/offline.html'); // Fallback to offline.html
        });
      })
    );
  }
});
