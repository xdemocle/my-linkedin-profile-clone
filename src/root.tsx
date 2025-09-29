import { useEffect, useState } from 'react';
import { IntlProvider } from 'use-intl';
import { Router } from './components/Router';
import { ThemeProvider } from './contexts/ThemeContext';
import { type Locale, getDirection, getMessages } from './lib/i18n';

type Messages = Record<string, unknown>;

export function Root() {
  const [locale, setLocale] = useState<Locale>('en');
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    getMessages(locale).then(setMessages);
  }, [locale]);

  if (!messages) {
    return <div>Loading...</div>;
  }

  const direction = getDirection(locale);

  return (
    <ThemeProvider>
      <div dir={direction} className={direction === 'rtl' ? 'rtl' : 'ltr'}>
        <IntlProvider messages={messages} locale={locale}>
          <Router locale={locale} onLocaleChange={setLocale} />
        </IntlProvider>
      </div>
    </ThemeProvider>
  );
}
