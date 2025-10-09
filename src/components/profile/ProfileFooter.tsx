import { LINKEDIN_PROFILE_URL, WEBSITE_ROCCOME_URL } from '@/constants';
import { useApp } from '@/hooks';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useTranslations } from 'use-intl';
import { LinkTranslated } from '../LinkTranslated';
import { Card, CardContent } from '../ui/card';

export function ProfileFooter() {
  const tFooter = useTranslations('ProfileFooter');
  const { navLinks } = useApp();

  return (
    <Card className="shadow-xs">
      <CardContent>
        <div className="text-xs text-muted-foreground space-y-3">
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-2">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && <span>•</span>}
                <LinkTranslated href={link.href} className="hover:text-primary">
                  {link.label}
                </LinkTranslated>
              </React.Fragment>
            ))}
          </div>

          {/* External Links */}
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex items-center gap-1"
            >
              {tFooter('linkedinProfile')}
              <ExternalLinkIcon className="size-3" />
            </a>
            <span>•</span>
            <a
              href={WEBSITE_ROCCOME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex items-center gap-1"
            >
              {tFooter('personalWebsite')}
              <ExternalLinkIcon className="size-3" />
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-2 border-t">
            <p>{tFooter('copyright')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
