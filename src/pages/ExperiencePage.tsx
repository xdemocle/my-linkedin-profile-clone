import { useProfileData } from '@/hooks';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { LinkTranslated } from '../components/link-translated';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

interface Experience {
  companyKey: string;
  logo: string;
  titleKey: string;
  durationKey: string;
  locationKey: string;
  descriptionKey: string;
  skills?: string[];
}

const experiences: Experience[] = [
  {
    companyKey: 'technicalLead',
    logo: '/assets/png/ibm_logo.png',
    titleKey: 'frontendDeveloper',
    durationKey: 'duration1',
    locationKey: 'milano',
    descriptionKey: 'ledFrontendDevelopmentFull',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Team Leadership'],
  },
  {
    companyKey: 'seniorSolutionsEngineer',
    logo: '/assets/png/oracle_logo.png',
    titleKey: 'frontendDeveloper',
    durationKey: 'duration2',
    locationKey: 'milano',
    descriptionKey: 'developedInteractiveUIFull',
    skills: ['React', 'JavaScript', 'CSS3', 'SASS', 'Figma'],
  },
  {
    companyKey: 'cyberSecurityOperations',
    logo: '/assets/png/metana_logo.png',
    titleKey: 'frontendDeveloper',
    durationKey: 'duration3',
    locationKey: 'milano',
    descriptionKey: 'createdDashboardInterfacesFull',
    skills: ['Vue.js', 'JavaScript', 'D3.js', 'REST APIs', 'Security'],
  },
  {
    companyKey: 'freelanceWebDeveloper',
    logo: '/assets/png/avatar.png',
    titleKey: 'fullStackDeveloper',
    durationKey: 'duration4',
    locationKey: 'milano',
    descriptionKey: 'providedWebDevelopmentServices',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'WordPress'],
  },
];

export function ExperiencePage() {
  const t = useTranslations('Experience');
  const { personal } = useProfileData();

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
                  <div key={index} className="mb-8">
                    {index > 0 && <Separator className="my-8" />}
                    <div className="flex gap-4">
                      <Avatar className="w-16 h-16 flex-shrink-0">
                        <AvatarImage src={exp.logo} />
                        <AvatarFallback>{t(exp.companyKey)[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{t(exp.titleKey)}</h3>
                            <p className="text-lg text-muted-foreground">{t(exp.companyKey)}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {t(exp.durationKey)} • {t(exp.locationKey)}
                            </p>
                          </div>
                          {/* Edit button removed - read-only mode */}
                        </div>

                        <p className="text-sm leading-relaxed mb-4">{t(exp.descriptionKey)}</p>

                        {exp.skills && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">{t('skills')}:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
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
