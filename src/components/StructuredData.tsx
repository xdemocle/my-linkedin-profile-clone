import { WEBSITE_URL } from '@/constants';
import { useProfileData } from '@/hooks';
import { useEffect } from 'react';
import { useLocale } from 'use-intl';
import { LOCALE_DEFAULT } from '@/constants';

interface StructuredDataProps {
  type?: 'person' | 'organization' | 'breadcrumb';
  breadcrumbs?: Array<{ name: string; url: string }>;
}

/**
 * Converts a relative or absolute URL to a fully qualified absolute URL
 * Takes into account the current locale for proper URL construction
 */
function toAbsoluteUrl(url: string, locale: string): string {
  // If already absolute, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Ensure url starts with /
  const path = url.startsWith('/') ? url : `/${url}`;

  // Add locale prefix if not default locale
  const localePath = locale === LOCALE_DEFAULT ? path : `/${locale}${path}`;

  return `${WEBSITE_URL}${localePath}`;
}

export function StructuredData({ type = 'person', breadcrumbs }: StructuredDataProps) {
  const { personal, experience, skills } = useProfileData();
  const locale = useLocale();

  useEffect(() => {
    const scriptId = `structured-data-${type}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    let structuredData: Record<string, unknown> | undefined;

    if (type === 'person') {
      // Get all skill names from all categories
      const allSkills = skills.flatMap(skillCategory => skillCategory.items.map(item => item.name)).slice(0, 15);

      // Person schema for profile page
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: personal.name,
        jobTitle: personal.title,
        description: personal.about,
        url: WEBSITE_URL,
        image: `${WEBSITE_URL}/assets/png/profile.png`,
        sameAs: ['https://github.com/xdemocle', 'https://linkedin.com/in/roccorusso', 'https://twitter.com/xdemocle'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Málaga',
          addressRegion: 'Andalusia',
          addressCountry: 'ES',
        },
        alumniOf: {
          '@type': 'Organization',
          name: 'College',
        },
        knowsAbout: allSkills,
        worksFor: experience[0]
          ? {
              '@type': 'Organization',
              name: experience[0].company,
            }
          : undefined,
      };
    } else if (type === 'breadcrumb' && breadcrumbs) {
      // BreadcrumbList schema
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: toAbsoluteUrl(crumb.url, locale),
        })),
      };
    }

    if (structuredData) {
      script.textContent = JSON.stringify(structuredData);
    }

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, personal, experience, skills, breadcrumbs, locale]);

  return null;
}
