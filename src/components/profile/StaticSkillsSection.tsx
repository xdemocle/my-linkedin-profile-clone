import { useTranslations } from 'use-intl';

export function StaticSkillsSection() {
  const t = useTranslations('Skills');

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
      <div className="space-y-3">
        <div className="flex flex-col">
          <span className="font-medium">{t('frontendDevelopment')}</span>
          <span className="text-sm text-muted-foreground">Expert</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{t('reactJs')}</span>
          <span className="text-sm text-muted-foreground">Advanced</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{t('javascript')}</span>
          <span className="text-sm text-muted-foreground">Expert</span>
        </div>
      </div>
    </div>
  );
}
