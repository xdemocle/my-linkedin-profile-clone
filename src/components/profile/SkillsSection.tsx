import { useJSONResumeAdapter } from "@/hooks";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslations } from "use-intl";
import { LinkTranslated } from "../LinkTranslated";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

export function SkillsSection() {
  const t = useTranslations("Skills");
  const { skills } = useJSONResumeAdapter();

  // Get top 3 skills from the first 3 categories
  const topSkillsByCategory = skills.slice(0, 3).map(category => ({
    category: category.category,
    items: category.items
      .sort((a, b) => b.level - a.level)
      .slice(0, 3)
      .map(skill => ({
        name: skill.name,
        level: skill.level,
        category: category.category,
      })),
  }));

  // Set all accordion items to be open by default
  const defaultOpenValues = topSkillsByCategory.map(
    (_, index) => `category-${index}`
  );

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

      <CardContent className="grid grid-cols-1 gap-4">
        <Accordion type="multiple" value={defaultOpenValues} className="w-full">
          {topSkillsByCategory.map((category, categoryIndex) => (
            <AccordionItem
              key={categoryIndex}
              value={`category-${categoryIndex}`}
            >
              <AccordionTrigger>{category.category}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {category.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{skill.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <Progress value={skill.level} />
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
