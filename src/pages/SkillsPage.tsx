import { Progress } from '@/components/ui/progress';
import { useProfileData } from '@/hooks';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { LinkTranslated } from '../components/link-translated';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

export function SkillsPage() {
  const t = useTranslations('Skills');
  const tPage = useTranslations('SkillsPage');
  const { personal, skills } = useProfileData();

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

            {/* Skills by Category */}
            {skills.map((category, categoryIndex) => (
              <Card className="shadow-xs mb-12">
                <CardContent>
                  <div key={categoryIndex} className="mb-8 last:mb-0">
                    <h2 className="text-xl font-semibold mb-6">{category.category}</h2>

                    <div className="space-y-4">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-xs">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{tPage('skillsOverview')}</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{tPage('totalSkills')}</span>
                    <span className="font-semibold">{skills.reduce((acc, cat) => acc + cat.items.length, 0)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{tPage('categories')}</span>
                    <span className="font-semibold">{skills.length}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{tPage('expertLevel')}</span>
                    <span className="font-semibold">
                      {skills.reduce((acc, cat) => acc + cat.items.filter(s => s.level >= 90).length, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
