// Removed unused import: import { useTranslations } from 'use-intl';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import type { Locale } from '../../lib/i18n';
import { AboutSection } from '../profile/AboutSection';
// import { ActivitySection } from '../profile/ActivitySection';
// import { ConnectionsSection } from '../profile/ConnectionsSection';
import { ExperienceSection } from '../profile/ExperienceSection';
// import { PeopleAlsoViewed } from '../profile/PeopleAlsoViewed';
import { ProfileHeader } from '../profile/ProfileHeader';
import { RecommendationsSection } from '../profile/RecommendationsSection';
import { SkillsSection } from '../profile/SkillsSection';
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
          <div className='lg:col-span-2 space-y-4'>
            <ProfileHeader />
            <AboutSection />
            {/* <ActivitySection /> */}
            <ExperienceSection />
            <SkillsSection />
            <RecommendationsSection />
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className='lg:col-span-1 space-y-4'>
            {/* <PeopleAlsoViewed /> */}
            {/* <ConnectionsSection /> */}

            {/* Ad section */}
            {/* <div className='bg-card p-4 rounded-md shadow-xs text-center'>
              <p className='text-xs text-muted-foreground mb-2'>Ad</p>
              <h3 className='font-medium text-sm'>Unlock Your Career Potential</h3>
              <p className='text-xs text-muted-foreground mt-1 mb-3'>Get exclusive insights with LinkedIn Premium</p>
              <img
                src='https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png'
                alt='LinkedIn Premium'
                className='w-full h-32 object-cover rounded-md mb-3'
              />
              <button className='text-primary text-sm hover:underline'>Try for free</button>
            </div> */}
          </div>
        </div>
      </main>

      {/* Messaging popup fixed at the bottom right */}
      {/* <MessagingPopup /> */}
    </div>
  );
}
