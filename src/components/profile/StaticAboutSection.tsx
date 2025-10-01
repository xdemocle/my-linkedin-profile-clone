import { useTranslations } from 'use-intl';

export function StaticAboutSection() {
  const t = useTranslations('About');

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3">
        <p>{t('firstParagraph')}</p>
        <p className="text-sm italic">{t('disclaimer')}</p>
        <p>{t('fullStackDeveloper')}</p>
        <p>{t('currentlyWorking')}</p>
      </div>
    </div>
  );
}
