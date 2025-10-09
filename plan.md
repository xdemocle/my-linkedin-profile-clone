# Testing Strategy & Implementation Plan

## Current State Analysis

The routing system is complex with multiple concerns:

- Multi-language support (5 locales: en, it, fr, es, ar)
- URL generation and locale detection
- Route redirects and legacy route handling
- Context-based locale management
- Prerendering for static generation

## Testing Setup Plan

### Phase 1: Testing Infrastructure Setup ✅

- [x] Install Vitest + React Testing Library + jsdom
- [x] Configure Vitest with TypeScript support
- [x] Set up test utilities for routing and i18n mocking
- [x] Create custom render function with providers

### Phase 2: Core Utility Testing ✅

- [x] **i18n utilities** (`src/lib/i18n.ts`)
  - [x] `getLocaleFromPath()` - URL locale detection
  - [x] `getPageUrlFromPath()` - URL generation
  - [x] `getDirection()` - RTL/LTR detection
  - [x] `isRTL()` - RTL locale identification
  - [x] Edge cases: root paths, invalid locales, trailing slashes
  - [x] URL consistency between generation and detection
  - [x] Default locale (English) special behavior

### Phase 3: Context & Hooks Testing 🔄

- [ ] **LocaleContext** (`src/contexts/LocaleContext.tsx`)
  - Initial locale detection from URL
  - Locale switching functionality
  - Messages loading and caching
  - URL synchronization
- [ ] **useLocale hook** (`src/hooks/useLocale.ts`)
  - Context consumption
  - Error handling when used outside provider

### Phase 4: Router Component Testing 🔄

- [ ] **Route matching and rendering**
  - Home routes for each locale
  - Page routes (experience, projects)
  - 404 fallback behavior
  - Legacy route redirects
- [ ] **Navigation scenarios**
  - Direct URL access
  - Language switching
  - Invalid route handling
  - Root redirect behavior

### Phase 5: Integration Testing 🔄

- [ ] **End-to-end routing flows**
  - User navigates between pages
  - Language switching preserves current page
  - URL structure consistency
  - Browser history behavior

## Test File Structure

```text
src/
├── __tests__/
│   ├── setup.ts                    # Test configuration
│   ├── utils/
│   │   ├── test-utils.tsx         # Custom render with providers
│   │   └── mock-data.ts           # Test fixtures
│   ├── lib/
│   │   └── i18n.test.ts           # URL utilities tests
│   ├── contexts/
│   │   └── LocaleContext.test.tsx # Context tests
│   ├── hooks/
│   │   └── useLocale.test.ts      # Hook tests
│   └── components/
│       └── Router.test.tsx        # Router integration tests
```

## Testing Priorities

### High Priority (Critical Path) 🔴

1. **URL Generation & Parsing** - Core routing logic
2. **Locale Detection** - Determines initial app state
3. **Route Matching** - Ensures correct page rendering
4. **Language Switching** - Key user interaction

### Medium Priority (Important) 🟡

1. **Legacy Redirects** - Backward compatibility
2. **404 Handling** - Error states
3. **Context State Management** - State consistency

### Low Priority (Nice to Have) 🟢

1. **Edge Cases** - Malformed URLs, invalid locales
2. **Performance** - Route resolution speed
3. **Accessibility** - Screen reader navigation

## Success Criteria

- [ ] 90%+ test coverage on routing logic
- [ ] All locale switching scenarios covered
- [ ] URL generation/parsing edge cases handled
- [ ] Router component fully tested
- [ ] CI/CD integration with test automation

## Recent Updates (2025-10-08)

### ✅ COMPLETED: Latest Resume Data Integration (plan-to-import.md)

**All requirements from plan-to-import.md have been implemented:**

#### Profile Header & Personal Info

- ✅ Added phone: `+39 379 263 0288`
- ✅ Updated title, location, website, GitHub, email
- ✅ Updated about/summary with 2025 resume text

#### Experience Timeline (All 9 Positions)

- ✅ **exp1 (The Web3 Ninja)**: `10/2024 - Present` - B2B, Part Time
- ✅ **exp2 (Games Global)**: `09/2023 - 09/2024` - Swieqi, Malta, Remote
- ✅ **exp3 (Shiba Inu)**: `01/2023 - 08/2023`
- ✅ **exp4 (Ajna Labs)**: `08/2022 - 08/2023`
- ✅ **exp5 (Linum Labs)**: `08/2021 - 07/2022`
- ✅ **exp6 (Omnia DeFi)**: `01/2021 - 07/2021`
- ✅ **exp7 (HCLTech)**: `12/2014 - 07/2015` - The Hague, Netherlands
- ✅ **exp8 (Elsevier)**: `2013 - 2014`
- ✅ **exp9 (AdForum)**: `2012 - 2013`

#### Key Achievements (6 Global Achievements)

- ✅ "Delivered software accessed by 5M+ users monthly"
- ✅ "Refactored legacy SPA saving €50,000 in maintenance costs"
- ✅ "Increased code quality 40%, reduced bugs 25%"
- ✅ "Boosted team productivity 30% via structured mentorship"
- ✅ "Launched DeFi apps with 20% engagement increase"
- ✅ "Created consistent style guides for multiple ecosystems"

#### Skills, Projects, Education & Certifications

- ✅ All skills categorized (Frontend, Backend, DevOps, Web3 & AI, Tools & Testing)
- ✅ All 5 featured projects with links
- ✅ Education: Athena Institute
- ✅ 3 Certifications (AWS, OpenAI API, GitHub)

### Latest Resume Data Integration ✅

**Implemented from `plan-to-import.md`:**

- [x] **Updated Profile Data** (`src/data/profile-data.ts`)

  - Added `phone` field to personal info
  - Updated about section with latest resume summary
  - Refined all 9 work experience entries with:
    - More precise date ranges (e.g., "10/2024 - Present")
    - Added `type` and `location` fields where applicable
    - Updated highlights to match 2025 resume
  - Updated all 6 achievements with latest wording

- [x] **Updated TypeScript Types** (`src/types/profile.ts`)

  - Added `phone?: string` to PersonalInfo interface
  - Added `type?: string` and `location?: string` to Experience interface

- [x] **Updated English Translations** (`src/messages/en.json`)

  - Updated ProfileData.personal with new about text
  - Updated all experience entries with new date ranges and highlights
  - Updated all achievements with refined titles

- [x] **useProfileData Hook Integration**
  - `ProjectsSection.tsx` now uses useProfileData
  - `useSkillsData.ts` now uses useProfileData
  - All components properly consume translations

**Note:** Other language translations (IT, FR, ES, AR) still have the previous data. Update them next if needed for consistency.

### Profile Data Translation Implementation

- [x] **ProfileData Section Added to All Languages**

  - ✅ English (`en.json`) - Complete profile data structure
  - ✅ Italian (`it.json`) - Full translations
  - ✅ French (`fr.json`) - Full translations
  - ✅ Spanish (`es.json`) - Full translations
  - ✅ Arabic (`ar.json`) - Full translations

- [x] **Translated Content Includes:**

  - Personal info (title, headline, location, about)
  - 9 Work experiences with highlights
  - 5 Projects with descriptions
  - Skills categories (5 categories)
  - Education (1 institution)
  - Certifications (3 certifications)
  - Achievements (6 achievements)

- [x] **COMPLETED:** Updated `useProfileData` hook to consume translations
  - Hook now reads from `ProfileData` section in translation files
  - Supports all 5 languages dynamically
  - Maintains static data (logos, links, tags) from `profile-data.ts`
  - Uses `useMemo` for performance optimization
- [x] **Ready for Testing:** All profile data across all 5 locales
  - Run `bun run dev` to test
  - Switch languages using the language selector
  - Verify: personal info, experience, projects, skills, education, certifications, achievements

### Translation System Implementation

- [x] Added comprehensive translation keys to `src/messages/en.json`:

  - `Common.profileName` for "Rocco Russo"
  - `Common.showMore` for "Show more"
  - `PeopleAlsoViewed` section with title, connections, showMore
  - `SampleData` section with:
    - `people` (6 sample profiles)
    - `recommendations` (2 recommendations)

- [x] Updated components to use translations:

  - `src/pages/ExperiencePage.tsx` - Uses `Common.profileName`
  - `src/pages/ProjectsPage.tsx` - Uses `Common.profileName`
  - `src/components/profile/PeopleAlsoViewed.tsx` - Fully translatable
  - `src/components/profile/RecommendationsSection.tsx` - Fully translatable
  - `src/components/feed/PostFeed.tsx` - Fully translatable

- [x] Removed hardcoded English text from all major components
- [x] **COMPLETED:** Translated all new keys to Italian, French, Spanish, and Arabic
  - ✅ Italian (`it.json`) - All translations added
  - ✅ French (`fr.json`) - All translations added
  - ✅ Spanish (`es.json`) - All translations added
  - ✅ Arabic (`ar.json`) - All translations added

## Recent Updates (2025-10-07)

- [x] Updated `src/data/profile-data.ts` with accurate experience, projects, skills, and achievements from README
- [x] Updated `src/data/companies.ts` with all companies mentioned in README
- [x] Updated `src/data/achievements.ts` with key achievements from README
- [x] Updated `src/data/education.ts` with correct certification names
- [x] Updated English translations (`src/messages/en.json`) with README content
- [x] Updated `src/pages/ProjectsPage.tsx` with accurate project data and links
- [x] Aligned personal information (website, GitHub, headline) with README

## Previous TODOs (Completed)

- [x] refactor src/components/Router.tsx to have a common layout
- [ ] check wouter for better support for multi-lingual prefixes
- [ ] check vite-prerender-plugin for better support for multi-lingual prefixes

## Next Steps

- **TranslationSync**
  Update other language translations (it, fr, es, ar) to match the updated English content. Consider using translation services or AI for consistency.

- **ExperiencePageRefactor**
  Refactor `src/pages/ExperiencePage.tsx` to consume data from `src/data/profile-data.ts` instead of hardcoded arrays for better maintainability.

- **FinalizeUIPolish**
  Review spacing, typography, and color consistency across localized views using TailwindCSS v4 and Shadcn/UI tokens.

- **ExpandContentAutomation**
  Introduce a content pipeline for profile data to sync with external resume sources (e.g., Notion, Airtable, or LinkedIn export).

- **AIEnhancements**
  Prototype AI-assisted career summaries and skill tagging using LLM-generated highlights sourced from existing achievements.

- **OnChainIntegrations**
  Explore verifiable credential issuance and wallet-linked identity badges for Web3-native credibility.

- **TestingCoverageReview**
  Audit Vitest suites, add accessibility checks, and ensure multilingual snapshots stay current.

- **DeploymentAutomation**
  Configure Bun-based CI workflows and Cloudflare Pages previews for each pull request.
