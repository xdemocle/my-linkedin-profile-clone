import { useProfileData } from '@/hooks';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { LinkTranslated } from '../components/link-translated';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

export function ExperiencePage() {
  const t = useTranslations('Experience');
  const tData = useTranslations('ProfileData.experience');
  const { personal } = useProfileData();

  // Get all 9 experiences from translations
  const experiences = Array.from({ length: 9 }, (_, i) => {
    const expKey = `exp${i + 1}`;
    return {
      company: tData(`${expKey}.company`),
      position: tData(`${expKey}.position`),
      type: tData.has(`${expKey}.type`) ? tData(`${expKey}.type`) : undefined,
      dateRange: tData(`${expKey}.dateRange`),
      location: tData.has(`${expKey}.location`) ? tData(`${expKey}.location`) : undefined,
      description: tData(`${expKey}.description`),
      highlights: Array.from({ length: 10 }, (_, j) => {
        try {
          return tData(`${expKey}.highlights.${j}`);
        } catch {
          return null;
        }
      }).filter(Boolean),
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <Button variant="ghost" size="sm" className="mb-4" asChild>
                <LinkTranslated href="/">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  {t('backToProfile')}
                </LinkTranslated>
              </Button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{t('title')}</h1>
                  <p className="text-muted-foreground mt-1">{personal.name}</p>
                </div>
                {/* Edit buttons removed - read-only mode */}
              </div>
            </div>

            {/* Experience List */}
            <Card className="shadow-xs">
              <CardContent className="p-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="mb-8 last:mb-0">
                    {index > 0 && <Separator className="my-8" />}
                    <div className="flex gap-4">
                      <Avatar className="w-16 h-16 flex-shrink-0">
                        <AvatarImage src="/assets/png/avatar.png" />
                        <AvatarFallback>{exp.company[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="mb-3">
                          <h3 className="text-xl font-semibold">{exp.position}</h3>
                          <p className="text-lg text-muted-foreground">{exp.company}</p>
                          {exp.type && <p className="text-sm text-muted-foreground">{exp.type}</p>}
                          <p className="text-sm text-muted-foreground mt-1">
                            {exp.dateRange}
                            {exp.location && ` • ${exp.location}`}
                          </p>
                        </div>

                        <p className="text-sm leading-relaxed mb-4">{exp.description}</p>

                        {exp.highlights.length > 0 && (
                          <ul className="space-y-2">
                            {exp.highlights.map((highlight, hIndex) => (
                              <li key={hIndex} className="text-sm flex gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Add Experience CTA removed as requested */}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-xs">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t('keyAchievements')}</h2>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{t('highUserEngagement')}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('highUserEngagementDesc')}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{t('majorRefactoring')}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('majorRefactoringDesc')}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{t('defiDappLaunch')}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('defiDappLaunchDesc')}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{t('improvedCodeQuality')}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('improvedCodeQualityDesc')}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{t('boostedProductivity')}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('boostedProductivityDesc')}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{t('designConsistency')}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t('designConsistencyDesc')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
