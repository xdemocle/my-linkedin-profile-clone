/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { LOCALE_DEFAULT, type Locale } from '../constants/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

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
