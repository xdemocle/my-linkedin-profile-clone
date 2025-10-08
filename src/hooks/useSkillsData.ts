import { useMemo } from 'react';
import { useProfileData } from './useProfileData';

interface SkillsResult {
  skills: {
    category: string;
    items: {
      name: string;
      level: number;
    }[];
  }[];
  topSkills: {
    nameKey: string;
    endorsements: number;
    endorsedBy: {
      name: string;
      avatar: string;
    }[];
  }[];
}

/**
 * Hook for accessing skills data with appropriate localization.
 * Now uses useProfileData for multilingual support.
 */
export function useSkillsData(): SkillsResult {
  const profileData = useProfileData();

  return useMemo(() => {
    // Transform skills from profileData to topSkills format
    const topSkillsByCategory = profileData.skills.map(category => {
      return category.items
        .sort((a, b) => b.level - a.level)
        .slice(0, 1)
        .map(skill => ({
          nameKey: skill.name.toLowerCase().replace(/\./g, ''),
          endorsements: Math.floor(skill.level / 2),
          endorsedBy: [
            { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
            { name: 'Jane Smith', avatar: 'https://github.com/shadcn.png' },
            { name: 'Alex Johnson', avatar: 'https://github.com/shadcn.png' },
          ],
        }))[0];
    });

    return {
      skills: profileData.skills,
      topSkills: topSkillsByCategory,
    };
  }, [profileData.skills]);
}
