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

    // Import only safe components and utilities
    const { getDirection } = await import('./lib/i18n');
    
    const direction = getDirection(locale);

    // Import the actual profile components that are safe for SSR
    const { StaticProfileHeader } = await import('./components/profile/StaticProfileHeader');
    const { StaticAboutSection } = await import('./components/profile/StaticAboutSection');
    const { StaticExperienceSection } = await import('./components/profile/StaticExperienceSection');
    const { StaticSkillsSection } = await import('./components/profile/StaticSkillsSection');

    // Create the profile app with actual translated content
    const StaticProfileApp = (
      <ThemeProvider>
        <LocaleProvider initialLocale={locale}>
          <div dir={direction} className={direction === 'rtl' ? 'rtl' : 'ltr'}>
            <IntlProvider messages={messages} locale={locale}>
              <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <StaticProfileHeader />
                      <StaticAboutSection />
                      <StaticExperienceSection />
                    </div>
                    <div className="space-y-6">
                      <StaticSkillsSection />
                    </div>
                  </div>
                </div>
              </div>
              <Toaster />
            </IntlProvider>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );

    // Render the static profile app
    const html = await renderToString(StaticProfileApp);
    const links = parseLinks(html);
    
    console.log(`Successfully prerendered ${locale} page with static profile content`);

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
