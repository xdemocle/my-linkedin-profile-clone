import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Locale } from '../lib/i18n';
import { LocaleContext } from './locale-context';

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LocaleProvider({ children, initialLocale = 'en' }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  
  // Keep the locale in sync with initialLocale prop
  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
