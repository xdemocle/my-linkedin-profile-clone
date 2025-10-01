import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { LOCALE_DEFAULT, type Locale } from '../constants/i18n';
import { LocaleContext } from './locale-context';

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LocaleProvider({ children, initialLocale = LOCALE_DEFAULT }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Keep the locale in sync with initialLocale prop
  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}
