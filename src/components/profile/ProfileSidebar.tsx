import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const profileLanguages = [
  { name: 'Italian', level: 'Native' },
  { name: 'English', level: 'Professional' },
  { name: 'Spanish', level: 'Conversational' },
];

const interests = ['Web Development', 'UI/UX Design', 'React', 'TypeScript', 'Open Source', 'Tech Innovation'];

export function ProfileSidebar() {
  return (
    <div className='space-y-4'>
      {/* Languages */}
      <Card className='shadow-xs'>
        <CardHeader>
          <CardTitle className='text-base'>Languages</CardTitle>
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='space-y-3'>
            {profileLanguages.map((lang, index) => (
              <div key={index} className='flex justify-between items-center'>
                <span className='font-medium text-sm'>{lang.name}</span>
                <Badge variant='secondary' className='text-xs'>
                  {lang.level}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className='shadow-xs'>
        <CardHeader>
          <CardTitle className='text-base'>Interests</CardTitle>
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='flex flex-wrap gap-2'>
            {interests.map((interest, index) => (
              <Badge key={index} variant='outline' className='text-xs'>
                {interest}
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
                LinkedIn Profile
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
                Personal Website
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
              <p>© 2024 Rocco Russo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
