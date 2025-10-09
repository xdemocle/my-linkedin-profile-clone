import { createContext } from 'react';

interface AppContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isMobile: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
