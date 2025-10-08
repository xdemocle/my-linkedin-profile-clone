import { useTranslations } from 'use-intl';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

const peopleKeys = ['maxMueller', 'sophieJohnson', 'danielLee', 'oliviaWilliams', 'jamesRodriguez', 'emilyChen'];
const peopleConnections = [500, 346, 289, 412, 189, 321];

export function PeopleAlsoViewed() {
  const t = useTranslations('PeopleAlsoViewed');
  const tData = useTranslations('SampleData.people');

  return (
    <Card className='shadow-xs'>
      <CardHeader>
        <CardTitle className='text-base'>{t('title')}</CardTitle>
      </CardHeader>
      <ScrollArea className='h-96'>
        <CardContent className='pt-0'>
          {peopleKeys.map((key, index) => (
            <div key={index} className='mb-4 flex items-start gap-3'>
              <Avatar className='w-12 h-12'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>{tData(`${key}.name`)[0]}</AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <h3 className='font-medium text-sm truncate'>{tData(`${key}.name`)}</h3>
                <p className='text-xs text-muted-foreground line-clamp-2'>{tData(`${key}.title`)}</p>
                <p className='text-xs text-muted-foreground mt-1'>{peopleConnections[index]}+ {t('connections')}</p>
                {/* <Button variant='outline' size='sm' className='mt-2 w-full text-xs h-7'>
                  Connect
                </Button> */}
              </div>
            </div>
          ))}
          <div className='text-center mt-2'>
            <a href='#' className='text-sm text-primary hover:underline'>
              {t('showMore')}
            </a>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
