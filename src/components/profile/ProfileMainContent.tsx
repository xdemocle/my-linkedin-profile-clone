import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowRightIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { ProfileHeader } from './ProfileHeader';
import { AboutSection } from './AboutSection';
import { ExperienceSection } from './ExperienceSection';
import { SkillsSection } from './SkillsSection';
import { RecommendationsSection } from './RecommendationsSection';

const featuredSection = {
  title: 'Featured',
  items: [
    {
      type: 'post',
      title: 'Building Modern React Applications with TypeScript',
      description:
        'A comprehensive guide to setting up and structuring React applications with TypeScript for better developer experience.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      engagement: { likes: 124, comments: 23 },
    },
    {
      type: 'article',
      title: 'The Future of Frontend Development',
      description: 'Exploring emerging trends and technologies that will shape the future of web development.',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
      engagement: { likes: 89, comments: 15 },
    },
    {
      type: 'project',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution built with React, Node.js, and PostgreSQL',
      image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=200&fit=crop',
      engagement: { likes: 56, comments: 12 },
    },
  ]
};


const projects = [
  {
    name: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution built with React, Node.js, and PostgreSQL',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    link: 'https://github.com/example/ecommerce',
  },
  {
    name: 'Task Management App',
    description: 'Collaborative task management application with real-time updates',
    technologies: ['Next.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
    link: 'https://github.com/example/taskapp',
  },
];

export function ProfileMainContent() {
  return (
    <div className='space-y-4'>
      <ProfileHeader />
      <AboutSection />

      {/* Featured Section */}
      <Card className='shadow-xs'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Featured</CardTitle>
          <Button variant='ghost' size='sm'>
            <ArrowRightIcon className='h-4 w-4' />
          </Button>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            {featuredSection.items.map((item, index) => (
              <div key={index} className='flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors'>
                <img src={item.image} alt={item.title} className='w-20 h-20 object-cover rounded-md flex-shrink-0' />
                <div className='flex-1'>
                  <h4 className='font-medium text-sm mb-1'>{item.title}</h4>
                  <p className='text-xs text-muted-foreground mb-2 line-clamp-2'>{item.description}</p>
                  <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                    <span>{item.engagement.likes} likes</span>
                    <span>{item.engagement.comments} comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ExperienceSection />

      {/* Projects Section */}
      <Card className='shadow-xs'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Projects</CardTitle>
          <Button variant='ghost' size='sm'>
            Show all projects
            <ArrowRightIcon className='h-4 w-4 ml-1' />
          </Button>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {projects.map((project, index) => (
              <div key={index} className='border rounded-lg p-4'>
                <div className='flex justify-between items-start mb-2'>
                  <h4 className='font-medium'>{project.name}</h4>
                  <Button variant='ghost' size='sm' asChild>
                    <a href={project.link} target='_blank' rel='noopener noreferrer'>
                      <ExternalLinkIcon className='h-4 w-4' />
                    </a>
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground mb-3'>{project.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant='secondary' className='text-xs'>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <SkillsSection />

      <RecommendationsSection />
    </div>
  );
}
