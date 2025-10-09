import { useEffect, useState } from 'react';
import type { Theme } from '../types/theme';
import { ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>(() => {
    // Initialize with the theme that was already applied by the blocking script
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const updateTheme = () => {
      let resolvedTheme: 'light' | 'dark';

      if (theme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        resolvedTheme = theme;
      }

      // Only update if the theme actually changed
      if (actualTheme !== resolvedTheme) {
        setActualTheme(resolvedTheme);

        // Remove existing theme classes
        root.classList.remove('light', 'dark');

        // Add the resolved theme class
        root.classList.add(resolvedTheme);
      }

      // Always store theme preference (user's choice, not resolved theme)
      localStorage.setItem('theme', theme);
    };

    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, actualTheme]);

  return <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>{children}</ThemeContext.Provider>;
}
