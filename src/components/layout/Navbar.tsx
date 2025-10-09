import { BackpackIcon, FileTextIcon, HomeIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
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

export function Navbar() {
  const t = useTranslations('Navigation');
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

        {/* Search - hidden on mobile, shown on sm+ */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <input type="text" placeholder={t('search')} className="w-full bg-muted pl-10 h-8 rounded-md text-sm" />
        </div>

        {/* Navigation */}
        <nav className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <Button variant="ghost" size="icon" className="size-10" aria-label={t('home')} asChild>
            <LinkTranslated href="/">
              <HomeIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <Button variant="ghost" size="icon" className="size-10" aria-label="Experience" asChild>
            <LinkTranslated href="/experience">
              <BackpackIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <Button variant="ghost" size="icon" className="size-10" aria-label="Projects" asChild>
            <LinkTranslated href="/projects">
              <FileTextIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <Button variant="ghost" size="icon" className="size-10" aria-label="Skills" asChild>
            <LinkTranslated href="/skills">
              <FileTextIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <Button variant="ghost" size="icon" className="size-10" aria-label="Recommendations" asChild>
            <LinkTranslated href="/recommendations">
              <FileTextIcon className="size-5.5" />
            </LinkTranslated>
          </Button>

          <Separator orientation="vertical" className="block w-[1px] h-4 mx-1 bg-foreground" />

          <div className="items-center gap-0">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          <Button variant="ghost" size="icon" className="rounded-full size-10" aria-label="User menu">
            <Avatar className="size-6.5">
              <AvatarImage src={personal.avatar} alt="User" />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
          </Button>
        </nav>
      </div>
    </header>
  );
}
