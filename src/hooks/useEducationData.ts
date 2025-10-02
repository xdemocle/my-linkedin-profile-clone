import { useMemo } from 'react';
import { educationData, certifications } from '../data/education';
// Will be needed when implementing headless CMS
// import { useLocale } from './useLocale';
import type { Education } from '../types/profile';

interface EducationResult {
  education: Education[];
  certifications: {
    name: string;
    issuer: string;
    dateIssued: string;
    link: string;
  }[];
}

/**
 * Hook for accessing education and certification data with appropriate localization.
 * This pattern allows easier migration to a headless CMS in the future.
 */
export function useEducationData(): EducationResult {
  // Will need locale when implementing CMS integration
  // const { locale } = useLocale();
  
  return useMemo(() => {
    // In the future, this would fetch from a CMS based on locale
    return {
      education: educationData,
      certifications
    };
  }, []); // Empty dependency array since we're not using locale yet
}
