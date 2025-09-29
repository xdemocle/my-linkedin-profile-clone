import { ArrowLeftIcon, Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'wouter';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';

interface Experience {
  company: string;
  logo: string;
  title: string;
  duration: string;
  location: string;
  description: string;
  skills?: string[];
}

const experiences: Experience[] = [
  {
    company: 'Technical Lead',
    logo: 'https://github.com/shadcn.png',
    title: 'Frontend Developer',
    duration: 'Apr 2022 - Present · 1 yr 6 mos',
    location: 'Milano, Italy',
    description:
      'Led frontend development for multiple client projects. Implemented responsive UI designs and optimized web performance. Mentored junior developers and established coding standards. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Team Leadership'],
  },
  {
    company: 'Senior Solutions Engineer',
    logo: 'https://github.com/shadcn.png',
    title: 'Frontend Developer',
    duration: 'Sep 2020 - Mar 2022 · 1 yr 7 mos',
    location: 'Milano, Italy',
    description:
      'Developed interactive user interfaces using React and modern CSS frameworks. Collaborated with design team to implement pixel-perfect components and animations. Built reusable component libraries and maintained design systems.',
    skills: ['React', 'JavaScript', 'CSS3', 'SASS', 'Figma'],
  },
  {
    company: 'Cyber Security Operations',
    logo: 'https://github.com/shadcn.png',
    title: 'Frontend Developer',
    duration: 'Jun 2018 - Aug 2020 · 2 yrs 3 mos',
    location: 'Milano, Italy',
    description:
      'Created dashboard interfaces for security monitoring tools. Worked with backend team to integrate APIs and real-time data visualization components. Implemented security best practices in frontend development.',
    skills: ['Vue.js', 'JavaScript', 'D3.js', 'REST APIs', 'Security'],
  },
  {
    company: 'Freelance Web Developer',
    logo: 'https://github.com/shadcn.png',
    title: 'Full Stack Developer',
    duration: 'Jan 2017 - May 2018 · 1 yr 5 mos',
    location: 'Milano, Italy',
    description:
      'Provided web development services to small and medium businesses. Built custom websites and web applications using modern technologies. Managed client relationships and project timelines.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'WordPress'],
  },
];

export function ExperiencePage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-4xl mx-auto px-4 py-6'>
        {/* Header */}
        <div className='mb-6'>
          <Button variant='ghost' size='sm' className='mb-4' asChild>
            <Link href="/">
              <ArrowLeftIcon className='h-4 w-4 mr-2' />
              Back to profile
            </Link>
          </Button>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold'>Experience</h1>
              <p className='text-muted-foreground mt-1'>Rocco Russo</p>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' size='sm'>
                <PlusIcon className='h-4 w-4 mr-2' />
                Add experience
              </Button>
              <Button variant='outline' size='sm'>
                <Pencil1Icon className='h-4 w-4 mr-2' />
                Edit
              </Button>
            </div>
          </div>
        </div>

        {/* Experience List */}
        <Card className='shadow-xs'>
          <CardContent className='p-6'>
            {experiences.map((exp, index) => (
              <div key={index} className='mb-8'>
                {index > 0 && <Separator className='my-8' />}
                <div className='flex gap-4'>
                  <Avatar className='w-16 h-16 flex-shrink-0'>
                    <AvatarImage src={exp.logo} />
                    <AvatarFallback>{exp.company[0]}</AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex justify-between items-start mb-2'>
                      <div>
                        <h3 className='text-xl font-semibold'>{exp.title}</h3>
                        <p className='text-lg text-muted-foreground'>{exp.company}</p>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {exp.duration} • {exp.location}
                        </p>
                      </div>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Pencil1Icon className='h-4 w-4' />
                      </Button>
                    </div>

                    <p className='text-sm leading-relaxed mb-4'>{exp.description}</p>

                    {exp.skills && (
                      <div>
                        <h4 className='text-sm font-medium mb-2'>Skills:</h4>
                        <div className='flex flex-wrap gap-2'>
                          {exp.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant='secondary' className='text-xs'>
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Add Experience CTA */}
        <Card className='mt-6 shadow-xs'>
          <CardContent className='p-6 text-center'>
            <h3 className='font-semibold mb-2'>Show your experience</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              Add your work experience to help others get to know you better.
            </p>
            <Button>
              <PlusIcon className='h-4 w-4 mr-2' />
              Add experience
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
