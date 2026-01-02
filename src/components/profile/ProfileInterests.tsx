import { useJSONResumeAdapter } from "@/hooks";
import { useTranslations } from "use-intl";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function ProfileInterests() {
  const t = useTranslations("Interests");
  const { interests } = useJSONResumeAdapter();

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle className="text-base">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {interests.map((interest, catIndex) => (
          <div key={catIndex}>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
              {interest.name}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {interest.keywords.map((keyword, itemIndex) => (
                <Badge key={itemIndex} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
