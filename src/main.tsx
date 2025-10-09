import { createRoot } from 'react-dom/client';
import type { JSX } from 'react/jsx-runtime';
import { IS_DEV, LOCALE_DEFAULT, LOCALES, type Locale } from './constants';
import './index.css';
import { getLocaleFromPath } from './lib/i18n';
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
  const { generateSEOMeta, generateStructuredData } = await import('./lib/seo-meta');

  // Extract locale from URL path
  let locale: Locale = LOCALE_DEFAULT;
  let pagePath = '';
  let pageType: 'home' | 'experience' | 'projects' | 'skills' | 'recommendations' = 'home';

  if (data.url) {
    const path = data.url.toString();
    const pathSegments = path.split('/').filter(Boolean);

    if (pathSegments.length > 0 && LOCALES.includes(pathSegments[0] as Locale)) {
      locale = pathSegments[0] as Locale;
      if (pathSegments.length > 1) {
        pageType = pathSegments[1] as typeof pageType;
        pagePath = `/${pathSegments[1]}`;
      }
    } else if (pathSegments.length > 0) {
      pageType = pathSegments[0] as typeof pageType;
      pagePath = `/${pathSegments[0]}`;
    }
  }

  try {
    // Render the static app with error boundary
    const html = renderToString(<Root prerenderLocale={locale} />);
    const links = parseLinks(html);

    // Generate SEO meta tags based on page type
    let title = 'Rocco Russo | Software Engineer / Tech Lead';
    const description =
      'Software engineer with over 20 years of experience in front-end engineering, Web3 integrations, and full-stack development.';
    let structuredData = '';

    if (pageType === 'home') {
      structuredData = generateStructuredData('person', {
        personalName: 'Rocco Russo',
        jobTitle: 'Software Engineer / Tech Lead',
        about: description,
        skills: ['React', 'TypeScript', 'Blockchain', 'Web3', 'DeFi', 'Smart Contracts'],
      });
    } else {
      const pageTitles = {
        experience: 'Experience',
        projects: 'Projects',
        skills: 'Skills',
        recommendations: 'Recommendations',
      };
      title = `Rocco Russo | ${pageTitles[pageType] || ''}`;
      structuredData = generateStructuredData('breadcrumb', {
        breadcrumbs: [
          { name: 'Home', url: `${data.url?.split(pagePath)[0] || '/'}` },
          { name: pageTitles[pageType] || '', url: data.url || '/' },
        ],
      });
    }

    const seoMeta = generateSEOMeta({
      title,
      description,
      locale,
      path: pagePath,
      type: pageType === 'home' ? 'profile' : 'website',
    });

    console.log(`Successfully prerendered ${locale}${pagePath} page as static.`);

    return {
      html,
      links: new Set(links),
      head: {
        lang: locale,
        title,
        meta: seoMeta,
        script: structuredData,
      },
    };
  } catch (error) {
    console.error(`Error prerendering ${locale}${pagePath} page:`, error);

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
