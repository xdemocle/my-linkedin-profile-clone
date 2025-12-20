import { PageLayout } from "@/components/layout/PageLayout";
import { LinkTranslated } from "@/components/LinkTranslated";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { useProfileData } from "@/hooks";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { useTranslations } from "use-intl";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { ProjectIconWrapper } from "../lib/iconComponents";

export function ProjectsPage() {
  const t = useTranslations("Projects");
  const { personal, projects } = useProfileData();

  const seoDescription =
    "Explore my portfolio of projects including DeFi protocols, blockchain applications, and full-stack web development work.";

  const featuredProjects = projects.filter(
    (project) => project.metadata?.featured,
  );
  const otherProjects = projects.filter(
    (project) => !project.metadata?.featured,
  );

  return (
    <PageLayout noSidebar>
      <SEO
        title={`${personal.name} | ${t("title")}`}
        description={seoDescription}
        path="/projects"
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: t("title"), url: "/projects" },
        ]}
      />
      {/* Header */}
      <CardHeader className="mt-8 flex items-center justify-start flex-col text-center sm:flex-row sm:text-left">
        <Button variant="outline" size="icon" asChild>
          <LinkTranslated href="/">
            <ArrowLeftIcon className="size-5" />
          </LinkTranslated>
        </Button>
        <h1 className="text-3xl font-bold ml-3">
          {personal.name} | {t("title")}
        </h1>
      </CardHeader>

      {/* Featured Projects */}
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">{t("featuredProjects")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center h-8 w-8">
                        <ProjectIconWrapper iconKey={project.icon} />
                      </div>
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    {/* Links */}
                    {project.links && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.links.website && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            asChild
                          >
                            <a
                              href={project.links.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t("viewProject")}
                              <ExternalLinkIcon className="ml-1 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {project.links.marketing && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            asChild
                          >
                            <a
                              href={project.links.marketing}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t("viewDemo")}
                              <ExternalLinkIcon className="ml-1 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {project.links.github &&
                          Array.isArray(project.links.github) &&
                          project.links.github.map(
                            (link: string, i: number) => (
                              <Button
                                key={i}
                                variant="outline"
                                size="sm"
                                className="h-8"
                                asChild
                              >
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <GitHubLogoIcon className="mr-1 h-3 w-3" />
                                  {t("viewCode")}{" "}
                                  {Array.isArray(project.links?.github) &&
                                  project.links?.github.length > 1
                                    ? i + 1
                                    : ""}
                                </a>
                              </Button>
                            ),
                          )}
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      {/* Other Projects */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">{t("otherProjects")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => (
            <Card
              key={project.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center h-6 w-6">
                        <ProjectIconWrapper
                          iconKey={project.icon}
                          className="h-6 w-6"
                        />
                      </div>
                      <h3 className="text-lg font-medium">{project.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Links - Simplified for smaller cards */}
                    {project.links && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.links.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs px-2"
                            asChild
                          >
                            <a
                              href={
                                Array.isArray(project.links.github)
                                  ? project.links.github[0]
                                  : project.links.github
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GitHubLogoIcon className="mr-1 h-3 w-3" />
                              {t("viewCode")}
                            </a>
                          </Button>
                        )}
                        {project.links.demo && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs px-2"
                            asChild
                          >
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t("viewDemo")}
                              <ExternalLinkIcon className="ml-1 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Technologies - Limited to save space */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
