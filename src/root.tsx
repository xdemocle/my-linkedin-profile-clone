/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { IntlProvider } from 'use-intl';
import { useLocation } from 'wouter';
import { Router } from './components/Router';
import { Toaster } from './components/ui/toaster';
import { LocaleProvider } from './contexts/LocaleProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { type Locale, getDirection, getMessages, locales } from './lib/i18n';

type Messages = Record<string, unknown>;

// Define the RootProps interface
interface RootProps {
  prerenderLocale?: Locale;
}

// Function to detect locale from URL path
function getLocaleFromPath(path: string): Locale | null {
  const pathSegments = path.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const firstSegment = pathSegments[0];
    if (locales.includes(firstSegment as Locale)) {
      return firstSegment as Locale;
    }
  }
  return null;
}

const preloadedMessages: Record<string, Messages> = {};

// Preload messages for SSG (called by prerender function)
export async function preloadMessages(locale: Locale): Promise<Messages> {
  const messages = await getMessages(locale);
  // We're mutating the object, not reassigning the variable
  preloadedMessages[locale] = messages;
  return messages;
}

export function Root({ prerenderLocale }: RootProps = {}) {
  // Always call hooks at the top level
  const [location] = useLocation();
  const isServer = typeof window === 'undefined';
  
  // Use prerenderLocale if provided (for SSR), otherwise default to 'en'
  const [locale, setLocale] = useState<Locale>(prerenderLocale || 'en');

  // Initialize with preloaded messages if available (for SSG)
  const [messages, setMessages] = useState<Messages | null>(
    prerenderLocale && preloadedMessages[prerenderLocale] ? preloadedMessages[prerenderLocale] : null
  );

  // Detect locale from URL and load messages (only in browser)
  useEffect(() => {
    if (!isServer) {
      const urlLocale = getLocaleFromPath(location);

      if (urlLocale && urlLocale !== locale) {
        setLocale(urlLocale);
      } else {
        getMessages(locale).then(setMessages);
      }
    }
  }, [locale, location, isServer]);
  
  // For prerendering, immediately load messages for the specified locale
  useEffect(() => {
    if (prerenderLocale && isServer) {
      getMessages(prerenderLocale).then(setMessages);
    }
  }, [prerenderLocale, isServer]);

  // Update messages when locale changes
  useEffect(() => {
    getMessages(locale).then(setMessages);
  }, [locale]);

  if (!messages) {
    return <div>Loading...</div>;
  }

  const direction = getDirection(locale);

  return (
    <ThemeProvider>
      <LocaleProvider initialLocale={locale}>
        <div dir={direction} className={direction === 'rtl' ? 'rtl' : 'ltr'}>
          <IntlProvider messages={messages} locale={locale}>
            <Router locale={locale} onLocaleChange={setLocale} />
            <Toaster />
          </IntlProvider>
        </div>
      </LocaleProvider>
    </ThemeProvider>
  );
}
