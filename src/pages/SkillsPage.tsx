import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Progress } from "@/components/ui/progress";
import { useJSONResumeAdapter } from "@/hooks";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useTranslations } from "use-intl";
import { LinkTranslated } from "../components/LinkTranslated";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";

export function SkillsPage() {
  const t = useTranslations("Skills");
  const { personal, skills } = useJSONResumeAdapter();
  const [expandedCategories, setExpandedCategories] = useState<
    Record<number, boolean>
  >({});

  return (
    <PageLayout>
      <SEO
        title={`${personal.name} | ${t("title")}`}
        description="Comprehensive overview of technical skills including React, TypeScript, blockchain development, and more."
        path="/skills"
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: t("title"), url: "/skills" },
        ]}
      />
      {/* Header */}
      <CardHeader className="flex sm:flex-row flex-col justify-start items-center mt-8 sm:text-left text-center">
        <Button variant="outline" size="icon" asChild>
          <LinkTranslated href="/">
            <ArrowLeftIcon className="size-5" />
          </LinkTranslated>
        </Button>
        <h1 className="ml-3 font-bold text-3xl">
          {personal.name} | {t("title")}
        </h1>
      </CardHeader>

      {/* Skills by Category with Accordion */}
      <Card className="shadow-xs">
        <CardContent>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="category-0"
          >
            {skills.map((category, categoryIndex) => {
              const isExpanded = expandedCategories[categoryIndex] || false;
              const displayedSkills = isExpanded
                ? category.items
                : category.items.slice(0, 8);
              const hasMore = category.items.length > 8;

              return (
                <AccordionItem
                  key={categoryIndex}
                  value={`category-${categoryIndex}`}
                >
                  <AccordionTrigger>{category.category}</AccordionTrigger>
                  <AccordionContent>
                    <div className="gap-6 space-y-4 grid grid-cols-max lg:grid-cols-2">
                      {displayedSkills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground text-sm">
                              {skill.level}%
                            </span>
                          </div>
                          <Progress value={skill.level} />
                        </div>
                      ))}
                    </div>
                    {hasMore && (
                      <div className="mt-6 text-center">
                        <Button
                          variant="link"
                          onClick={() =>
                            setExpandedCategories(prev => ({
                              ...prev,
                              [categoryIndex]: !prev[categoryIndex],
                            }))
                          }
                        >
                          {isExpanded
                            ? "Show Less"
                            : `Load More (${category.items.length - 8} more)`}
                        </Button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
