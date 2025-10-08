import { useTranslations } from 'use-intl';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ProfileFooter } from './ProfileFooter';
import { ProfileLanguageUrl } from './ProfileLanguageUrl';

interface Language {
  nameKey: string;
  levelKey: string;
}

export function ProfileSidebar() {
  const tLanguages = useTranslations('Languages');
  const tInterests = useTranslations('Interests');

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
    <div className="space-y-5 md:space-y-10">
      {/* Profile Language & URL */}
      <ProfileLanguageUrl />

      {/* Languages */}
      <Card className="shadow-xs">
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
      <ProfileFooter />
    </div>
  );
}
