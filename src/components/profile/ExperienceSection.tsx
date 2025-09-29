// import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'wouter';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

interface Experience {
  company: string;
  logo: string;
  title: string;
  duration: string;
  location: string;
  description: string;
}

const experiences: Experience[] = [
  {
    company: 'Technical Lead',
    logo: 'https://github.com/shadcn.png',
    title: 'Frontend Developer',
    duration: 'Apr 2022 - Present · 1 yr 6 mos',
    location: 'Milano, Italy',
    description:
      'Led frontend development for multiple client projects. Implemented responsive UI designs and optimized web performance. Mentored junior developers and established coding standards.',
  },
  {
    company: 'Senior Solutions Engineer',
    logo: 'https://github.com/shadcn.png',
    title: 'Frontend Developer',
    duration: 'Sep 2020 - Mar 2022 · 1 yr 7 mos',
    location: 'Milano, Italy',
    description:
      'Developed interactive user interfaces using React and modern CSS frameworks. Collaborated with design team to implement pixel-perfect components and animations.',
  },
  {
    company: 'Cyber Security Operations',
    logo: 'https://github.com/shadcn.png',
    title: 'Frontend Developer',
    duration: 'Jun 2018 - Aug 2020 · 2 yrs 3 mos',
    location: 'Milano, Italy',
    description:
      'Created dashboard interfaces for security monitoring tools. Worked with backend team to integrate APIs and real-time data visualization components.',
  },
];

export function ExperienceSection() {
  return (
    <Card className='mt-4 shadow-xs'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Experience</CardTitle>
        <Button variant='ghost' size='sm' asChild>
          <Link href="/experience">
            Show all experiences
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
                <AvatarFallback>{exp.company[0]}</AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <div className='flex justify-between'>
                  <h3 className='font-medium'>{exp.title}</h3>
                  {/* <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <Pencil1Icon className='h-4 w-4' />
                  </Button> */}
                </div>
                <p className='text-sm text-muted-foreground'>{exp.company}</p>
                <p className='text-sm text-muted-foreground'>
                  {exp.duration} • {exp.location}
                </p>
                <p className='mt-2 text-sm leading-relaxed'>{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
