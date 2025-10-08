import { LINKEDIN_PROFILE_URL, WEBSITE_URL } from '@/constants';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { Card, CardContent } from '../ui/card';

export function ProfileFooter() {
  const tFooter = useTranslations('ProfileFooter');

  return (
    <Card className="shadow-xs">
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground space-y-3">
          <div className="flex flex-wrap gap-2">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex items-center gap-1"
            >
              {tFooter('linkedinProfile')}
              <ExternalLinkIcon className="size-3" />
            </a>
            <span>•</span>
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex items-center gap-1"
            >
              {tFooter('personalWebsite')}
              <ExternalLinkIcon className="size-3" />
            </a>
          </div>
          <div className="pt-2 border-t">
            <p>{tFooter('copyright')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
