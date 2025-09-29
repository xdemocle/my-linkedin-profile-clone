// import { PlusIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

interface Recommendation {
  name: string;
  avatar: string;
  title: string;
  relationship: string;
  date: string;
  content: string;
}

const QuoteSvgIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='text-muted-foreground opacity-50'
  >
    <path d='M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z' />
    <path d='M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z' />
  </svg>
);

const recommendations: Recommendation[] = [
  {
    name: 'Giorgio Ravioli',
    avatar: 'https://github.com/shadcn.png',
    title: 'Senior Full Stack Developer',
    relationship: 'Giorgio worked with Rocco in the same team',
    date: 'July 24, 2022',
    content:
      'Rocco is an exceptional frontend developer with a keen eye for detail and a talent for creating elegant user interfaces. His ability to translate complex requirements into intuitive designs is remarkable. He consistently delivered high-quality code on our shared projects and was always willing to help others on the team.',
  },
  {
    name: 'Alessandro Buccheri',
    avatar: 'https://github.com/shadcn.png',
    title: 'Senior Full Stack Developer',
    relationship: 'Alessandro managed Rocco directly',
    date: 'March 15, 2021',
    content:
      "I had the pleasure of managing Rocco on several critical projects. His technical skills in frontend development are truly impressive, particularly in React and modern JavaScript. He's proactive, reliable, and has an exceptional ability to solve complex problems. His work consistently exceeded client expectations, and he was a valuable asset to our team.",
  },
];

export function RecommendationsSection() {
  return (
    <Card className='mt-4 shadow-xs'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Recommendations</CardTitle>
        {/* <Button variant='ghost' size='icon'>
          <PlusIcon className='h-4 w-4' />
        </Button> */}
      </CardHeader>
      <CardContent>
        {recommendations.map((rec, index) => (
          <div key={index} className='mb-6'>
            {index > 0 && <Separator className='my-6' />}
            <div className='flex items-start gap-3 mb-2'>
              <Avatar>
                <AvatarImage src={rec.avatar} />
                <AvatarFallback>{rec.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className='font-medium'>{rec.name}</h3>
                <p className='text-sm text-muted-foreground'>{rec.title}</p>
                <p className='text-xs text-muted-foreground'>{rec.relationship}</p>
                <p className='text-xs text-muted-foreground'>{rec.date}</p>
              </div>
            </div>

            <div className='flex mt-3'>
              <div className='mr-2 mt-1'>
                <QuoteSvgIcon />
              </div>
              <p className='text-sm text-muted-foreground leading-relaxed'>{rec.content}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
