import { useMemo } from 'react';
import { companies, type Company } from '../data/companies';
// Will be needed when implementing headless CMS
// import { useLocale } from './useLocale';

/**
 * Hook for accessing companies data with appropriate localization.
 * This pattern allows easier migration to a headless CMS in the future.
 */
export function useCompaniesData(): Record<string, Company> {
  // Will need locale when implementing CMS integration
  // const { locale } = useLocale();

  return useMemo(() => {
    // In the future, this would fetch from a CMS based on locale
    return companies;
  }, []);
}
