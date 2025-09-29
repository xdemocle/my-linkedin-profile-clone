import { GlobeIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import type { Locale } from '../../lib/i18n';
import { locales } from '../../lib/i18n';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';

// Use country flags for languages
const languageFlags: Record<Locale, string> = {
  en: '🇺🇸',
  it: '🇮🇹',
  fr: '🇫🇷',
  es: '🇪🇸',
  ar: '🇸🇦',
};

const languageNames: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
  es: 'Español',
  ar: 'العربية',
};

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onChange: (locale: Locale) => void;
}

export function LanguageSwitcher({ currentLocale, onChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='relative' aria-label='Select a language'>
          <GlobeIcon className='h-5! w-5!' />
          <span className='absolute bottom-0 right-0 text-[1rem]'>{languageFlags[currentLocale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {locales.map(locale => (
          <DropdownMenuItem
            key={locale}
            onClick={() => {
              onChange(locale);
              setIsOpen(false);
            }}
            className='flex items-center gap-2'
          >
            <span>{languageFlags[locale]}</span>
            <span>{languageNames[locale]}</span>
            {locale === currentLocale && <span className='ml-auto text-xs opacity-60'>✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
