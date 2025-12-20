import { useProfileData } from "@/hooks";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslations } from "use-intl";
import { LinkTranslated } from "../LinkTranslated";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

export function SkillsSection() {
  const t = useTranslations("Skills");
  const { skills } = useProfileData();

  // Get top 3 skills from the first 3 categories
  const topSkills = skills
    .slice(0, 3)
    .map((category) => {
      // Get top 3 skills from the first 3 categories
      return category.items
        .sort((a, b) => b.level - a.level)
        .slice(0, 3)
        .map((skill) => ({
          name: skill.name,
          level: skill.level,
          category: category.category,
        }));
    })
    .flat();

  return (
    <Card className="shadow-xs">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-start md:justify-between">
        <CardTitle className="text-xl">{t("title")}</CardTitle>
        <Button variant="link" asChild>
          <LinkTranslated href="/skills" className="px-0!">
            {t("showAllSkills")}
            <ArrowRightIcon />
          </LinkTranslated>
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-max sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topSkills.map((skill, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{skill.name}</h3>
              <span className="text-sm text-muted-foreground">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <Progress value={skill.level} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {skill.category}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
