import { useTranslations } from "use-intl";
import { Card, CardContent } from "../ui/card";

export function ExperienceKeyAchievements() {
  const t = useTranslations("Experience");

  const achievements = [
    { titleKey: "highUserEngagement", descKey: "highUserEngagementDesc" },
    { titleKey: "majorRefactoring", descKey: "majorRefactoringDesc" },
    { titleKey: "defiDappLaunch", descKey: "defiDappLaunchDesc" },
    { titleKey: "improvedCodeQuality", descKey: "improvedCodeQualityDesc" },
    { titleKey: "boostedProductivity", descKey: "boostedProductivityDesc" },
    { titleKey: "designConsistency", descKey: "designConsistencyDesc" },
  ];

  return (
    <Card className="shadow-xs">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">{t("keyAchievements")}</h2>
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-medium text-sm mb-1">
                  {t(achievement.titleKey)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(achievement.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
