import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { useProfileData } from "@/hooks";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useTranslations } from "use-intl";
import { LinkTranslated } from "../components/LinkTranslated";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

const recommendationKeys = [
  "oliverMuller",
  "hiroshiTanaka",
  "sofiaAndersson",
  "mateoFernandez",
  "larsNielsen",
  "emmaVanDerBerg",
  "rajeshKumar",
  "ingridSchmidt",
  "lukasNovak",
  "carlosMendoza",
  "pierreDubois",
  "marcoRossi",
  "jakubKowalski",
];

export function RecommendationsPage() {
  const t = useTranslations("Recommendations");
  const tData = useTranslations("SampleData.recommendations");
  const { personal } = useProfileData();

  return (
    <PageLayout>
      <SEO
        title={`${personal.name} | ${t("title")}`}
        description="Professional recommendations and testimonials from colleagues and clients."
        path="/recommendations"
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: t("title"), url: "/recommendations" },
        ]}
      />
      {/* Recommendations List */}
      <Card className="shadow-xs">
        {/* Header */}
        <CardHeader className="flex items-center justify-start flex-col text-center sm:flex-row sm:text-left">
          <Button variant="outline" size="icon" asChild>
            <LinkTranslated href="/">
              <ArrowLeftIcon className="size-5" />
            </LinkTranslated>
          </Button>
          <h1 className="text-3xl font-bold ml-3">
            {personal.name} | {t("title")}
          </h1>
        </CardHeader>

        <CardContent className="p-6">
          {recommendationKeys.map((key, index) => (
            <div key={key} className="mb-8 last:mb-0">
              {index > 0 && <Separator className="my-8" />}
              <div className="flex gap-2 md:gap-4">
                <Avatar className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{tData(`${key}.name`)[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold">
                      {tData(`${key}.name`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tData(`${key}.title`)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tData(`${key}.relationship`)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tData(`${key}.date`)}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed mb-3">
                    {tData(`${key}.content`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageLayout>
  );
}
