import type { Locale } from './lib/i18n';

// Map of language names in their native language
export const languageNames: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
  es: 'Español',
  ar: 'العربية',
};

// Use country flags for languages
export const languageFlags: Record<Locale, string> = {
  en: '🇺🇸',
  it: '🇮🇹',
  fr: '🇫🇷',
  es: '🇪🇸',
  ar: '🇸🇦',
};
