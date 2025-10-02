import { useTranslations } from 'use-intl';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useProfileData } from '../../hooks/useProfileData';

export function AboutSection() {
  const t = useTranslations('About');
  const profileData = useProfileData();
  const { personal } = profileData;

  return (
    <Card className="mt-6 shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">{t('firstParagraph')}</p>

        <p className="mt-6 text-foreground leading-relaxed">{t('disclaimer')}</p>

        <p className="mt-6 text-foreground leading-relaxed">{t('fullStackDeveloper')}</p>

        <p className="mt-6 text-foreground leading-relaxed">{t('currentlyWorking')}</p>

        <p className="mt-6 text-foreground leading-relaxed">{personal.about}</p>

        <p className="mt-6 text-foreground leading-relaxed">{t('lastParagraph')}</p>
      </CardContent>
    </Card>
  );
}
