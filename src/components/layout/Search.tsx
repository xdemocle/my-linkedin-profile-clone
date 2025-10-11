import { useApp } from '@/hooks';
import { cn } from '@/lib';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';
import { useTranslations } from 'use-intl';
import { Button } from '../ui/button';

export function Search() {
  const refInputSearch = useRef<HTMLInputElement>(null);
  const { isSearchOpen, setIsSearchOpen, isMobile } = useApp();
  const t = useTranslations('Navigation');

  const toggleInputSearch = (forceStatus?: boolean) => {
    const updated = forceStatus ?? !isSearchOpen;

    setIsSearchOpen(updated);

    if (updated) {
      setTimeout(() => {
        refInputSearch.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="relative flex-1">
      <div className="absolute inset-0 left-0 flex items-center w-1">
        <Button
          variant="ghost"
          size="icon"
          className={isSearchOpen ? 'pointer-events-none' : ''}
          aria-label={t('search')}
          onClick={() => toggleInputSearch()}
        >
          <MagnifyingGlassIcon className={cn('transition-width', !isMobile || isSearchOpen ? 'size-4' : 'size-5.5')} />
        </Button>
      </div>

      <input
        ref={refInputSearch}
        type="text"
        placeholder={t('search')}
        className={cn(
          'bg-transparent lg:bg-muted px-10 h-9 rounded-sm text-sm transition-all w-xs',
          !isMobile || isSearchOpen ? '' : 'w-0.5',
          isSearchOpen ? 'bg-muted w-full md:max-w-lg' : ''
        )}
        onFocus={() => toggleInputSearch(true)}
        onBlur={() => toggleInputSearch(false)}
      />
    </div>
  );
}
