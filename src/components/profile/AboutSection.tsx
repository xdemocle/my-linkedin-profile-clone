import { useTranslations } from 'use-intl';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function AboutSection() {
  const t = useTranslations('About');

  return (
    <Card className="mt-4 shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">{t('firstParagraph')}</p>

        <p className="mt-3 text-foreground leading-relaxed">{t('disclaimer')}</p>

        <p className="mt-3 text-foreground leading-relaxed">{t('fullStackDeveloper')}</p>

        <p className="mt-3 text-foreground leading-relaxed">{t('currentlyWorking')}</p>

        <p className="mt-3 text-foreground leading-relaxed">~~~~~~~~~~~~~~~~~</p>

        <p className="mt-3 text-foreground leading-relaxed">{t('lastParagraph')}</p>
      </CardContent>
    </Card>
  );
}
