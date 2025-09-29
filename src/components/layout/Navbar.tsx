import {
  BackpackIcon,
  BellIcon,
  ChatBubbleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollProgress } from '../ui/scroll-progress';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';
import { LanguageSwitcher } from '../ui/language-switcher';
import type { Locale } from '../../lib/i18n';

const LinkedInLogo = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-8 w-8 text-primary' fill='currentColor'>
    <path d='M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z'></path>
  </svg>
);

interface NavbarProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function Navbar({ currentLocale, onLocaleChange }: NavbarProps) {
  const { visible, isScrolling } = useScrollDirection({
    threshold: 15,          // Slightly higher threshold to avoid too-sensitive toggling
    idleHideDelay: 2500,    // Hide after 2.5 seconds of idle time
    initiallyVisible: true
  });
  
  return (
    <header 
      className={`
        border-b border-border sticky top-0 z-50
        transition-all duration-300 ease-in-out
        ${visible ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolling && visible ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-background'}
      `}
    >
      {/* Scroll progress indicator */}
      <ScrollProgress color="var(--linkedin-blue-bright)" height={2} />
      <div className='max-w-6xl mx-auto px-4 flex items-center h-14'>
        {/* Logo */}
        <div className='mr-4'>
          <LinkedInLogo />
        </div>

        {/* Search */}
        <div className='relative flex-1 max-w-md'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <MagnifyingGlassIcon className='h-4 w-4 text-muted-foreground' />
          </div>
          <Input placeholder='Search' className='bg-muted pl-10' />
        </div>

        {/* Navigation */}
        <NavigationMenu className='ml-auto'>
          <NavigationMenuList className='flex items-center gap-1'>
            <NavigationMenuItem>
              <LanguageSwitcher 
                currentLocale={currentLocale} 
                onChange={onLocaleChange} 
              />
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Button variant='ghost' size='icon' asChild>
                <NavigationMenuLink>
                  <HomeIcon className='h-5 w-5' />
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button variant='ghost' size='icon' asChild>
                <NavigationMenuLink>
                  <PersonIcon className='h-5 w-5' />
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button variant='ghost' size='icon' asChild>
                <NavigationMenuLink>
                  <BackpackIcon className='h-5 w-5' />
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button variant='ghost' size='icon' asChild>
                <NavigationMenuLink>
                  <ChatBubbleIcon className='h-5 w-5' />
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button variant='ghost' size='icon' asChild>
                <NavigationMenuLink>
                  <BellIcon className='h-5 w-5' />
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button variant='ghost' size='icon' className='rounded-full' asChild>
                <NavigationMenuLink>
                  <Avatar className='h-7 w-7'>
                    <AvatarImage src='https://github.com/shadcn.png' alt='User' />
                    <AvatarFallback>RR</AvatarFallback>
                  </Avatar>
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
