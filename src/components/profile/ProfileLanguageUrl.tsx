import { ClipboardCopyIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { useLocation } from 'wouter';
import type { Locale } from '../../lib/i18n';
import { locales } from '../../lib/i18n';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { useToast } from '../ui/use-toast';

// Map of language names in their native language
const languageNames: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
  es: 'Español',
  ar: 'العربية',
};

interface ProfileLanguageUrlProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function ProfileLanguageUrl({ locale, onLocaleChange }: ProfileLanguageUrlProps) {
  const t = useTranslations('ProfileLanguageUrl');
  const { toast } = useToast();

  const profileUrl = 'www.linkedin.com/in/roccorusso';

  const [location, setLocation] = useLocation();

  const handleLocaleChange = (newLocale: Locale) => {
    // Update app state
    onLocaleChange(newLocale);

    // Update URL to reflect the new locale
    const pathSegments = location.split('/').filter(Boolean);

    // If the current path already has a locale prefix, replace it
    if (pathSegments.length > 0 && locales.includes(pathSegments[0] as Locale)) {
      pathSegments[0] = newLocale;
      setLocation(`/${pathSegments.join('/')}`);
    } else {
      // If there's no locale prefix, add it
      setLocation(`/${newLocale}${location === '/' ? '' : location}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://${profileUrl}`).then(() => {
      toast({
        description: t('urlCopied'),
        duration: 2000,
      });
    });
  };

  return (
    <Card className="shadow-xs mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Profile Language Section */}
          <div>
            <h3 className="text-base font-medium mb-2">{t('profileLanguage')}</h3>
            <Select value={locale} onValueChange={value => handleLocaleChange(value as Locale)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('selectLanguage')} />
              </SelectTrigger>
              <SelectContent>
                {locales.map(localeOption => (
                  <SelectItem key={localeOption} value={localeOption}>
                    {languageNames[localeOption]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">{t('languageInfo')}</p>
          </div>

          <Separator />

          {/* Public Profile URL Section */}
          <div>
            <h3 className="text-base font-medium mb-2">{t('publicProfile')}</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground break-all flex-1">{profileUrl}</p>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 px-2"
                  aria-label={t('copyUrl')}
                >
                  <ClipboardCopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
