import { GlobeIcon } from '@radix-ui/react-icons';
import { useCallback, useState } from 'react';
import { useLocation } from 'wouter';
import { type Locale, LOCALES, LOCALE_DEFAULT } from '../../constants/i18n';
import { useLocale } from '../../hooks/useLocale';
import { getLocaleConfig, getPageUrlFromPath } from '../../lib/i18n';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();

  // Update URL when changing language
  const handleLanguageChange = useCallback(
    (newLocale: Locale) => {
      // First, call the setLocale to update the app state
      setLocale(newLocale);

      // We need a 3rd rule: if the locale is the default, redirect to '/'
      if (newLocale === LOCALE_DEFAULT) {
        setLocation(getPageUrlFromPath(newLocale, '/'));
        return;
      }

      // Then, update the URL to reflect the new locale
      const pathSegments = location.split('/').filter(Boolean);

      // If the current path already has a locale prefix, replace it
      if (pathSegments.length > 0 && LOCALES.includes(pathSegments[0] as Locale)) {
        pathSegments[0] = newLocale;
        setLocation(getPageUrlFromPath(newLocale, pathSegments[1]));
      } else {
        // If there's no locale prefix, add it
        setLocation(getPageUrlFromPath(newLocale, location));
      }

      setIsOpen(false);
    },
    [location, setLocale, setLocation]
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Select a language">
          <GlobeIcon className="h-5! w-5!" />
          <span className="absolute bottom-0 right-0 text-[1rem]">{getLocaleConfig(locale).flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map(localeOption => (
          <DropdownMenuItem
            key={localeOption}
            onClick={() => handleLanguageChange(localeOption)}
            className="flex items-center gap-2"
          >
            <span>{getLocaleConfig(localeOption).flag}</span>
            <span>{getLocaleConfig(localeOption).name}</span>
            {localeOption === locale && <span className="ml-auto text-xs opacity-60">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
