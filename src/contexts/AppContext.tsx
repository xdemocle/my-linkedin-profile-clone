import { createContext } from 'react';

interface AppContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  isMobile: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
