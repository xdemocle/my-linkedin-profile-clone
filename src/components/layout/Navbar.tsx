import { BackpackIcon, FileTextIcon, HomeIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';
import { useTranslations } from 'use-intl';
import { useLocation } from 'wouter';
import { useLocale } from '../../hooks/useLocale';
import { getPageUrlFromPath } from '../../lib/i18n';
import { scrollToTop } from '../../utils/scrollUtils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LanguageSwitcher } from '../ui/language-switcher';
import { ScrollProgress } from '../ui/scroll-progress';
import { ThemeToggle } from '../ui/theme-toggle';

export function Navbar() {
  const { locale } = useLocale();
  const t = useTranslations('Navigation');
  const [, setLocation] = useLocation();

  // Custom navigation handler that scrolls to top and includes locale prefix
  const handleNavigation = (path: string) => {
    setLocation(getPageUrlFromPath(locale, path));
    scrollToTop(true);
  };

  return (
    <header className="border-b bg-card/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-xs">
      {/* Scroll progress indicator */}
      <ScrollProgress color="var(--ring)" height={2} className="z-1" />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center h-12 sm:h-14 z-0">
        {/* Logo */}
        <div className="mr-2 sm:mr-4">
          <img src="/assets/logo/rr-logo--bg-trasnparent.png" width={32} height={32} alt="Logo" />
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
          <Button
            variant="ghost"
            size="icon"
            className="size-10 sm:size-9"
            onClick={() => handleNavigation('/')}
            aria-label={t('home')}
          >
            <HomeIcon className="h-5.5! w-5.5!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-10 sm:size-9"
            onClick={() => handleNavigation('/experience')}
            aria-label="Experience"
          >
            <BackpackIcon className="h-5.5! w-5.5!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-10 sm:size-9"
            onClick={() => handleNavigation('/projects')}
            aria-label="Projects"
          >
            <FileTextIcon className="h-5.5! w-5.5!" />
          </Button>

          <Separator orientation="vertical" color="foreground" />

          <Button variant="ghost" size="icon" className="rounded-full size-10 sm:size-9" aria-label="User menu">
            <Avatar className="h-5! w-5!">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
          </Button>

          {/* Language and Theme - hidden on mobile */}
          <div className="items-center gap-1">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
