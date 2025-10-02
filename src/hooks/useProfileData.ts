import { useMemo } from 'react';
import { profileData } from '../data/profile-data';
// Will be needed when implementing headless CMS
// import { useLocale } from './useLocale';
import type { ProfileData } from '../types/profile';

/**
 * Hook for accessing profile data with appropriate localization.
 * This pattern allows easier migration to a headless CMS in the future.
 */
export function useProfileData(): ProfileData {
  // We'll need locale when we implement a headless CMS
  // const { locale } = useLocale();

  // Return memoized data to prevent unnecessary re-renders
  return useMemo(() => {
    // In the future, this would fetch from a CMS based on locale
    // For now we're returning static data, but when implementing a headless CMS
    // this would make an API call with the current locale
    return profileData;
  }, []); // Empty dependency array since we're not using locale yet
}
