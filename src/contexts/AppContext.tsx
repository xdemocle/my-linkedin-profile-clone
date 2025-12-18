import type { ComponentType } from 'react';
import { createContext } from 'react';

export interface NavLink {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

interface SocialLink {
  href: string;
  label: string;
}

interface AppContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isMobile: boolean;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
