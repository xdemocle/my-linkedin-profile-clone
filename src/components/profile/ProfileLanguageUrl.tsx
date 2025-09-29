import { useTranslations } from 'use-intl';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function ProfileLanguageUrl() {
  const t = useTranslations('ProfileLanguageUrl');
  
  return (
    <Card className="shadow-xs mb-3">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Profile Language Section */}
          <div>
            <h3 className="text-base font-medium mb-2">{t('profileLanguage')}</h3>
            <Select defaultValue="en">
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('selectLanguage')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          {/* Public Profile URL Section */}
          <div>
            <h3 className="text-base font-medium mb-2">{t('publicProfile')}</h3>
            <p className="text-sm text-muted-foreground break-all">
              www.linkedin.com/in/roccorusso
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
