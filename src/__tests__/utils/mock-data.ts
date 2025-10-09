import { type Locale } from '@/constants';

export const mockPaths = {
  root: '/',
  home: {
    en: '/',
    it: '/it/',
    fr: '/fr/',
    es: '/es/',
    ar: '/ar/',
  },
  experience: {
    en: '/experience',
    it: '/it/experience',
    fr: '/fr/experience',
    es: '/es/experience',
    ar: '/ar/experience',
  },
  projects: {
    en: '/projects',
    it: '/it/projects',
    fr: '/fr/projects',
    es: '/es/projects',
    ar: '/ar/projects',
  },
  activity: {
    en: '/activity',
    it: '/it/activity',
    fr: '/fr/activity',
    es: '/es/activity',
    ar: '/ar/activity',
  },
  invalid: ['/nonexistent', '/it/nonexistent', '/invalid-locale/page', '/en/invalid-page'],
};

export const mockUrlTestCases = [
  // Root paths
  { input: '/', expected: 'en' },
  { input: '/en', expected: 'en' },
  { input: '/en/', expected: 'en' },

  // Localized paths
  { input: '/it', expected: 'it' },
  { input: '/it/', expected: 'it' },
  { input: '/it/experience', expected: 'it' },
  { input: '/es/projects', expected: 'es' },
  { input: '/ar/activity', expected: 'ar' },

  // Invalid paths
  { input: '/invalid', expected: null },
  { input: '/xx/page', expected: null },
  { input: '/en/it/mixed', expected: 'en' },
];

export const mockUrlGenerationCases = [
  // Default locale (English) - should not have prefix
  { locale: 'en' as Locale, page: '', expected: '/' },
  { locale: 'en' as Locale, page: 'experience', expected: '/experience' },

  // Other locales - should have prefix
  { locale: 'it' as Locale, page: '', expected: '/it/' },
  { locale: 'it' as Locale, page: 'experience', expected: '/it/experience' },
  { locale: 'es' as Locale, page: 'projects', expected: '/es/projects' },
  { locale: 'ar' as Locale, page: 'activity', expected: '/ar/activity' },

  // Edge cases
  { locale: 'it' as Locale, page: '/', expected: '/it/' },
  { locale: 'en' as Locale, page: '/', expected: '/' },
];

export const mockDirectionCases = [
  { locale: 'en' as Locale, expected: 'ltr' },
  { locale: 'it' as Locale, expected: 'ltr' },
  { locale: 'fr' as Locale, expected: 'ltr' },
  { locale: 'es' as Locale, expected: 'ltr' },
  { locale: 'ar' as Locale, expected: 'rtl' },
];

export const mockNavigationScenarios = [
  {
    name: 'Home to Experience',
    from: '/',
    to: '/experience',
    expectedLocale: 'en',
  },
  {
    name: 'Italian Home to Italian Experience',
    from: '/it/',
    to: '/it/experience',
    expectedLocale: 'it',
  },
  {
    name: 'Language switch preserves page',
    from: '/experience',
    switchTo: 'it' as Locale,
    expectedPath: '/it/experience',
  },
];
