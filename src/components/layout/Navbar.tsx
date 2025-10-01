import {
  BackpackIcon,
  BellIcon,
  ChatBubbleIcon,
  FileTextIcon,
  GearIcon,
  HomeIcon,
  Link2Icon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';
import { useTranslations } from 'use-intl';
import { useLocation } from 'wouter';
import type { Locale } from '../../constants/i18n';
import { scrollToTop } from '../../utils/scrollUtils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LanguageSwitcher } from '../ui/language-switcher';
import { ScrollProgress } from '../ui/scroll-progress';
import { ThemeToggle } from '../ui/theme-toggle';

const LinkedInLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-primary" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
  </svg>
);

interface NavbarProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function Navbar({ currentLocale, onLocaleChange }: NavbarProps) {
  const t = useTranslations('Navigation');
  const [, setLocation] = useLocation();

  // Custom navigation handler that scrolls to top and includes locale prefix
  const handleNavigation = (path: string) => {
    const localizedPath = path === '/' ? `/${currentLocale}` : `/${currentLocale}${path}`;
    setLocation(localizedPath);
    scrollToTop(true);
  };

  return (
    <header className="border-b bg-card/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-xs">
      {/* Scroll progress indicator */}
      <ScrollProgress color="var(--linkedin-blue-bright)" height={2} />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center h-12 sm:h-14">
        {/* Logo */}
        <div className="mr-2 sm:mr-4">
          <LinkedInLogo />
        </div>

        {/* Search - hidden on mobile, shown on sm+ */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <input type="text" placeholder={t('search')} className="w-full bg-muted pl-10 h-8 rounded-md text-sm" />
        </div>

        {/* Navigation */}
        <nav className="ml-auto flex items-center gap-0.5 sm:gap-1">
          {/* Core navigation - always visible with larger touch targets on mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-9 sm:w-9"
            onClick={() => handleNavigation('/')}
            aria-label={t('home')}
          >
            <HomeIcon className="h-5.5! w-5.5!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-9 sm:w-9"
            onClick={() => handleNavigation('/experience')}
            aria-label="Experience"
          >
            <BackpackIcon className="h-5.5! w-5.5!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-9 sm:w-9"
            onClick={() => handleNavigation('/projects')}
            aria-label="Projects"
          >
            <FileTextIcon className="h-5.5! w-5.5!" />
          </Button>

          {/* Secondary navigation - hidden on small mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-9 sm:w-9 hidden xs:flex"
            onClick={() => handleNavigation('/skills')}
            aria-label="Skills"
          >
            <FileTextIcon className="h-5.5! w-5.5!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-9 sm:w-9 hidden sm:flex"
            onClick={() => handleNavigation('/network')}
            aria-label="Network"
          >
            <Link2Icon className="h-5.5! w-5.5!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-9 sm:w-9 hidden sm:flex"
            onClick={() => handleNavigation('/messages')}
            aria-label="Messages"
          >
            <ChatBubbleIcon className="h-5.5! w-5.5!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-9 sm:w-9 hidden xs:flex"
            onClick={() => handleNavigation('/notifications')}
            aria-label="Notifications"
          >
            <BellIcon className="h-5.5! w-5.5!" />
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 sm:h-9 sm:w-9" aria-label="User menu">
            <Avatar className="h-5! w-5!">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-9 sm:w-9 hidden xs:flex"
            onClick={() => handleNavigation('/settings')}
            aria-label="Settings"
          >
            <GearIcon className="h-5.5! w-5.5!" />
          </Button>

          <Separator orientation="vertical" color="accent" decorative />

          {/* Language and Theme - hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={currentLocale} onChange={onLocaleChange} />
          </div>
        </nav>
      </div>
    </header>
  );
}
