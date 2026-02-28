import type { Locale } from "@/constants";
import { LOCALE_DEFAULT, LOCALES, WEBSITE_URL } from "@/constants";

interface SEOMetaOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "profile" | "article";
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
    image = "/assets/png/og-image.png",
    type = "profile",
    path = "",
    locale,
    personalName = "Rocco Russo",
    noindex = false,
  } = options;

  const defaultTitle = `${personalName} | Software Engineer / Tech Lead`;
  const defaultDescription =
    "Experienced software engineer and tech lead with 10+ years in frontend development, Web3, and blockchain. Specialized in React, TypeScript, Next.js, DeFi applications, smart contracts, and AI integrations. Led teams building scalable applications serving 5M+ monthly users with expertise in modern web architecture and decentralized technologies.";

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = image.startsWith("http") ? image : `${WEBSITE_URL}${image}`;
  // Ensure path has trailing slash
  const normalizedPath = path && !path.endsWith("/") ? `${path}/` : path || "/";
  const canonicalUrl = `${WEBSITE_URL}${locale === LOCALE_DEFAULT ? "" : `/${locale}`}${normalizedPath}`;

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
  metaTags.push(
    `<meta property="og:description" content="${pageDescription}" />`
  );
  metaTags.push(`<meta property="og:image" content="${pageImage}" />`);
  metaTags.push(`<meta property="og:url" content="${canonicalUrl}" />`);
  metaTags.push(`<meta property="og:type" content="${type}" />`);
  metaTags.push(`<meta property="og:site_name" content="${personalName}" />`);
  metaTags.push(
    `<meta property="og:locale" content="${locale.replace("-", "_")}" />`
  );

  // Twitter Card
  metaTags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  metaTags.push(`<meta name="twitter:title" content="${pageTitle}" />`);
  metaTags.push(
    `<meta name="twitter:description" content="${pageDescription}" />`
  );
  metaTags.push(`<meta name="twitter:image" content="${pageImage}" />`);
  metaTags.push(`<meta name="twitter:creator" content="@xdemocle" />`);

  // Canonical URL
  metaTags.push(`<link rel="canonical" href="${canonicalUrl}" />`);

  // Hreflang tags
  LOCALES.forEach(lang => {
    const hrefUrl = `${WEBSITE_URL}${lang === LOCALE_DEFAULT ? "" : `/${lang}`}${normalizedPath}`;
    metaTags.push(
      `<link rel="alternate" hreflang="${lang}" href="${hrefUrl}" />`
    );
  });

  // x-default hreflang
  metaTags.push(
    `<link rel="alternate" hreflang="x-default" href="${WEBSITE_URL}${normalizedPath}" />`
  );

  return metaTags.join("\n    ");
}

/**
 * Converts a relative or absolute URL to a fully qualified absolute URL
 * Takes into account the locale for proper URL construction
 */
function toAbsoluteUrl(url: string, locale: Locale): string {
  // If already absolute, return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Ensure url starts with /
  const path = url.startsWith("/") ? url : `/${url}`;

  // Add locale prefix if not default locale
  const localePath = locale === LOCALE_DEFAULT ? path : `/${locale}${path}`;

  return `${WEBSITE_URL}${localePath}`;
}

/**
 * Generate structured data (JSON-LD) for SEO
 */
export function generateStructuredData(
  type: "person" | "breadcrumb",
  options: {
    personalName?: string;
    jobTitle?: string;
    about?: string;
    skills?: string[];
    breadcrumbs?: Array<{ name: string; url: string }>;
    locale?: Locale;
  }
): string {
  if (type === "person") {
    const {
      personalName = "Rocco Russo",
      jobTitle = "Software Engineer / Tech Lead",
      about = "",
      skills = [],
    } = options;

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalName,
      jobTitle: jobTitle,
      description: about,
      url: `${WEBSITE_URL}/`,
      image: `${WEBSITE_URL}/assets/png/profile.png`,
      sameAs: [
        "https://github.com/xdemocle",
        "https://linkedin.com/in/roccorusso",
        "https://twitter.com/xdemocle",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Málaga",
        addressRegion: "Andalusia",
        addressCountry: "ES",
      },
      knowsAbout: skills.slice(0, 15),
    };

    return `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`;
  } else if (type === "breadcrumb" && options.breadcrumbs) {
    const locale = options.locale || LOCALE_DEFAULT;
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: options.breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: toAbsoluteUrl(crumb.url, locale),
      })),
    };

    return `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;
  }

  return "";
}
