import { SUBSTACK_PROFILE_URL } from '@/constants';
import { useProfileData } from '@/hooks';
import { RowSpacingIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

export function AboutSection() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('About');
  const c = useTranslations('Common');
  const profileData = useProfileData();
  const { personal } = profileData;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle className="text-xl">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{t('firstParagraph', { substack: SUBSTACK_PROFILE_URL })}</p>

          <p className="mt-6 text-foreground leading-relaxed">{t('disclaimer')}</p>

          <CollapsibleContent>
            <p className="mt-6 text-foreground leading-relaxed">{t('fullStackDeveloper')}</p>

            <p className="mt-6 text-foreground leading-relaxed">{t('currentlyWorking')}</p>

            <p className="mt-6 text-foreground leading-relaxed">{personal.about}</p>

            <p className="mt-6 text-foreground leading-relaxed">{t('lastParagraph')}</p>
          </CollapsibleContent>

          <CollapsibleTrigger className="float-right" asChild>
            <Button type="button" variant="ghost">
              {open ? c('showLess') : c('showMore')} <RowSpacingIcon className="text-primary" />
            </Button>
          </CollapsibleTrigger>
        </CardContent>
      </Card>
    </Collapsible>
  );
}
