// import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'wouter';
import { useTranslations } from 'use-intl';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

interface Experience {
  companyKey: string;
  logo: string;
  titleKey: string;
  durationKey: string;
  locationKey: string;
  descriptionKey: string;
}

export function ExperienceSection() {
  const t = useTranslations('Experience');
  
  const experiences: Experience[] = [
    {
      companyKey: 'technicalLead',
      logo: 'https://github.com/shadcn.png',
      titleKey: 'frontendDeveloper',
      durationKey: 'duration1',
      locationKey: 'milano',
      descriptionKey: 'ledFrontendDevelopment',
    },
    {
      companyKey: 'seniorSolutionsEngineer',
      logo: 'https://github.com/shadcn.png',
      titleKey: 'frontendDeveloper',
      durationKey: 'duration2',
      locationKey: 'milano',
      descriptionKey: 'developedInteractiveUI',
    },
    {
      companyKey: 'cyberSecurityOperations',
      logo: 'https://github.com/shadcn.png',
      titleKey: 'frontendDeveloper',
      durationKey: 'duration3',
      locationKey: 'milano',
      descriptionKey: 'createdDashboardInterfaces',
    },
  ];

  return (
    <Card className='mt-4 shadow-xs'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>{t('title')}</CardTitle>
        <Button variant='ghost' size='sm' asChild>
          <Link href="/experience">
            {t('showAllExperiences')}
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {experiences.map((exp, index) => (
          <div key={index} className='mb-6'>
            {index > 0 && <Separator className='my-6' />}
            <div className='flex gap-4'>
              <Avatar className='w-12 h-12'>
                <AvatarImage src={exp.logo} />
                <AvatarFallback>{t(exp.companyKey)[0]}</AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <div className='flex justify-between'>
                  <h3 className='font-medium'>{t(exp.titleKey)}</h3>
                  {/* <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <Pencil1Icon className='h-4 w-4' />
                  </Button> */}
                </div>
                <p className='text-sm text-muted-foreground'>{t(exp.companyKey)}</p>
                <p className='text-sm text-muted-foreground'>
                  {t(exp.durationKey)} • {t(exp.locationKey)}
                </p>
                <p className='mt-2 text-sm leading-relaxed'>{t(exp.descriptionKey)}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
