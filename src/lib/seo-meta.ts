import { LOCALE_DEFAULT, LOCALES, WEBSITE_URL } from '@/constants';
import type { Locale } from '@/constants';

interface SEOMetaOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'profile' | 'article';
  path?: string;
  locale: Locale;
  personalName?: string;
  noindex?: boolean;
}

/**
 * Generate SEO meta tags for server-side rendering (prerender)
 * This function returns HTML strings that can be injected into the <head> during SSG
 */
export function generateSEOMeta(options: SEOMetaOptions): string {
  const {
    title,
    description,
    image = '/assets/png/og-image.png',
    type = 'profile',
    path = '',
    locale,
    personalName = 'Rocco Russo',
    noindex = false,
  } = options;

  const defaultTitle = `${personalName} | Software Engineer / Tech Lead`;
  const defaultDescription =
    'Software engineer with over 20 years of experience in front-end engineering, Web3 integrations, and full-stack development. Expert in React, TypeScript, blockchain, and AI.';

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = image.startsWith('http') ? image : `${WEBSITE_URL}${image}`;
  const canonicalUrl = `${WEBSITE_URL}${locale === LOCALE_DEFAULT ? '' : `/${locale}`}${path}`;

  const metaTags: string[] = [];

  // Basic meta tags
  metaTags.push(`<title>${pageTitle}</title>`);
  metaTags.push(`<meta name="description" content="${pageDescription}" />`);
  metaTags.push(
    `<meta name="keywords" content="software engineer, tech lead, blockchain, web3, react, typescript, full-stack developer" />`
  );
  metaTags.push(`<meta name="author" content="${personalName}" />`);

  // Robots
  if (noindex) {
    metaTags.push(`<meta name="robots" content="noindex, nofollow" />`);
  } else {
    metaTags.push(
      `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`
    );
  }

  // Open Graph
  metaTags.push(`<meta property="og:title" content="${pageTitle}" />`);
  metaTags.push(`<meta property="og:description" content="${pageDescription}" />`);
  metaTags.push(`<meta property="og:image" content="${pageImage}" />`);
  metaTags.push(`<meta property="og:url" content="${canonicalUrl}" />`);
  metaTags.push(`<meta property="og:type" content="${type}" />`);
  metaTags.push(`<meta property="og:site_name" content="${personalName}" />`);
  metaTags.push(`<meta property="og:locale" content="${locale.replace('-', '_')}" />`);

  // Twitter Card
  metaTags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  metaTags.push(`<meta name="twitter:title" content="${pageTitle}" />`);
  metaTags.push(`<meta name="twitter:description" content="${pageDescription}" />`);
  metaTags.push(`<meta name="twitter:image" content="${pageImage}" />`);
  metaTags.push(`<meta name="twitter:creator" content="@xdemocle" />`);

  // Canonical URL
  metaTags.push(`<link rel="canonical" href="${canonicalUrl}" />`);

  // Hreflang tags
  LOCALES.forEach(lang => {
    const hrefUrl = `${WEBSITE_URL}${lang === LOCALE_DEFAULT ? '' : `/${lang}`}${path}`;
    metaTags.push(`<link rel="alternate" hreflang="${lang}" href="${hrefUrl}" />`);
  });

  // x-default hreflang
  metaTags.push(`<link rel="alternate" hreflang="x-default" href="${WEBSITE_URL}${path}" />`);

  return metaTags.join('\n    ');
}

/**
 * Generate structured data (JSON-LD) for SEO
 */
export function generateStructuredData(
  type: 'person' | 'breadcrumb',
  options: {
    personalName?: string;
    jobTitle?: string;
    about?: string;
    skills?: string[];
    breadcrumbs?: Array<{ name: string; url: string }>;
  }
): string {
  if (type === 'person') {
    const { personalName = 'Rocco Russo', jobTitle = 'Software Engineer / Tech Lead', about = '', skills = [] } = options;

    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: personalName,
      jobTitle: jobTitle,
      description: about,
      url: WEBSITE_URL,
      image: `${WEBSITE_URL}/assets/png/profile.png`,
      sameAs: ['https://github.com/xdemocle', 'https://linkedin.com/in/roccorusso', 'https://twitter.com/xdemocle'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Málaga',
        addressRegion: 'Andalusia',
        addressCountry: 'ES',
      },
      knowsAbout: skills.slice(0, 15),
    };

    return `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`;
  } else if (type === 'breadcrumb' && options.breadcrumbs) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: options.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };

    return `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;
  }

  return '';
}
