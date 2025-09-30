import { useTranslations } from 'use-intl';
import type { Locale } from '../../lib/i18n';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ProfileLanguageUrl } from './ProfileLanguageUrl';

interface Language {
  nameKey: string;
  levelKey: string;
}

interface ProfileSidebarProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function ProfileSidebar({ locale, onLocaleChange }: ProfileSidebarProps) {
  const tLanguages = useTranslations('Languages');
  const tInterests = useTranslations('Interests');
  const tFooter = useTranslations('ProfileFooter');

  const profileLanguages: Language[] = [
    { nameKey: 'italian', levelKey: 'native' },
    { nameKey: 'english', levelKey: 'professional' },
    { nameKey: 'spanish', levelKey: 'conversational' },
    { nameKey: 'french', levelKey: 'conversational' },
  ];

  const interestCategories = [
    {
      category: 'techProfession',
      items: [
        'blockchain',
        'web3',
        'cybersecurity',
        'react',
        'typeScript',
        'openSource',
        'ai',
        'cleanCode',
        'scalability',
        'architecture',
        'problemSolving',
      ],
    },
    {
      category: 'collaborationLeadership',
      items: ['mentorship', 'leadership', 'remoteWork', 'collaboration', 'community', 'teaching', 'education'],
    },
    {
      category: 'mindsetValues',
      items: [
        'innovation',
        'strategy',
        'systemsThinking',
        'adaptability',
        'growth',
        'ethics',
        'empathy',
        'continuousLearning',
      ],
    },
    {
      category: 'cultureExpression',
      items: ['globalMindset', 'languages', 'research', 'writing', 'creativity'],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Profile Language & URL */}
      <ProfileLanguageUrl locale={locale} onLocaleChange={onLocaleChange} />

      {/* Languages */}
      <Card className="shadow-xs mb-6">
        <CardHeader>
          <CardTitle className="text-base">{tLanguages('title')}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {profileLanguages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium text-sm">{tLanguages(lang.nameKey)}</span>
                <Badge variant="secondary" className="text-xs">
                  {tLanguages(lang.levelKey)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="shadow-xs mb-6">
        <CardHeader>
          <CardTitle className="text-base">{tInterests('title')}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {interestCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">{tInterests(category.category)}</h4>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item, itemIndex) => (
                  <Badge key={itemIndex} variant="outline" className="text-xs">
                    {tInterests(item)}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Footer Links */}
      <Card className="shadow-xs">
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground space-y-3">
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.linkedin.com/in/roccorusso/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary flex items-center gap-1"
              >
                {tFooter('linkedinProfile')}
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m7 7 10 10-5 0 0-5" />
                  <path d="m17 7-5 0 0 5" />
                </svg>
              </a>
              <span>•</span>
              <a
                href="https://rocco.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary flex items-center gap-1"
              >
                {tFooter('personalWebsite')}
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m7 7 10 10-5 0 0-5" />
                  <path d="m17 7-5 0 0 5" />
                </svg>
              </a>
            </div>
            <div className="pt-2 border-t">
              <p>{tFooter('copyright')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
