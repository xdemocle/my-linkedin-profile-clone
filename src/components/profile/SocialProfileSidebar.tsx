import { useApp } from '@/hooks';
import { Fragment } from 'react';
import { useTranslations } from 'use-intl';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function SocialProfileSidebar() {
  const { socialLinks } = useApp();
  const t = useTranslations('Common');

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>{t('socials')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground space-y-3">
          {/* Social Links */}
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {socialLinks.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && <span>•</span>}
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  {link.label}
                </a>
              </Fragment>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
