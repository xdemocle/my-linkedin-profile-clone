import { SOCIAL_LINKS } from '@/constants';
import { BackpackIcon, CardStackPlusIcon, HomeIcon, LayersIcon, RocketIcon } from '@radix-ui/react-icons';
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery';
import { useMemo, useState, type ReactNode } from 'react';
import { useTranslations } from 'use-intl';
import { AppContext } from './AppContext';

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useMediaQuery('(max-width: 60rem)');
  const t = useTranslations('Navigation');

  const navLinks = useMemo(
    () => [
      { href: '/', label: t('home'), icon: HomeIcon },
      { href: '/experience', label: t('experience'), icon: BackpackIcon },
      { href: '/projects', label: t('projects'), icon: RocketIcon },
      { href: '/skills', label: t('skills'), icon: LayersIcon },
      { href: '/recommendations', label: t('recommendations'), icon: CardStackPlusIcon },
    ],
    [t]
  );

  const socialLinks = SOCIAL_LINKS;

  return (
    <AppContext.Provider
      value={{ isSearchOpen, setIsSearchOpen, isMenuOpen, setIsMenuOpen, isMobile, navLinks, socialLinks, searchQuery, setSearchQuery }}
    >
      {children}
    </AppContext.Provider>
  );
}
