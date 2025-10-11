import { SEO } from '@/components/SEO';
import { StructuredData } from '@/components/StructuredData';
import { useProfileData } from '@/hooks';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { PageLayout } from '../components/layout/PageLayout';
import { LinkTranslated } from '../components/LinkTranslated';
import { ExperienceKeyAchievements } from '../components/profile/ExperienceKeyAchievements';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

export function ExperiencePage() {
  const t = useTranslations('Experience');
  const tData = useTranslations('ProfileData.experience');
  const { personal, experience } = useProfileData();

  // Get all 9 experiences from translations
  const experiences = Array.from({ length: 9 }, (_, i) => {
    const expKey = `exp${i + 1}`;

    return {
      company: tData(`${expKey}.company`),
      logo: experience[i].logo,
      position: tData(`${expKey}.position`),
      type: tData.has(`${expKey}.type`) ? tData(`${expKey}.type`) : undefined,
      dateRange: tData(`${expKey}.dateRange`),
      location: tData.has(`${expKey}.location`) ? tData(`${expKey}.location`) : undefined,
      description: tData(`${expKey}.description`),
      highlights: Array.from({ length: 5 }, (_, j) => {
        if (tData.has(`${expKey}.highlights.${j}`)) {
          return tData(`${expKey}.highlights.${j}`);
        }
        return null;
      }).filter(Boolean),
    };
  });

  return (
    <PageLayout addToSidebar={<ExperienceKeyAchievements />}>
      <SEO title={`${personal.name} | ${t('title')}`} description={t('description')} path="/experience" />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: t('title'), url: '/experience' },
        ]}
      />
      <Card className="shadow-xs">
        {/* Header */}
        <CardHeader className="flex items-center justify-start">
          <Button variant="outline" size="icon" asChild>
            <LinkTranslated href="/">
              <ArrowLeftIcon className="size-5" />
            </LinkTranslated>
          </Button>
          <h1 className="text-3xl font-bold ml-3">
            {personal.name} | {t('title')}
          </h1>
        </CardHeader>

        <CardContent className="p-6">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-8 last:mb-0">
              {index > 0 && <Separator className="my-8" />}
              <div className="flex gap-2 md:gap-4">
                <Avatar className="w-10 h-10 md:w-12 md:h-12">
                  <AvatarImage src={exp.logo} />
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
    </PageLayout>
  );
}
