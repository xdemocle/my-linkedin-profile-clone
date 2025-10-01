import { createRoot } from 'react-dom/client';
import type { JSX } from 'react/jsx-runtime';
import './index.css';
import type { Locale } from './lib/i18n';
import { registerServiceWorker } from './lib/pwa';
import { Root } from './root.tsx';

interface PrerenderData extends JSX.IntrinsicAttributes {
  url?: string;
}

if (typeof window !== 'undefined') {
  const target = document.getElementById('root')!;
  createRoot(target).render(<Root />);

  // Register service worker for PWA functionality
  registerServiceWorker({
    onSuccess: () => {
      console.log('Content is cached for offline use.');
    },
    onUpdate: () => {
      console.log('New content is available; please refresh.');
      // Optionally show a toast notification to the user
    },
  });
}

export async function prerender(data: PrerenderData) {
  const { renderToString } = await import('react-dom/server');
  const { parseLinks } = await import('vite-prerender-plugin/parse');
  const { locales } = await import('./lib/i18n');
  const { preloadMessages, Root } = await import('./root');

  // Extract locale from URL path if available
  let locale: Locale = 'en';

  if (data.url) {
    const path = data.url.toString();
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length > 0 && locales.includes(pathSegments[0] as Locale)) {
      locale = pathSegments[0] as Locale;
    }
  }

  try {
    // Pre-load messages for the specific locale
    const messages = await preloadMessages(locale);
    console.log(`Preloaded messages for ${locale}:`, Object.keys(messages).length);

    // Render with the preloaded data
    const html = await renderToString(<Root {...data} prerenderLocale={locale} />);
    const links = parseLinks(html);
    
    console.log(`Successfully prerendered ${locale} page`);

    return {
      html,
      links: new Set(links),
      head: {
        lang: locale,
        title: locale === 'en' ? 'LinkedIn Profile' : `LinkedIn Profile (${locale})`,
      },
    };
  } catch (error) {
    console.error(`Error prerendering ${locale} page:`, error);
    // Return a minimal result to avoid breaking the build
    return {
      html: `<div>Error loading ${locale} content</div>`,
      links: new Set(),
      head: {
        lang: locale,
        title: `LinkedIn Profile (${locale})`,
      },
    };
  }
}
