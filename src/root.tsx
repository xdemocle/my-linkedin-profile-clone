import { IntlProvider } from 'use-intl';
import { InstallPWA } from './components/InstallPWA';
import { Router } from './components/Router';
import { Toaster } from './components/ui/toaster';
import { type Locale } from './constants';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useLocale } from './hooks/useLocale';
import { getDirection } from './lib/i18n';

// Define the RootProps interface
interface RootProps {
  prerenderLocale: Locale;
}

// Inner component that uses the locale context
function AppContent() {
  const { locale, messages } = useLocale();
  const direction = getDirection(locale);

  return (
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
        <Router />
        <Toaster />
      </IntlProvider>
    </div>
  );
}

export const Root = ({ prerenderLocale }: RootProps) => {
  return (
    <ThemeProvider>
      <LocaleProvider prerenderLocale={prerenderLocale}>
        <AppContent />
      </LocaleProvider>

      {/* PWA Install Prompt */}
      <InstallPWA />
    </ThemeProvider>
  );
};
