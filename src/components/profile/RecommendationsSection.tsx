// import { PlusIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';


const QuoteSvgIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-muted-foreground opacity-50"
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

const recommendationKeys = ['giorgioRavioli', 'alessandroBuccheri'];

export function RecommendationsSection() {
  const t = useTranslations('Recommendations');
  const tData = useTranslations('SampleData.recommendations');

  return (
    <Card className="mt-6 shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('title')}</CardTitle>
        {/* <Button variant='ghost' size='icon'>
          <PlusIcon className='h-4 w-4' />
        </Button> */}
      </CardHeader>
      <CardContent>
        {recommendationKeys.map((key, index) => (
          <div key={index} className="mb-6">
            {index > 0 && <Separator className="my-6" />}
            <div className="flex items-start gap-3 mb-2">
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>{tData(`${key}.name`)[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{tData(`${key}.name`)}</h3>
                <p className="text-sm text-muted-foreground">{tData(`${key}.title`)}</p>
                <p className="text-xs text-muted-foreground">{tData(`${key}.relationship`)}</p>
                <p className="text-xs text-muted-foreground">{tData(`${key}.date`)}</p>
              </div>
            </div>

            <div className="flex mt-6">
              <div className="mr-2 mt-1">
                <QuoteSvgIcon />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{tData(`${key}.content`)}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
