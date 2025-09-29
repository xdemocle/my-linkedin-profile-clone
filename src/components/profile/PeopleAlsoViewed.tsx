import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface Person {
  name: string;
  avatar: string;
  title: string;
  connections: number;
}

const people: Person[] = [
  {
    name: 'Max Mueller',
    avatar: 'https://github.com/shadcn.png',
    title: 'Senior Frontend Developer at Google',
    connections: 500,
  },
  {
    name: 'Sophie Johnson',
    avatar: 'https://github.com/shadcn.png',
    title: 'UX Designer at Apple',
    connections: 346,
  },
  {
    name: 'Daniel Lee',
    avatar: 'https://github.com/shadcn.png',
    title: 'Full Stack Developer at Netflix',
    connections: 289,
  },
  {
    name: 'Olivia Williams',
    avatar: 'https://github.com/shadcn.png',
    title: 'Frontend Engineer at Microsoft',
    connections: 412,
  },
  {
    name: 'James Rodriguez',
    avatar: 'https://github.com/shadcn.png',
    title: 'UI Developer at Adobe',
    connections: 189,
  },
  {
    name: 'Emily Chen',
    avatar: 'https://github.com/shadcn.png',
    title: 'Senior React Developer at Meta',
    connections: 321,
  },
];

export function PeopleAlsoViewed() {
  return (
    <Card className='shadow-xs'>
      <CardHeader>
        <CardTitle className='text-base'>People also viewed</CardTitle>
      </CardHeader>
      <ScrollArea className='h-96'>
        <CardContent className='pt-0'>
          {people.map((person, index) => (
            <div key={index} className='mb-4 flex items-start gap-3'>
              <Avatar className='w-12 h-12'>
                <AvatarImage src={person.avatar} />
                <AvatarFallback>{person.name[0]}</AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <h3 className='font-medium text-sm truncate'>{person.name}</h3>
                <p className='text-xs text-muted-foreground line-clamp-2'>{person.title}</p>
                <p className='text-xs text-muted-foreground mt-1'>{person.connections}+ connections</p>
                {/* <Button variant='outline' size='sm' className='mt-2 w-full text-xs h-7'>
                  Connect
                </Button> */}
              </div>
            </div>
          ))}
          <div className='text-center mt-2'>
            <a href='#' className='text-sm text-primary hover:underline'>
              Show more
            </a>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
