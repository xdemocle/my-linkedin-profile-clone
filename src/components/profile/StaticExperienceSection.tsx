import { useTranslations } from 'use-intl';

export function StaticExperienceSection() {
  const t = useTranslations('Experience');

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
      <div className="space-y-6">
        <div className="border-l-2 border-primary pl-4">
          <h3 className="text-xl font-semibold">{t('technicalLead')}</h3>
          <p className="text-muted-foreground">{t('duration1')}</p>
          <p className="text-muted-foreground mb-2">📍 {t('milano')}</p>
          <p className="mt-2">{t('ledFrontendDevelopment')}</p>
        </div>
        <div className="border-l-2 border-muted pl-4">
          <h3 className="text-xl font-semibold">{t('frontendDeveloper')}</h3>
          <p className="text-muted-foreground">{t('duration2')}</p>
          <p className="mt-2">{t('developedInteractiveUI')}</p>
        </div>
        <div className="border-l-2 border-muted pl-4">
          <h3 className="text-xl font-semibold">{t('seniorSolutionsEngineer')}</h3>
          <p className="text-muted-foreground">{t('duration3')}</p>
          <p className="mt-2">{t('createdDashboardInterfaces')}</p>
        </div>
      </div>
    </div>
  );
}
