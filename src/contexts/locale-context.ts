import { createContext } from 'react';
import type { Locale } from '../lib/i18n';

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);
