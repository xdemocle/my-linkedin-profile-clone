import { createContext } from 'react';
import type { ComponentType } from 'react';

export interface NavLink {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

interface AppContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isMobile: boolean;
  navLinks: NavLink[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
