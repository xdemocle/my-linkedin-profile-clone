import { ArrowRightIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { Link } from 'wouter';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Project {
  id: string;
  title: string;
  description: string;
  links?: {
    website?: string;
    marketing?: string;
  };
  technologies: string[];
  icon: string;
  featured: boolean;
}

export function ProjectsSection() {
  const t = useTranslations('Projects');

  // Only show featured projects in the profile section
  const featuredProjects: Project[] = [
    {
      id: 'ajna-labs',
      title: 'Ajna Labs | DeFi Dapp, SDK, Website, Styling Library',
      description: 'Deliverables included the construction of a proprietary SDK to facilitate seamless integration with decentralized smart contracts, as well as the development of scalable front-end architectures.',
      links: {
        website: 'https://www.ajnafi.com',
        marketing: 'https://www.ajna.finance'
      },
      technologies: ['React', 'TypeScript', 'Solidity', 'Web3.js'],
      icon: '🔵',
      featured: true
    },
    {
      id: 'mode-network',
      title: 'MODE Network EVM Chain | Refactoring codebase',
      description: 'Engaged on a time-bound contract to execute a comprehensive architectural refactor of a large-scale codebase built with Next.js, React Hooks, and TailwindCSS.',
      links: {
        website: 'https://www.mode.network'
      },
      technologies: ['Next.js', 'React Hooks', 'TailwindCSS'],
      icon: '⚡',
      featured: true
    },
    {
      id: 'games-global',
      title: 'GamesGlobal | Lotsaloot™ Progressive Jackpot Slot Machines',
      description: 'Implemented an enhanced user interface for a jackpot system deployed across diverse iGaming platforms. Responsive UI for player engagement. Entirely in Vanilla.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API'],
      icon: '🎮',
      featured: true
    }
  ];

  return (
    <Card className="shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">{t('title')}</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projects">
            {t('seeAll')}
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <div key={project.id} className="flex gap-3">
              <div className="text-3xl">{project.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium text-base">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
                
                {project.links && (
                  <div className="flex gap-2 mt-2">
                    {project.links.website && (
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
                        <a href={project.links.website} target="_blank" rel="noopener noreferrer">
                          {t('viewProject')}
                          <ExternalLinkIcon className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {project.links.marketing && (
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
                        <a href={project.links.marketing} target="_blank" rel="noopener noreferrer">
                          {t('viewDemo')}
                          <ExternalLinkIcon className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
