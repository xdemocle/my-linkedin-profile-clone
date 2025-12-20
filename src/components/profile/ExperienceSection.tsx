import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslations } from "use-intl";
import { useProfileData } from "../../hooks/useProfileData";
import { LinkTranslated } from "../LinkTranslated";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export function ExperienceSection() {
  const t = useTranslations("Experience");
  const { experience } = useProfileData();

  // Get top 3 experiences (sorted by metadata.order)
  const topExperiences = experience
    .sort((a, b) => (a.metadata?.order || 999) - (b.metadata?.order || 999))
    .slice(0, 3);

  return (
    <Card className="shadow-xs">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-start md:justify-between">
        <CardTitle className="text-xl">{t("title")}</CardTitle>
        <Button variant="link" asChild>
          <LinkTranslated href="/experience" className="px-0!">
            {t("showAllExperiences")}
            <ArrowRightIcon />
          </LinkTranslated>
        </Button>
      </CardHeader>

      <CardContent>
        {topExperiences.map((exp, index) => (
          <div key={exp.id} className="mb-6">
            {index > 0 && <Separator className="my-6" />}
            <div className="flex gap-2 md:gap-4">
              <Avatar className="w-10 h-10 md:w-12 md:h-12">
                <AvatarImage src={exp.logo} />
                <AvatarFallback>{exp.company[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.position}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">
                  {exp.dateRange}
                  {exp.location && ` • ${exp.location}`}
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
