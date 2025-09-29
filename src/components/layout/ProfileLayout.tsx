// Removed unused import: import { useTranslations } from 'use-intl';
import type { Locale } from '../../lib/i18n';
import { ErrorBoundary } from '../ErrorBoundary';
import { InstallPWA } from '../InstallPWA';
import { ProfileMainContent } from '../profile/ProfileMainContent';
import { ProfileSidebar } from '../profile/ProfileSidebar';
import { Navbar } from './Navbar';
// import { MessagingPopup } from '../messaging/MessagingPopup';

interface ProfileLayoutProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function ProfileLayout({ locale, onLocaleChange }: ProfileLayoutProps) {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar currentLocale={locale} onLocaleChange={onLocaleChange} />
      {/* Fixed padding for fixed navbar with improved mobile spacing */}
      <main className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6 pt-16 sm:pt-20">
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4'>
          {/* Main content - 2/3 width on large screens, full width on mobile */}
          <div className='lg:col-span-2 order-1'>
            <ErrorBoundary>
              <ProfileMainContent />
            </ErrorBoundary>
          </div>

          {/* Sidebar - 1/3 width on large screens, full width on mobile, appears after main content */}
          <div className='lg:col-span-1 order-2'>
            <ErrorBoundary>
              <ProfileSidebar />
            </ErrorBoundary>
          </div>
        </div>
      </main>

      {/* Messaging popup fixed at the bottom right */}
      {/* <MessagingPopup /> */}
      
      {/* PWA Install Prompt */}
      <InstallPWA />
    </div>
  );
}
