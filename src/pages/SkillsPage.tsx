import { PageLayout } from '@/components/layout/PageLayout';
import { Progress } from '@/components/ui/progress';
import { useProfileData } from '@/hooks';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { LinkTranslated } from '../components/LinkTranslated';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';

export function SkillsPage() {
  const t = useTranslations('Skills');
  const { personal, skills } = useProfileData();

  return (
    <PageLayout>
      {/* Header */}
      <CardHeader className="mt-8 flex items-center justify-start flex-col text-center sm:flex-row sm:text-left">
        <Button variant="outline" size="icon" asChild>
          <LinkTranslated href="/">
            <ArrowLeftIcon className="size-5" />
          </LinkTranslated>
        </Button>
        <h1 className="text-3xl font-bold ml-3">
          {personal.name} | {t('title')}
        </h1>
      </CardHeader>

      {/* Skills by Category */}
      {skills.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="shadow-xs">
          <CardContent>
            <h2 className="text-xl font-semibold mb-6">{category.category}</h2>

            <div className="space-y-4 grid grid-cols-max lg:grid-cols-2 gap-6">
              {category.items.map((skill, skillIndex) => (
                <div key={skillIndex} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>

                  <Progress value={skill.level} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </PageLayout>
  );
}
