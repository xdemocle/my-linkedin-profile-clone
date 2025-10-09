// Service Worker for LinkedIn Profile Clone
// Optimized for SSG/Prerendered content with Cloudflare Pages

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

// Assets to cache immediately on install (critical for offline)
const STATIC_ASSETS = [
  '/',
  '/experience',
  '/activity',
  '/manifest.json',
  // Add prerendered pages here as they're generated
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting(); // Activate immediately
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => {
              return name.startsWith('static-') || name.startsWith('dynamic-') || name.startsWith('images-');
            })
            .filter(name => {
              return name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== IMAGE_CACHE;
            })
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.method === 'GET') {
    // Images - Cache first, fallback to network
    if (request.destination === 'image') {
      event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
      return;
    }

    // HTML pages - Network first for SSG content, fallback to cache
    if (request.mode === 'navigate' || request.destination === 'document') {
      event.respondWith(networkFirstStrategy(request, STATIC_CACHE));
      return;
    }

    // CSS, JS, fonts - Cache first, fallback to network
    if (request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
      event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
      return;
    }

    // API calls and dynamic content - Network first
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
      return;
    }

    // Default: Network first, fallback to cache
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
  }
});

// Cache-first strategy (good for static assets)
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    console.log('[SW] Serving from cache:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      console.log('[SW] Caching new resource:', request.url);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    return new Response('Offline - Resource not available', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Network-first strategy (good for HTML and dynamic content)
async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.ok) {
      console.log('[SW] Updating cache from network:', request.url);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed, serving from cache:', request.url);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match('/');
      if (offlinePage) {
        return offlinePage;
      }
    }

    return new Response('Offline - Please check your connection', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// Background sync for future enhancements
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
  if (event.tag === 'sync-profile-data') {
    event.waitUntil(syncProfileData());
  }
});

async function syncProfileData() {
  // Placeholder for future background sync functionality
  console.log('[SW] Syncing profile data...');
}

// Push notifications (for future enhancements)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'LinkedIn Profile Update';
  const options = {
    body: data.body || 'You have a new update',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: data.url || '/',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});
