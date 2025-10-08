import { createRoot } from 'react-dom/client';
import type { JSX } from 'react/jsx-runtime';
import { IS_DEV, LOCALE_DEFAULT, LOCALES, type Locale } from './constants';
import './index.css';
import { getLocaleFromPath, getLocaleMessages } from './lib/i18n';
import { registerServiceWorker, unregisterServiceWorker } from './lib/pwa';
import { Root } from './root.tsx';

interface PrerenderData extends JSX.IntrinsicAttributes {
  url?: string;
}

if (typeof window !== 'undefined') {
  const target = document.getElementById('root')!;
  const locale = getLocaleFromPath(location.pathname) ?? LOCALE_DEFAULT;

  createRoot(target).render(<Root prerenderLocale={locale} />);

  // Register service worker for PWA functionality
  if (!IS_DEV) {
    registerServiceWorker({
      onSuccess: () => {
        console.log('Content is cached for offline use.');
      },
      onUpdate: () => {
        console.log('New content is available; please refresh.');
        // Optionally show a toast notification to the user
      },
    });
  } else {
    unregisterServiceWorker();
  }
}

export async function prerender(data: PrerenderData) {
  const { renderToString } = await import('react-dom/server');
  const { parseLinks } = await import('vite-prerender-plugin/parse');

  // Extract locale from URL path
  let locale: Locale = LOCALE_DEFAULT;

  if (data.url) {
    const path = data.url.toString();
    const pathSegments = path.split('/').filter(Boolean);

    if (pathSegments.length > 0 && LOCALES.includes(pathSegments[0] as Locale)) {
      locale = pathSegments[0] as Locale;
    }
  }

  try {
    // Load messages for the specific locale
    const messages = getLocaleMessages(locale);
    console.log(`Loaded messages for ${locale}:`, Object.keys(messages).length);

    // Render the static app with error boundary
    const html = renderToString(<Root prerenderLocale={locale} />);
    const links = parseLinks(html);

    console.log(`Successfully prerendered ${locale} page as static.`);

    return {
      html,
      links: new Set(links),
      head: {
        lang: locale,
        title: locale === LOCALE_DEFAULT ? 'LinkedIn Profile' : `LinkedIn Profile (${locale})`,
      },
    };
  } catch (error) {
    console.error(`Error prerendering ${locale} page:`, error);

    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    // Return a minimal result to avoid breaking the build
    return {
      html: `<div class="min-h-screen flex items-center justify-center"><div class="p-4 text-center"><h1 class="text-xl font-bold mb-2">LinkedIn Profile</h1><p>Welcome to the ${locale} version</p></div></div>`,
      links: new Set(),
      head: {
        lang: locale,
        title: `LinkedIn Profile (${locale})`,
      },
    };
  }
}
