import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useTranslations } from "use-intl";
import { useLocation } from "wouter";
import { LOCALES, type Locale } from "../../constants/i18n";
import { LINKEDIN_SHUTDOWN_BLOG_URL } from "../../constants/webinfo";
import { useLocale } from "../../hooks/useLocale";
import { getLocaleConfig } from "../../lib/i18n";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

export function ProfileLanguageUrl() {
  const { locale, setLocale } = useLocale();
  const t = useTranslations("ProfileLanguageUrl");

  const [location, setLocation] = useLocation();

  const handleLocaleChange = (newLocale: Locale) => {
    // Update app state
    setLocale(newLocale);

    // Update URL to reflect the new locale
    const pathSegments = location.split("/").filter(Boolean);

    // If the current path already has a locale prefix, replace it
    if (
      pathSegments.length > 0 &&
      LOCALES.includes(pathSegments[0] as Locale)
    ) {
      pathSegments[0] = newLocale;
      setLocation(`/${pathSegments.join("/")}`);
    } else {
      // If there's no locale prefix, add it
      setLocation(`/${newLocale}${location === "/" ? "" : location}`);
    }
  };

  return (
    <Card className="shadow-xs">
      <CardContent>
        <div className="space-y-4">
          {/* Profile Language Section */}
          <div>
            <h3 className="text-base font-medium mb-2">
              {t("profileLanguage")}
            </h3>
            <Select
              value={locale}
              onValueChange={value => handleLocaleChange(value as Locale)}
            >
              <SelectTrigger className="w-full" aria-label={t("selectLanguage")}>
                <SelectValue placeholder={t("selectLanguage")} />
              </SelectTrigger>
              <SelectContent>
                {LOCALES.map(localeOption => (
                  <SelectItem key={localeOption} value={localeOption}>
                    {getLocaleConfig(localeOption).name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              {t("languageInfo")}
            </p>
          </div>

          <Separator />

          {/* Public profile & URL — points to the blog post that explains
              why the LinkedIn profile was shut down. Title text is kept as
              "Public profile & URL" so it still reads as the same row in
              the right sidebar. */}
          <div>
            <h3 className="text-base font-medium mb-2">
              {t("publicProfile")}
            </h3>
            <a
              href={LINKEDIN_SHUTDOWN_BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              Read why I shut down LinkedIn
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
