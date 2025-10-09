import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './button';

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const handleToggle = () => {
    if (theme === 'system') {
      // If currently system, switch to the opposite of current actual theme
      setTheme(actualTheme === 'light' ? 'dark' : 'light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative"
      title={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      <SunIcon
        className={`size-5.5 transition-all duration-200 ${
          actualTheme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`}
      />
      <MoonIcon
        className={`absolute size-5.5 transition-all duration-200 ${
          actualTheme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
