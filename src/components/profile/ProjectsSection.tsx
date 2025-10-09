import { ArrowRightIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { useProfileData } from '../../hooks/useProfileData';
import { ProjectIconWrapper } from '../../lib/iconComponents';
import { LinkTranslated } from '../LinkTranslated';
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
  icon: string; // This is now a key to map to a Radix UI icon
  featured: boolean;
}

export function ProjectsSection() {
  const t = useTranslations('Projects');
  const profileData = useProfileData();

  // Map our project data to the component's expected format
  const featuredProjects: Project[] = profileData.projects.slice(0, 3).map(project => ({
    id: project.id,
    title: t(
      project.id === 'proj1'
        ? 'ajnaLabs'
        : project.id === 'proj2'
        ? 'modeNetwork'
        : project.id === 'proj3'
        ? 'cyberGrandpa'
        : project.id === 'proj4'
        ? 'tetrisCrypto'
        : project.id === 'proj5'
        ? 'linkedinExtension'
        : project.name
    ),
    description: project.description,
    links: {
      website: project.link,
      marketing: project.sourceCode,
    },
    technologies: project.tags,
    icon:
      project.id === 'proj1'
        ? 'blue-circle'
        : project.id === 'proj2'
        ? 'lightning'
        : project.id === 'proj3'
        ? 'shield'
        : project.id === 'proj4'
        ? 'game'
        : 'extension',
    featured: true,
  }));

  return (
    <Card className="shadow-xs">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-start md:justify-between">
        <CardTitle className="text-xl">{t('title')}</CardTitle>
        <Button variant="link" asChild>
          <LinkTranslated href="/projects" className="px-0!">
            {t('seeAll')}
            <ArrowRightIcon />
          </LinkTranslated>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {featuredProjects.map(project => (
            <div key={project.id} className="flex gap-3">
              <div className="flex items-center justify-center h-8 w-8">
                <ProjectIconWrapper iconKey={project.icon} />
              </div>
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
