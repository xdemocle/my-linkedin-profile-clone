import { useEffect, useState } from 'react';
import { IntlProvider } from 'use-intl';
import { useLocation } from 'wouter';
import { Router } from './components/Router';
import { Toaster } from './components/ui/toaster';
import { LOCALE_DEFAULT, type Locale, type Messages } from './constants/i18n';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { getDirection, getLocaleFromPath, getLocaleMessages } from './lib/i18n';

// Define the RootProps interface
interface RootProps {
  prerenderLocale: Locale;
}

export const Root = ({ prerenderLocale }: RootProps) => {
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

  // Detect locale from URL and load messages (only in browser)
  useEffect(() => {
    // Skip URL detection during prerendering
    if (prerenderLocale) return;

    const urlLocale = getLocaleFromPath(pathname);

    // 1. User gets here if locale is found in URL.
    if (urlLocale && urlLocale !== locale) {
      setLocale(urlLocale);
    }

    // 2. Locale is set to default.
    // 3. If urlLocale is same as locale default, redirect to '/'.
    if (urlLocale === LOCALE_DEFAULT) {
      setLocation('/');
    }
  }, [pathname, prerenderLocale, locale, setLocation]);

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

  const direction = getDirection(locale);

  return (
    <ThemeProvider>
      <LocaleProvider initialLocale={locale}>
        <div dir={direction} className={direction === 'rtl' ? 'rtl' : 'ltr'}>
          <IntlProvider
            messages={messages}
            locale={locale}
            onError={error => {
              // Suppress environment fallback errors during prerendering
              if (error.code === 'ENVIRONMENT_FALLBACK') {
                return;
              }

              console.warn('IntlProvider error:', error);
            }}
          >
            <Router locale={locale} onLocaleChange={setLocale} />
            <Toaster />
          </IntlProvider>
        </div>
      </LocaleProvider>
    </ThemeProvider>
  );
};
