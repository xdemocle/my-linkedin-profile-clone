// Removed unused import: import { useTranslations } from 'use-intl';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import type { Locale } from '../../lib/i18n';
import { ProfileMainContent } from '../profile/ProfileMainContent';
import { ProfileSidebar } from '../profile/ProfileSidebar';
import { Navbar } from './Navbar';
// import { MessagingPopup } from '../messaging/MessagingPopup';

interface ProfileLayoutProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function ProfileLayout({ locale, onLocaleChange }: ProfileLayoutProps) {
  const { visible } = useScrollDirection();

  return (
    <div className='min-h-screen bg-background'>
      <Navbar currentLocale={locale} onLocaleChange={onLocaleChange} />
      {/* Dynamic padding based on navbar visibility */}
      <main
        className={`
        max-w-6xl mx-auto px-4 py-6 
        transition-all duration-300 ease-in-out
        ${visible ? 'pt-16' : 'pt-4'}
      `}
      >
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {/* Main content - 2/3 width on large screens */}
          <div className='lg:col-span-2'>
            <ProfileMainContent />
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className='lg:col-span-1'>
            <ProfileSidebar />
          </div>
        </div>
      </main>

      {/* Messaging popup fixed at the bottom right */}
      {/* <MessagingPopup /> */}
    </div>
  );
}
