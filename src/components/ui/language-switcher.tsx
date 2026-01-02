import { GlobeIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";
import { useLocation } from "wouter";
import { type Locale, LOCALES } from "../../constants/i18n";
import { useLocale } from "../../hooks/useLocale";
import { getLocaleConfig, getPageUrlFromPath } from "../../lib/i18n";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();

  // Update URL when changing language
  const handleLanguageChange = useCallback(
    (newLocale: Locale) => {
      // First, call the setLocale to update the app state
      setLocale(newLocale);

      // Extract the current page path, removing any locale prefix
      const pathSegments = location.split("/").filter(Boolean);
      let pagePath = "/";

      // If the current path has a locale prefix, extract the page path after it
      if (
        pathSegments.length > 0 &&
        LOCALES.includes(pathSegments[0] as Locale)
      ) {
        // Get everything after the locale prefix
        pagePath = pathSegments.slice(1).join("/") || "/";
      } else if (pathSegments.length > 0) {
        // No locale prefix, use the full path
        pagePath = pathSegments.join("/");
      }

      // Build the new URL with the new locale
      setLocation(getPageUrlFromPath(newLocale, pagePath));
      setIsOpen(false);
    },
    [location, setLocale, setLocation]
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Select a language"
        >
          <GlobeIcon className="size-5.5" />
          <span className="absolute bottom-0 right-0.5 text-[1rem]">
            {getLocaleConfig(locale).flag}
          </span>
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
            {localeOption === locale && (
              <span className="ml-auto text-xs opacity-60">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
