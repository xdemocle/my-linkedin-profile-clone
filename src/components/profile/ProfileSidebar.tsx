import { useTranslations } from 'use-intl';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Language {
  nameKey: string;
  levelKey: string;
}

interface Interest {
  key: string;
}

export function ProfileSidebar() {
  const tLanguages = useTranslations('Languages');
  const tInterests = useTranslations('Interests');
  const tFooter = useTranslations('ProfileFooter');

  const profileLanguages: Language[] = [
    { nameKey: 'italian', levelKey: 'native' },
    { nameKey: 'english', levelKey: 'professional' },
    { nameKey: 'spanish', levelKey: 'conversational' },
  ];

  const interests: Interest[] = [
    { key: 'webDevelopment' },
    { key: 'uiUxDesign' },
    { key: 'react' },
    { key: 'typeScript' },
    { key: 'openSource' },
    { key: 'techInnovation' },
  ];

  return (
    <div className='space-y-4'>
      {/* Languages */}
      <Card className='shadow-xs'>
        <CardHeader>
          <CardTitle className='text-base'>{tLanguages('title')}</CardTitle>
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='space-y-3'>
            {profileLanguages.map((lang, index) => (
              <div key={index} className='flex justify-between items-center'>
                <span className='font-medium text-sm'>{tLanguages(lang.nameKey)}</span>
                <Badge variant='secondary' className='text-xs'>
                  {tLanguages(lang.levelKey)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className='shadow-xs'>
        <CardHeader>
          <CardTitle className='text-base'>{tInterests('title')}</CardTitle>
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='flex flex-wrap gap-2'>
            {interests.map((interest, index) => (
              <Badge key={index} variant='outline' className='text-xs'>
                {tInterests(interest.key)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <Card className='shadow-xs'>
        <CardContent className='p-4'>
          <div className='text-xs text-muted-foreground space-y-3'>
            <div className='flex flex-wrap gap-2'>
              <a
                href='https://www.linkedin.com/in/roccorusso/'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-primary flex items-center gap-1'
              >
                {tFooter('linkedinProfile')}
                <svg
                  className='w-3 h-3'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m7 7 10 10-5 0 0-5' />
                  <path d='m17 7-5 0 0 5' />
                </svg>
              </a>
              <span>•</span>
              <a
                href='https://rocco.me'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-primary flex items-center gap-1'
              >
                {tFooter('personalWebsite')}
                <svg
                  className='w-3 h-3'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m7 7 10 10-5 0 0-5' />
                  <path d='m17 7-5 0 0 5' />
                </svg>
              </a>
            </div>
            <div className='pt-2 border-t'>
              <p>{tFooter('copyright')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
