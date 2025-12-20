// PWA utilities for service worker registration and management
// Optimized for SSG/prerendered content

export interface PWAConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onOffline?: () => void;
  onOnline?: () => void;
}

export function registerServiceWorker(config: PWAConfig = {}) {
  // Only register in production and if service workers are supported
  if (
    typeof window === "undefined" ||
    !("serviceWorker" in navigator) ||
    import.meta.env.DEV
  ) {
    return;
  }

  window.addEventListener("load", () => {
    const swUrl = "/sw.js";

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("[PWA] Service Worker registered:", registration);

        // Check for updates periodically
        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }

          installingWorker.addEventListener("statechange", () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New content is available
                console.log("[PWA] New content available; please refresh.");
                config.onUpdate?.(registration);
              } else {
                // Content is cached for offline use
                console.log("[PWA] Content is cached for offline use.");
                config.onSuccess?.(registration);
              }
            }
          });
        });

        // Check for updates every hour
        setInterval(
          () => {
            registration.update();
          },
          60 * 60 * 1000,
        );
      })
      .catch((error) => {
        console.error("[PWA] Service Worker registration failed:", error);
      });
  });

  // Handle online/offline events
  window.addEventListener("online", () => {
    console.log("[PWA] Back online");
    config.onOnline?.();
  });

  window.addEventListener("offline", () => {
    console.log("[PWA] Gone offline");
    config.onOffline?.();
  });
}

export function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error("[PWA] Service Worker unregistration failed:", error);
      });
  }
}

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

// Check if app is running as PWA
export function isPWA(): boolean {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as NavigatorStandalone).standalone === true ||
    document.referrer.includes("android-app://")
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Prompt user to install PWA
export function promptPWAInstall() {
  if (typeof window === "undefined") return;

  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e as BeforeInstallPromptEvent;

    // Show install button/prompt
    console.log("[PWA] Install prompt available");

    return deferredPrompt;
  });

  return {
    show: async () => {
      if (!deferredPrompt) {
        console.log("[PWA] Install prompt not available");
        return false;
      }

      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA] User response to install prompt: ${outcome}`);

      // Clear the deferredPrompt
      deferredPrompt = null;

      return outcome === "accepted";
    },
  };
}

interface NetworkInformation {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

// Get network status
export function getNetworkStatus() {
  if (typeof navigator === "undefined") {
    return { online: true, effectiveType: "unknown" };
  }

  const nav = navigator as NavigatorWithConnection;
  const connection =
    nav.connection || nav.mozConnection || nav.webkitConnection;

  return {
    online: navigator.onLine,
    effectiveType: connection?.effectiveType || "unknown",
    downlink: connection?.downlink,
    rtt: connection?.rtt,
    saveData: connection?.saveData || false,
  };
}

// Prefetch critical resources
export async function prefetchResources(urls: string[]) {
  if (!("caches" in window)) return;

  const cache = await caches.open("prefetch-cache");

  await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response);
          console.log(`[PWA] Prefetched: ${url}`);
        }
      } catch (error) {
        console.error(`[PWA] Failed to prefetch ${url}:`, error);
      }
    }),
  );
}
