import { useProfileData } from '@/hooks';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { LinkTranslated } from '../components/link-translated';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

interface Recommendation {
  name: string;
  title: string;
  avatar: string;
  relationship: 'workedWith' | 'managed';
  textKey: string;
  date: string;
}

const recommendations: Recommendation[] = [
  {
    name: 'Sarah Johnson',
    title: 'Senior Product Manager at Tech Corp',
    avatar: 'https://github.com/shadcn.png',
    relationship: 'workedWith',
    textKey: 'exceptionalDeveloper',
    date: 'January 15, 2024',
  },
  {
    name: 'Michael Chen',
    title: 'Engineering Director at Innovation Labs',
    avatar: 'https://github.com/shadcn.png',
    relationship: 'managed',
    textKey: 'impressiveSkills',
    date: 'December 8, 2023',
  },
  {
    name: 'Emma Rodriguez',
    title: 'Lead Designer at Creative Studio',
    avatar: 'https://github.com/shadcn.png',
    relationship: 'workedWith',
    textKey: 'exceptionalDeveloper',
    date: 'November 22, 2023',
  },
  {
    name: 'David Kim',
    title: 'CTO at StartupX',
    avatar: 'https://github.com/shadcn.png',
    relationship: 'managed',
    textKey: 'impressiveSkills',
    date: 'October 5, 2023',
  },
];

export function RecommendationsPage() {
  const t = useTranslations('Recommendations');
  const tPage = useTranslations('RecommendationsPage');
  const { personal } = useProfileData();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <Button variant="ghost" size="sm" className="mb-4" asChild>
                <LinkTranslated href="/">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  {tPage('backToProfile')}
                </LinkTranslated>
              </Button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{t('title')}</h1>
                  <p className="text-muted-foreground mt-1">{personal.name}</p>
                </div>
              </div>
            </div>

            {/* Recommendations List */}
            <Card className="shadow-xs">
              <CardContent className="p-6">
                {recommendations.map((rec, index) => (
                  <div key={index} className="mb-8 last:mb-0">
                    {index > 0 && <Separator className="my-8" />}
                    <div className="flex gap-4">
                      <Avatar className="w-16 h-16 flex-shrink-0">
                        <AvatarImage src={rec.avatar} />
                        <AvatarFallback>{rec.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="mb-3">
                          <h3 className="text-lg font-semibold">{rec.name}</h3>
                          <p className="text-sm text-muted-foreground">{rec.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t(rec.relationship, { name: rec.name, person: personal.name })}
                          </p>
                        </div>
                        <p className="text-sm leading-relaxed mb-3">{t(rec.textKey)}</p>
                        <p className="text-xs text-muted-foreground">{rec.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-xs">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{tPage('receivedRecommendations')}</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{tPage('total')}</span>
                    <span className="font-semibold text-2xl">{recommendations.length}</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{tPage('colleagues')}</span>
                      <Badge variant="secondary">
                        {recommendations.filter(r => r.relationship === 'workedWith').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{tPage('managers')}</span>
                      <Badge variant="secondary">
                        {recommendations.filter(r => r.relationship === 'managed').length}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xs mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{tPage('askForRecommendation')}</h2>
                <p className="text-sm text-muted-foreground mb-4">{tPage('askForRecommendationDesc')}</p>
                <Button className="w-full" disabled>
                  {tPage('requestRecommendation')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
