/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { LOCALE_DEFAULT, type Locale, type Messages } from '../constants/i18n';
import { getLocaleFromPath, getLocaleMessages } from '../lib/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
  prerenderLocale?: Locale;
}

export function LocaleProvider({ children, prerenderLocale }: LocaleProviderProps) {
  const [pathname, setLocation] = useLocation();

  // Use prerenderLocale if provided (for SSG), otherwise default to 'en'
  const [locale, setLocale] = useState<Locale>(prerenderLocale || LOCALE_DEFAULT);

  // Initialize with messages for the current locale
  const [messages, setMessages] = useState<Messages>(() => {
    try {
      return getLocaleMessages(prerenderLocale || locale);
    } catch (error) {
      console.warn('Failed to load messages for locale:', prerenderLocale || locale, error);
      // Fallback to English messages
      return getLocaleMessages(LOCALE_DEFAULT);
    }
  });

  // Detect locale from URL and update locale state (only in browser)
  // This effect handles browser history navigation (back/forward buttons)
  useEffect(() => {
    // Skip URL detection during prerendering
    if (prerenderLocale) return;

    const urlLocale = getLocaleFromPath(pathname);

    // If we detected a locale from URL, update state to match
    // This handles browser back/forward navigation
    if (urlLocale) {
      if (urlLocale === LOCALE_DEFAULT) {
        // Redirect /en to /
        setLocation('/');
      } else if (urlLocale !== locale) {
        // Update locale state to match URL
        setLocale(urlLocale);
      }
    } else {
      // No locale in URL, assume default locale
      if (locale !== LOCALE_DEFAULT) {
        setLocale(LOCALE_DEFAULT);
      }
    }
  }, [pathname, prerenderLocale, setLocation]);

  // Update messages when locale changes
  useEffect(() => {
    try {
      setMessages(getLocaleMessages(locale));
    } catch (error) {
      console.warn('Failed to load messages for locale:', locale, error);
      // Fallback to default locale messages
      setMessages(getLocaleMessages(LOCALE_DEFAULT));
    }
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale, messages }}>{children}</LocaleContext.Provider>;
}
