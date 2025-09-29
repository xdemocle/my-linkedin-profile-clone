import { ArrowLeftIcon, Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'wouter';
import { useTranslations } from 'use-intl';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';

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
    logo: 'https://github.com/shadcn.png',
    titleKey: 'frontendDeveloper',
    durationKey: 'duration1',
    locationKey: 'milano',
    descriptionKey: 'ledFrontendDevelopmentFull',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Team Leadership'],
  },
  {
    companyKey: 'seniorSolutionsEngineer',
    logo: 'https://github.com/shadcn.png',
    titleKey: 'frontendDeveloper',
    durationKey: 'duration2',
    locationKey: 'milano',
    descriptionKey: 'developedInteractiveUIFull',
    skills: ['React', 'JavaScript', 'CSS3', 'SASS', 'Figma'],
  },
  {
    companyKey: 'cyberSecurityOperations',
    logo: 'https://github.com/shadcn.png',
    titleKey: 'frontendDeveloper',
    durationKey: 'duration3',
    locationKey: 'milano',
    descriptionKey: 'createdDashboardInterfacesFull',
    skills: ['Vue.js', 'JavaScript', 'D3.js', 'REST APIs', 'Security'],
  },
  {
    companyKey: 'freelanceWebDeveloper',
    logo: 'https://github.com/shadcn.png',
    titleKey: 'fullStackDeveloper',
    durationKey: 'duration4',
    locationKey: 'milano',
    descriptionKey: 'providedWebDevelopmentServices',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'WordPress'],
  },
];

export function ExperiencePage() {
  const t = useTranslations('Experience');
  const tCommon = useTranslations('Common');

  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-4xl mx-auto px-4 py-6'>
        {/* Header */}
        <div className='mb-6'>
          <Button variant='ghost' size='sm' className='mb-4' asChild>
            <Link href="/">
              <ArrowLeftIcon className='h-4 w-4 mr-2' />
              {t('backToProfile')}
            </Link>
          </Button>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold'>{t('title')}</h1>
              <p className='text-muted-foreground mt-1'>Rocco Russo</p>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' size='sm'>
                <PlusIcon className='h-4 w-4 mr-2' />
                {t('addExperience')}
              </Button>
              <Button variant='outline' size='sm'>
                <Pencil1Icon className='h-4 w-4 mr-2' />
                {t('edit')}
              </Button>
            </div>
          </div>
        </div>

        {/* Experience List */}
        <Card className='shadow-xs'>
          <CardContent className='p-6'>
            {experiences.map((exp, index) => (
              <div key={index} className='mb-8'>
                {index > 0 && <Separator className='my-8' />}
                <div className='flex gap-4'>
                  <Avatar className='w-16 h-16 flex-shrink-0'>
                    <AvatarImage src={exp.logo} />
                    <AvatarFallback>{exp.company[0]}</AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex justify-between items-start mb-2'>
                      <div>
                        <h3 className='text-xl font-semibold'>{t(exp.titleKey)}</h3>
                        <p className='text-lg text-muted-foreground'>{t(exp.companyKey)}</p>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {t(exp.durationKey)} • {t(exp.locationKey)}
                        </p>
                      </div>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Pencil1Icon className='h-4 w-4' />
                      </Button>
                    </div>

                    <p className='text-sm leading-relaxed mb-4'>{t(exp.descriptionKey)}</p>

                    {exp.skills && (
                      <div>
                        <h4 className='text-sm font-medium mb-2'>{t('skills')}:</h4>
                        <div className='flex flex-wrap gap-2'>
                          {exp.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant='secondary' className='text-xs'>
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

        {/* Add Experience CTA */}
        <Card className='mt-6 shadow-xs'>
          <CardContent className='p-6 text-center'>
            <h3 className='font-semibold mb-2'>{t('showYourExperience')}</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              {t('addYourWorkExperience')}
            </p>
            <Button>
              <PlusIcon className='h-4 w-4 mr-2' />
              {t('addExperience')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
