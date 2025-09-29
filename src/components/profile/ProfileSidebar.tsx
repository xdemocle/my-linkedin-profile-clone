import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PeopleAlsoViewed } from './PeopleAlsoViewed';

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

      {/* People Also Viewed */}
      <PeopleAlsoViewed />

      {/* LinkedIn Premium Ad */}
      <Card className='shadow-xs'>
        <CardContent className='p-4 text-center'>
          <div className='mb-3'>
            <div className='w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg mx-auto mb-3 flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>P</span>
            </div>
            <h3 className='font-medium text-sm mb-1'>Unlock Your Career Potential</h3>
            <p className='text-xs text-muted-foreground mb-3'>Get exclusive insights with LinkedIn Premium</p>
          </div>
          <img
            src='https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png'
            alt='LinkedIn Premium'
            className='w-full h-24 object-cover rounded-md mb-3'
          />
          <Button variant='outline' size='sm' className='w-full text-xs'>
            Try for free
          </Button>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <Card className='shadow-xs'>
        <CardContent className='p-4'>
          <div className='text-xs text-muted-foreground space-y-2'>
            <div className='flex flex-wrap gap-2'>
              <a href='#' className='hover:text-primary'>
                About
              </a>
              <span>•</span>
              <a href='#' className='hover:text-primary'>
                Accessibility
              </a>
              <span>•</span>
              <a href='#' className='hover:text-primary'>
                Help Center
              </a>
            </div>
            <div className='flex flex-wrap gap-2'>
              <a href='#' className='hover:text-primary'>
                Privacy & Terms
              </a>
              <span>•</span>
              <a href='#' className='hover:text-primary'>
                Ad Choices
              </a>
            </div>
            <div className='flex flex-wrap gap-2'>
              <a href='#' className='hover:text-primary'>
                Advertising
              </a>
              <span>•</span>
              <a href='#' className='hover:text-primary'>
                Business Services
              </a>
            </div>
            <div className='pt-2 border-t'>
              <p>LinkedIn Corporation © 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
