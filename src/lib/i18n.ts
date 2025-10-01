export const locales = ['en', 'it', 'fr', 'es', 'ar'] as const;

export type Locale = (typeof locales)[number];

export const rtlLocales: readonly Locale[] = ['ar'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

export async function getMessages(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import('../messages/en.json')).default;
    case 'it':
      return (await import('../messages/it.json')).default;
    case 'fr':
      return (await import('../messages/fr.json')).default;
    case 'es':
      return (await import('../messages/es.json')).default;
    case 'ar':
      return (await import('../messages/ar.json')).default;
    default:
      return (await import('../messages/en.json')).default;
  }
}
