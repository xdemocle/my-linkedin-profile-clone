# Deprecated: useProfileData Hook

The `useProfileData` hook has been **deprecated** and removed as of this refactoring.

## Migration Guide

All components and pages should now use `useJSONResumeAdapter` directly:

```typescript
// ❌ Old (deprecated)
import { useProfileData } from "@/hooks";
const { personal, experience, skills } = useProfileData();

// ✅ New (current)
import { useJSONResumeAdapter } from "@/hooks";
const { personal, experience, skills } = useJSONResumeAdapter();
```

## Why This Change?

1. **Eliminates unnecessary abstraction** - `useProfileData` was just a wrapper around `useJSONResumeAdapter`
2. **Clearer intent** - Components directly use the JSON Resume adapter, making the data source obvious
3. **Reduced maintenance** - One less hook to maintain and keep in sync
4. **Better performance** - Eliminates an extra function call layer

## Files Updated

The following files were refactored to use `useJSONResumeAdapter` directly:

- `src/pages/ExperiencePage.tsx`
- `src/pages/RecommendationsPage.tsx`
- `src/pages/SkillsPage.tsx`
- `src/pages/ProjectsPage.tsx`
- `src/components/StructuredData.tsx`
- `src/components/profile/SkillsSection.tsx`
- `src/components/profile/ExperienceSection.tsx`
- `src/components/profile/AboutSection.tsx`
- `src/components/profile/ProjectsSection.tsx`
- `src/components/profile/ProfileHeader.tsx`
- `src/components/SEO.tsx`
- `src/components/layout/Navbar.tsx` (commented reference)

The `useProfileData` export was also removed from `src/hooks/index.ts`.
