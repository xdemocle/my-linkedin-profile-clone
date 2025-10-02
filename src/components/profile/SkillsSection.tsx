// import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { useSkillsData } from '../../hooks/useSkillsData';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

interface Skill {
  nameKey: string;
  endorsements: number;
  endorsedBy: {
    name: string;
    avatar: string;
  }[];
}

export function SkillsSection() {
  const t = useTranslations('Skills');
  const { topSkills } = useSkillsData();
  
  // Use topSkills from our skills data hook
  const displaySkills: Skill[] = topSkills.length > 0 ? topSkills : [
    {
      nameKey: 'reactJs',
      endorsements: 42,
      endorsedBy: [
        { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
        { name: 'Jane Smith', avatar: 'https://github.com/shadcn.png' },
        { name: 'Alex Johnson', avatar: 'https://github.com/shadcn.png' },
      ],
    },
    {
      nameKey: 'nodejs',
      endorsements: 38,
      endorsedBy: [
        { name: 'Chris Williams', avatar: 'https://github.com/shadcn.png' },
        { name: 'Sarah Davis', avatar: 'https://github.com/shadcn.png' },
        { name: 'Michael Brown', avatar: 'https://github.com/shadcn.png' },
      ],
    },
    {
      nameKey: 'web3js',
      endorsements: 35,
      endorsedBy: [
        { name: 'Emily Wilson', avatar: 'https://github.com/shadcn.png' },
        { name: 'David Miller', avatar: 'https://github.com/shadcn.png' },
        { name: 'Jessica Taylor', avatar: 'https://github.com/shadcn.png' },
      ],
    },
  ];

  return (
    <Card className="mt-6 shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('title')}</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <a href="#">{t('showAllSkills')}</a>
        </Button>
      </CardHeader>
      <CardContent>
        {displaySkills.map((skill, index) => (
          <div key={index} className="mb-6">
            {index > 0 && <Separator className="my-6" />}
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{t(skill.nameKey)}</h3>
                <Badge variant="outline" className="rounded-full">
                  {skill.endorsements} {t('endorsements')}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <div className="flex -space-x-2">
                  {skill.endorsedBy.map((person, i) => (
                    <Avatar key={i} className="w-7 h-7 border-2 border-background">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>{person.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground ml-1">
                  {t('endorsedBy', { name: skill.endorsedBy[0].name, count: skill.endorsements - 1 })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
