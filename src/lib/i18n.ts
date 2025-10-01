import type { Locale, LocaleDirection, Messages } from '../constants/i18n';
import { LOCALE_CONFIGS, LOCALE_DEFAULT, LOCALE_MESSAGES, LOCALES, RTL_LOCALES } from '../constants/i18n';

export const isRTL = (locale: Locale): boolean => RTL_LOCALES.includes(locale);

export const getDirection = (locale: Locale): LocaleDirection => (isRTL(locale) ? 'rtl' : 'ltr');

// Function to detect locale from URL path
export const getLocaleFromPath = (pathname: string): Locale | null => {
  if (pathname === '/') {
    return LOCALE_DEFAULT;
  }

  const pathSegments = pathname.split('/').filter(Boolean);

  if (pathSegments.length > 0) {
    const firstSegment = pathSegments[0] as Locale;

    if (LOCALES.includes(firstSegment)) {
      return firstSegment;
    }
  }

  return null;
};

export const getLocaleMessages = (locale: Locale): Messages => {
  return LOCALE_MESSAGES[locale as keyof typeof LOCALE_MESSAGES];
};

export const getLocaleConfig = (locale: Locale) => {
  return LOCALE_CONFIGS[locale as keyof typeof LOCALE_CONFIGS];
};

export const getPageUrlFromPath = (locale: Locale, page: string) => {
  return locale === LOCALE_DEFAULT ? `/${page}` : `/${locale}/${page}`;
};
