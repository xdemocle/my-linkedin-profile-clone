import {
  BackpackIcon,
  BellIcon,
  ChatBubbleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  ReaderIcon,
} from '@radix-ui/react-icons';
import { Link } from 'wouter';
import { useTranslations } from 'use-intl';
import type { Locale } from '../../lib/i18n';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LanguageSwitcher } from '../ui/language-switcher';
import { ScrollProgress } from '../ui/scroll-progress';
import { ThemeToggle } from '../ui/theme-toggle';

const LinkedInLogo = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-8 w-8 text-primary' fill='currentColor'>
    <path d='M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z'></path>
  </svg>
);

interface NavbarProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function Navbar({ currentLocale, onLocaleChange }: NavbarProps) {
  const t = useTranslations('Navigation');
  
  return (
    <header className="border-b bg-card/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-xs">
      {/* Scroll progress indicator */}
      <ScrollProgress color='var(--linkedin-blue-bright)' height={2} />
      <div className='max-w-6xl mx-auto px-2 sm:px-4 flex items-center h-12 sm:h-14'>
        {/* Logo */}
        <div className='mr-2 sm:mr-4'>
          <LinkedInLogo />
        </div>

        {/* Search - hidden on mobile, shown on sm+ */}
        <div className='relative flex-1 max-w-md hidden sm:block'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <MagnifyingGlassIcon className='h-4 w-4 text-muted-foreground' />
          </div>
          <Input placeholder={t('search')} className='bg-muted pl-10' />
        </div>

        {/* Navigation */}
        <nav className='ml-auto flex items-center gap-0.5 sm:gap-1'>
          {/* Language and Theme - hidden on mobile */}
          <div className='hidden md:flex items-center gap-1'>
            <LanguageSwitcher currentLocale={currentLocale} onChange={onLocaleChange} />
            <ThemeToggle />
          </div>

          {/* Core navigation - always visible with larger touch targets on mobile */}
          <Button variant='ghost' size='icon' className='h-10 w-10 sm:h-9 sm:w-9' asChild>
            <Link href="/" aria-label="Home">
              <HomeIcon className='h-5 w-5' />
            </Link>
          </Button>

          <Button variant='ghost' size='icon' className='h-10 w-10 sm:h-9 sm:w-9' asChild>
            <Link href="/blog" aria-label="Blog">
              <ReaderIcon className='h-5 w-5' />
            </Link>
          </Button>

          {/* Secondary navigation - hidden on small mobile */}
          <Button variant='ghost' size='icon' className='h-10 w-10 sm:h-9 sm:w-9 hidden xs:flex' aria-label="Profile">
            <PersonIcon className='h-5 w-5' />
          </Button>

          <Button variant='ghost' size='icon' className='h-10 w-10 sm:h-9 sm:w-9 hidden sm:flex' aria-label="Jobs">
            <BackpackIcon className='h-5 w-5' />
          </Button>

          <Button variant='ghost' size='icon' className='h-10 w-10 sm:h-9 sm:w-9 hidden sm:flex' aria-label="Messages">
            <ChatBubbleIcon className='h-5 w-5' />
          </Button>

          <Button variant='ghost' size='icon' className='h-10 w-10 sm:h-9 sm:w-9 hidden xs:flex' aria-label="Notifications">
            <BellIcon className='h-5 w-5' />
          </Button>

          <Button variant='ghost' size='icon' className='rounded-full h-10 w-10 sm:h-9 sm:w-9' aria-label="User menu">
            <Avatar className='h-7 w-7'>
              <AvatarImage src='https://github.com/shadcn.png' alt='User' />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
          </Button>
        </nav>
      </div>
    </header>
  );
}
