import { useTranslations } from 'use-intl';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Language {
  nameKey: string;
  levelKey: string;
}

export function ProfileLanguages() {
  const t = useTranslations('Languages');

  const profileLanguages: Language[] = [
    { nameKey: 'arabic', levelKey: 'elementary' },
    { nameKey: 'english', levelKey: 'fullProfessional' },
    { nameKey: 'french', levelKey: 'elementary' },
    { nameKey: 'italian', levelKey: 'nativeOrBilingual' },
    { nameKey: 'portuguese', levelKey: 'elementary' },
    { nameKey: 'spanish', levelKey: 'limitedWorking' },
    { nameKey: 'zulu', levelKey: 'elementary' },
  ];

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle className="text-base">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {profileLanguages.map((lang, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-sm">{t(lang.nameKey)}</span>
              <Badge variant="outline" className="text-xs">
                {t(lang.levelKey)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
