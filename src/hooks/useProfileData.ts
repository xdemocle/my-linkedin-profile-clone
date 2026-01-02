import type { ProfileData } from "../types/profile";
import { useJSONResumeAdapter } from "./useJSONResumeAdapter";

/**
 * Hook for accessing profile data with appropriate localization.
 * Now uses JSON Resume schema as the data source.
 *
 * @deprecated This hook is maintained for backward compatibility.
 * Consider using useJSONResumeAdapter directly for new code.
 */
export function useProfileData(): ProfileData {
  return useJSONResumeAdapter();
}
