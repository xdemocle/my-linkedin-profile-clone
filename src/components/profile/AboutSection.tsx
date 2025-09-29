// import { Pencil1Icon } from '@radix-ui/react-icons';
// import { Button } from '../ui/button';
import { useTranslations } from 'use-intl';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function AboutSection() {
  const t = useTranslations('About');
  
  return (
    <Card className='mt-4 shadow-xs'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>{t('title')}</CardTitle>
        {/* <Button variant='ghost' size='sm'>
          <Pencil1Icon className='h-4 w-4' />
        </Button> */}
      </CardHeader>
      <CardContent>
        <p className='text-foreground leading-relaxed'>
          {t('fullStackDeveloper')}
        </p>
        <p className='mt-2 text-foreground leading-relaxed'>
          {t('currentlyWorking')}
        </p>
      </CardContent>
    </Card>
  );
}
