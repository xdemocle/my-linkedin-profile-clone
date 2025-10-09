import { WEBSITE_ROCCOME_URL, WEBSITE_URL } from '@/constants/webinfo';
import { cn } from '@/lib/utils';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { GhostIcon } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { useProfileData } from '../../hooks/useProfileData';
import { OnlineStatusIcon } from '../../lib/iconComponents';
import { ShareProfile } from '../ShareProfile';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function ProfileHeader() {
  const t = useTranslations('ProfileHeader');
  const tCommon = useTranslations('Common');
  const { personal } = useProfileData();

  return (
    <Card className="pt-0">
      {/* Cover Photo */}
      <div className="h-36 md:h-48 bg-muted relative rounded-t-md overflow-hidden border-b-1 border-primary/70">
        <img
          src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="p-6 relative">
        {/* Avatar - positioned to overlap the cover photo */}
        <Avatar
          className={cn(
            'w-32 h-32 md:w-44 md:h-44 border-4 border-secondary shadow-md hover:shadow-xl transition-all duration-300',
            'absolute -top-22 left-1/2 transform -translate-x-1/2 md:-top-31 sm:transform-none sm:translate-x-0 sm:left-6'
          )}
        >
          <AvatarImage src={personal.avatar} alt={personal.name} />
          <AvatarFallback>{personal.name}</AvatarFallback>
        </Avatar>

        <div className="pt-7 md:pt-10">
          <div className="flex justify-between items-start gap-4 flex-col sm:flex-row">
            <div className="flex flex-col flex-1 w-full text-center gap-1 sm:text-left">
              <div className="flex items-center gap-2 flex-col sm:flex-row">
                <h1 className="text-2xl font-bold">
                  {personal.name} - {t('fullStackEngineer').split('|')[0].trim()}
                </h1>
                <div className="flex items-center gap-1">
                  <OnlineStatusIcon className="text-green-500 h-3 w-3" />
                  <span className="text-xs text-muted-foreground">EMEA, GULF, UAE</span>
                </div>
              </div>

              <p className="leading-snug mt-1 text-sm">{t('fullStackEngineer')}</p>

              <div className="flex items-center gap-2 mt-2 text-sm justify-center sm:justify-start">
                <span className="text-muted-foreground">{personal.location}</span>
                <span className="text-muted-foreground">•</span>
                <a href={`mailto:${personal.email}`} className="text-primary hover:underline font-medium">
                  {t('contactInfo')}
                </a>
              </div>

              <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
                {personal.website && (
                  <a
                    href={personal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                  >
                    {t('myWebsite')}
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2 text-sm justify-center sm:justify-start">
                <span className="text-primary font-medium">5,984 {t('followers')}</span>
                <span className="text-muted-foreground">•</span>
                <a href="#" className="text-primary hover:underline font-medium">
                  500+ {t('connections')}
                </a>
              </div>
            </div>

            <div className="flex w-full sm:w-fit flex-col items-center sm:items-end gap-2 justify-center sm:justify-start">
              <div className="flex items-center gap-2 text-sm justify-center sm:justify-start">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <GhostIcon className="size-4! fill-primary-foreground" />
                </div>
                <span className="font-medium">{t('stealthStartup')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap flex-col sm:flex-row gap-2 mt-6">
            <Button className="bg-primary text-white hover:bg-primary-700 rounded-full px-6">{t('openToWork')}</Button>

            <Button variant="outline" className="rounded-full px-4" asChild>
              <a target="_blank" href={`${WEBSITE_ROCCOME_URL}/#newsletters`} rel="noopener noreferrer">
                {tCommon('newsletters')}
              </a>
            </Button>

            <ShareProfile profileUrl={WEBSITE_URL} profileName={tCommon('shareProfileName')}>
              <Button variant="outline" className="rounded-full px-4">
                {tCommon('share')}
              </Button>
            </ShareProfile>
          </div>
        </div>
      </div>
    </Card>
  );
}
