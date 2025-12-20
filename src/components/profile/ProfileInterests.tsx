import { useTranslations } from "use-intl";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface InterestCategory {
  category: string;
  items: string[];
}

export function ProfileInterests() {
  const t = useTranslations("Interests");

  const interestCategories: InterestCategory[] = [
    {
      category: "techProfession",
      items: [
        "blockchain",
        "web3",
        "cybersecurity",
        "react",
        "typeScript",
        "openSource",
        "ai",
        "cleanCode",
        "scalability",
        "architecture",
        "problemSolving",
      ],
    },
    {
      category: "collaborationLeadership",
      items: [
        "mentorship",
        "leadership",
        "remoteWork",
        "collaboration",
        "community",
        "teaching",
        "education",
      ],
    },
    {
      category: "mindsetValues",
      items: [
        "innovation",
        "strategy",
        "systemsThinking",
        "adaptability",
        "growth",
        "ethics",
        "empathy",
        "continuousLearning",
      ],
    },
    {
      category: "cultureExpression",
      items: [
        "globalMindset",
        "languages",
        "research",
        "writing",
        "creativity",
      ],
    },
  ];

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle className="text-base">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {interestCategories.map((category, catIndex) => (
          <div key={catIndex}>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
              {t(category.category)}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item, itemIndex) => (
                <Badge key={itemIndex} variant="outline" className="text-xs">
                  {t(item)}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
