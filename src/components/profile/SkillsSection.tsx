import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

interface Skill {
  name: string;
  endorsements: number;
  endorsedBy: {
    name: string;
    avatar: string;
  }[];
}

const skills: Skill[] = [
  {
    name: 'Frontend Development',
    endorsements: 42,
    endorsedBy: [
      { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
      { name: 'Jane Smith', avatar: 'https://github.com/shadcn.png' },
      { name: 'Alex Johnson', avatar: 'https://github.com/shadcn.png' },
    ],
  },
  {
    name: 'React.js',
    endorsements: 38,
    endorsedBy: [
      { name: 'Chris Williams', avatar: 'https://github.com/shadcn.png' },
      { name: 'Sarah Davis', avatar: 'https://github.com/shadcn.png' },
      { name: 'Michael Brown', avatar: 'https://github.com/shadcn.png' },
    ],
  },
  {
    name: 'JavaScript',
    endorsements: 35,
    endorsedBy: [
      { name: 'Emily Wilson', avatar: 'https://github.com/shadcn.png' },
      { name: 'David Miller', avatar: 'https://github.com/shadcn.png' },
      { name: 'Jessica Taylor', avatar: 'https://github.com/shadcn.png' },
    ],
  },
];

export function SkillsSection() {
  return (
    <Card className='mt-4 shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Skills</CardTitle>
        <div className='flex gap-2'>
          <Button variant='ghost' size='sm'>
            Take skill quiz
          </Button>
          <Button variant='ghost' size='icon'>
            <PlusIcon className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Pencil1Icon className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {skills.map((skill, index) => (
          <div key={index} className='mb-6'>
            {index > 0 && <Separator className='my-6' />}
            <div>
              <div className='flex justify-between items-center'>
                <h3 className='font-medium'>{skill.name}</h3>
                <Badge variant='outline' className='rounded-full'>
                  {skill.endorsements} endorsements
                </Badge>
              </div>
              <div className='flex items-center gap-2 mt-3'>
                <div className='flex -space-x-2'>
                  {skill.endorsedBy.map((person, i) => (
                    <Avatar key={i} className='w-7 h-7 border-2 border-background'>
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>{person.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className='text-xs text-muted-foreground ml-1'>
                  Endorsed by {skill.endorsedBy[0].name} and {skill.endorsements - 1} others
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
