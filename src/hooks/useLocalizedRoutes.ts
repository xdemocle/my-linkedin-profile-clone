import { useCallback } from 'react';
import { useLocation } from 'wouter';
import type { Locale } from '../lib/i18n';

export function useLocalizedRoutes() {
  const [location, setLocation] = useLocation();

  // Extract locale from the current path
  const getLocaleFromPath = useCallback((): Locale | null => {
    const pathSegments = location.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0];
      if (['en', 'it', 'fr', 'es', 'ar'].includes(firstSegment)) {
        return firstSegment as Locale;
      }
    }
    return null;
  }, [location]);

  // Navigate to a localized route
  const navigateToLocalizedRoute = useCallback((locale: Locale, path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const localizedPath = `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
    setLocation(localizedPath);
  }, [setLocation]);

  // Get the current route without the locale prefix
  const getRouteWithoutLocale = useCallback((): string => {
    const pathSegments = location.split('/').filter(Boolean);
    if (pathSegments.length > 0 && ['en', 'it', 'fr', 'es', 'ar'].includes(pathSegments[0])) {
      return `/${pathSegments.slice(1).join('/')}`;
    }
    return location;
  }, [location]);

  return {
    getLocaleFromPath,
    navigateToLocalizedRoute,
    getRouteWithoutLocale
  };
}
