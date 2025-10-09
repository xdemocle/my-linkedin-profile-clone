import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  return context;
}
