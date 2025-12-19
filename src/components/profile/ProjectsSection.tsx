import { ArrowRightIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { useProfileData } from '../../hooks/useProfileData';
import { ProjectIconWrapper } from '../../lib/iconComponents';
import { LinkTranslated } from '../LinkTranslated';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function ProjectsSection() {
  const t = useTranslations('Projects');
  const { projects } = useProfileData();

  // Get top 3 featured projects (sorted by metadata.order)
  const featuredProjects = projects
    .filter(project => project.metadata?.featured)
    .sort((a, b) => (a.metadata?.order || 999) - (b.metadata?.order || 999))
    .slice(0, 3);

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
                  <div className="gap-2 mt-2">
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
