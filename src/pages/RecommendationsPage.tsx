import { PageLayout } from '@/components/layout/PageLayout';
import { useProfileData } from '@/hooks';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { LinkTranslated } from '../components/link-translated';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
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
  const { personal } = useProfileData();

  return (
    <PageLayout>
      {/* Recommendations List */}
      <Card className="shadow-xs">
        {/* Header */}
        <CardHeader className="flex items-center justify-start">
          <Button variant="outline" size="icon" asChild>
            <LinkTranslated href="/">
              <ArrowLeftIcon className="size-5" />
            </LinkTranslated>
          </Button>
          <h1 className="text-3xl font-bold ml-3">
            {personal.name} | {t('title')}
          </h1>
        </CardHeader>
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
    </PageLayout>
  );
}
