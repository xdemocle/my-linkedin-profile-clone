import { useMemo } from 'react';
import { achievements } from '../data/achievements';
// Will be needed when implementing headless CMS
// import { useLocale } from './useLocale';
import type { Achievement } from '../types/profile';

/**
 * Hook for accessing achievements data with appropriate localization.
 * This pattern allows easier migration to a headless CMS in the future.
 */
export function useAchievementsData(): Achievement[] {
  // Will need locale when implementing CMS integration
  // const { locale } = useLocale();

  return useMemo(() => {
    // In the future, this would fetch from a CMS based on locale
    return achievements;
  }, []); // Empty dependency array since we're not using locale yet
}
