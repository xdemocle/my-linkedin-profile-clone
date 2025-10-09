import { useApp } from '@/hooks';
import { cn } from '@/lib';
import { BackpackIcon, FileTextIcon, HomeIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';
import { useTranslations } from 'use-intl';
import { useProfileData } from '../../hooks/useProfileData';
import { LinkTranslated } from '../link-translated';
import { Logo } from '../Logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LanguageSwitcher } from '../ui/language-switcher';
import { ScrollProgress } from '../ui/scroll-progress';
import { ThemeToggle } from '../ui/theme-toggle';
import { Search } from './Search';

export function Navbar() {
  const t = useTranslations('Navigation');
  const { isSearchOpen, isMobile } = useApp();
  const { personal } = useProfileData();

  return (
    <header className="border-b bg-card/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-xs">
      {/* Scroll progress indicator */}
      <ScrollProgress color="var(--ring)" height={2} className="z-1" />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center h-12 sm:h-14 z-0">
        {/* Logo */}
        <LinkTranslated href="/">
          <Logo />
        </LinkTranslated>

        {/* Search */}
        <Search />

        {/* Navigation */}
        <nav className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label={t('home')} asChild>
            <LinkTranslated href="/">
              <HomeIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Experience" asChild>
            <LinkTranslated href="/experience">
              <BackpackIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Projects" asChild>
            <LinkTranslated href="/projects">
              <FileTextIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Skills" asChild>
            <LinkTranslated href="/skills">
              <FileTextIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-10 hidden md:inline-flex"
            aria-label="Recommendations"
            asChild
          >
            <LinkTranslated href="/recommendations">
              <FileTextIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <div className={cn('flex items-center', isMobile && isSearchOpen ? 'hidden' : '')}>
            <Separator orientation="vertical" className="w-[1px] h-4 mx-2 bg-foreground hidden md:block" />

            <ThemeToggle />
            <LanguageSwitcher />

            <Button variant="ghost" size="icon" aria-label="User menu">
              <Avatar className="size-5.5">
                <AvatarImage src={personal.avatar} alt="User" />
                <AvatarFallback>RR</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
