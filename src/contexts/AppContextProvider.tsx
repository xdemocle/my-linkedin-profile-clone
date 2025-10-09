import useMediaQuery from 'beautiful-react-hooks/useMediaQuery';
import { useState, type ReactNode } from 'react';
import { AppContext } from './AppContext';

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 60rem)');

  return <AppContext.Provider value={{ isSearchOpen, setIsSearchOpen, isMobile }}>{children}</AppContext.Provider>;
}
