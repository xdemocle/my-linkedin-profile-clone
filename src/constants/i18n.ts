import type { Messages as MessagesIntl } from 'use-intl';
import arMessages from '../messages/ar.json';
import enMessages from '../messages/en.json';
import esMessages from '../messages/es.json';
import frMessages from '../messages/fr.json';
import itMessages from '../messages/it.json';

export type Locale = 'en' | 'it' | 'fr' | 'es' | 'ar';

export type LocaleConfig = {
  name: string;
  flag: string;
};

export type Messages = MessagesIntl;

export type LocaleDirection = 'ltr' | 'rtl';

// Support LOCALES configs
export const LOCALE_CONFIGS: Record<Locale, LocaleConfig> = {
  en: { name: 'English', flag: '🇺🇸' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  fr: { name: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
  ar: { name: 'العربية', flag: '🇸🇦' },
} as const;

export const LOCALE_DEFAULT = Object.keys(LOCALE_CONFIGS)[0] as Locale;

export const LOCALES = Object.keys(LOCALE_CONFIGS) as Locale[];

export const RTL_LOCALES: Locale[] = ['ar'] as const;

// Locale messages
export const LOCALE_MESSAGES = {
  en: enMessages,
  it: itMessages,
  fr: frMessages,
  es: esMessages,
  ar: arMessages,
} as const;
