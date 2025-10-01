import { useTranslations } from 'use-intl';

export function StaticProfileHeader() {
  const t = useTranslations('ProfileHeader');

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground">DC</span>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Democle</h1>
          <p className="text-xl text-muted-foreground mb-4">{t('stealthStartup')}</p>
          <p className="text-muted-foreground mb-4">
            {t('fullStackEngineer')}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            📍 {t('location')}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">React</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">TypeScript</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Web3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
