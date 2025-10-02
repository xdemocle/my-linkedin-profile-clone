import { useMemo } from 'react';
import { profileData } from '../data/profile-data';

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
 * This pattern allows easier migration to a headless CMS in the future.
 */
export function useSkillsData(): SkillsResult {
  // Will need locale when implementing CMS integration
  // const { locale } = useLocale();

  return useMemo(() => {
    // In the future, this would fetch from a CMS based on locale

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
  }, []); // Empty dependency array since we're not using locale yet
}
