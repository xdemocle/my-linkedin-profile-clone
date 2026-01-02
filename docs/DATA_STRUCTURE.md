# Data Structure Overview

## JSON Resume Standard

This application uses the [JSON Resume](https://jsonresume.org/schema) standard for storing profile/resume data.

## Main Data File

**Location:** `src/data/resume.json`

This single file contains all resume data in JSON Resume format:

```
resume.json
├── basics (personal info, contact, location, profiles)
├── work (employment history)
├── volunteer (volunteer experience)
├── education (academic background)
├── awards (achievements and recognition)
├── certificates (certifications)
├── skills (technical and soft skills)
├── languages (spoken languages)
├── interests (professional interests)
└── projects (portfolio projects)
```

## Type Definitions

**Location:** `src/types/json-resume.ts`

Full TypeScript definitions for the JSON Resume schema.

## Data Access

### Primary Hook: `useJSONResumeAdapter()`

```typescript
import { useJSONResumeAdapter } from '@/hooks';

function Component() {
  const data = useJSONResumeAdapter();
  // Returns ProfileData format
}
```

### Legacy Hook: `useProfileData()`

```typescript
import { useProfileData } from '@/hooks';

function Component() {
  const data = useProfileData();
  // Same as useJSONResumeAdapter - backward compatible
}
```

## Key Features

1. **Standardized Format** - Industry-standard JSON Resume schema
2. **Single Source of Truth** - One file (`resume.json`) for all data
3. **Type Safety** - Full TypeScript definitions
4. **Portability** - Compatible with JSON Resume tools and services
5. **Backward Compatible** - Existing components work without changes via adapter
6. **Detailed Skill Mapping** - Preserves individual skill levels using `skills.json` as the source for accurate level data
7. **Multi-Language Support** - Separate JSON Resume files for each language, dynamically loaded based on locale

## Editing Data

To update your resume:

1. Open `src/data/resume.json`
2. Edit the relevant section
3. Save the file
4. Changes will be reflected immediately in development mode

### Date Format

- Use ISO format: `YYYY-MM-DD`
- Empty string `""` for current/ongoing

### Example Entry

```json
{
  "work": [
    {
      "name": "Company Name",
      "position": "Job Title",
      "startDate": "2024-01-01",
      "endDate": "",
      "summary": "Brief description",
      "highlights": ["Achievement 1", "Achievement 2"],
      "location": "City, Country"
    }
  ]
}
```

## Static Assets

**Location:** `src/data/static-assets.ts`

Contains non-resume data like:

- Company logos
- Education institution logos
- Other static assets

## Migration from Old Structure

The old data files have been consolidated:

- ~~`experience.json`~~ → `resume.json` (work section)
- ~~`projects.json`~~ → `resume.json` (projects section)
- `skills.json` → Retained as source for individual skill levels in adapter

See `docs/JSON_RESUME_MIGRATION.md` for detailed migration guide.
