import { useProfileData } from '@/hooks';
import { useTranslations } from 'use-intl';
import { LinkTranslated } from '../link-translated';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function SkillsSection() {
  const t = useTranslations('Skills');
  const { skills } = useProfileData();

  // Get top 3 skills from the first 3 categories
  const topSkills = skills.slice(0, 6).map(category => {
    const topSkill = category.items.sort((a, b) => b.level - a.level)[0];
    return {
      name: topSkill.name,
      level: topSkill.level,
      category: category.category,
    };
  });

  return (
    <Card className="mt-6 shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('title')}</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <LinkTranslated href="/skills">{t('showAllSkills')}</LinkTranslated>
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-max sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topSkills.map((skill, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{skill.name}</h3>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${skill.level}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{skill.category}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
