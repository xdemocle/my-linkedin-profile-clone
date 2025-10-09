// import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { useProfileData } from '../../hooks/useProfileData';
import { LinkTranslated } from '../LinkTranslated';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

// Map our experience data to the component's expected format
interface ExperienceDisplay {
  companyKey: string;
  logo: string;
  titleKey: string;
  durationKey: string;
  locationKey: string;
  descriptionKey: string;
}

export function ExperienceSection() {
  const t = useTranslations('Experience');
  const profileData = useProfileData();

  // Get first 3 experiences from profile data
  const topExperiences = profileData.experience.slice(0, 3);

  // Map to display format - using translation keys for the UI
  const experiences: ExperienceDisplay[] = [
    {
      companyKey: 'technicalLead',
      logo: topExperiences[0].logo ?? '/assets/png/web3ninja-logo.png',
      titleKey: 'technicalLead',
      durationKey: 'duration1',
      locationKey: 'milano',
      descriptionKey: 'ledFrontendDevelopment',
    },
    {
      companyKey: 'seniorSolutionsEngineer',
      logo: topExperiences[1].logo ?? '/assets/png/gamesglobal-logo.png',
      titleKey: 'seniorSolutionsEngineer',
      durationKey: 'duration2',
      locationKey: 'milano',
      descriptionKey: 'developedInteractiveUI',
    },
    {
      companyKey: 'cyberSecurityOperations',
      logo: topExperiences[2].logo ?? '/assets/png/shibainu-logo.png',
      titleKey: 'frontendDeveloper',
      durationKey: 'duration3',
      locationKey: 'milano',
      descriptionKey: 'createdDashboardInterfaces',
    },
  ];

  return (
    <Card className="shadow-xs">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-start md:justify-between">
        <CardTitle className="text-xl">{t('title')}</CardTitle>
        <Button variant="link" asChild>
          <LinkTranslated href="/experience" className="px-0!">
            {t('showAllExperiences')}
            <ArrowRightIcon />
          </LinkTranslated>
        </Button>
      </CardHeader>

      <CardContent>
        {experiences.map((exp, index) => (
          <div key={index} className="mb-6">
            {index > 0 && <Separator className="my-6" />}
            <div className="flex gap-2 md:gap-4">
              <Avatar className="w-10 h-10 md:w-12 md:h-12">
                <AvatarImage src={exp.logo} />
                <AvatarFallback>{t(exp.companyKey)[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{t(exp.titleKey)}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t(exp.companyKey)}</p>
                <p className="text-sm text-muted-foreground">
                  {t(exp.durationKey)} • {t(exp.locationKey)}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{t(exp.descriptionKey)}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
