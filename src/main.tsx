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
  const { locales, getMessages } = await import('./lib/i18n');
  const { ThemeProvider } = await import('./contexts/ThemeContext');
  const { LocaleProvider } = await import('./contexts/LocaleProvider');
  const { IntlProvider } = await import('use-intl');
  const { Toaster } = await import('./components/ui/toaster');

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
    // Load messages for the specific locale
    const messages = await getMessages(locale);
    console.log(`Loaded messages for ${locale}:`, Object.keys(messages).length);

    // Create a simple static component for prerendering
    const StaticApp = (
      <ThemeProvider>
        <LocaleProvider initialLocale={locale}>
          <div className={locale === 'ar' ? 'rtl' : 'ltr'}>
            <IntlProvider messages={messages} locale={locale}>
              <div className="min-h-screen bg-background">
                <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
                  <div className="container flex h-14 items-center">
                    <div className="mr-4 flex">
                      <a className="mr-6 flex items-center space-x-2" href="/">
                        <span className="font-bold">LinkedIn Profile</span>
                      </a>
                    </div>
                  </div>
                </header>
                <main className="container py-6">
                  <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold">LinkedIn Profile</h1>
                    <p>This is a prerendered page for {locale} locale.</p>
                  </div>
                </main>
              </div>
              <Toaster />
            </IntlProvider>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );

    // Render the static component
    const html = await renderToString(StaticApp);
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
      html: `<div class="min-h-screen flex items-center justify-center"><div class="p-4 text-center"><h1 class="text-xl font-bold mb-2">LinkedIn Profile</h1><p>Welcome to the ${locale} version</p></div></div>`,
      links: new Set(),
      head: {
        lang: locale,
        title: `LinkedIn Profile (${locale})`,
      },
    };
  }
}
