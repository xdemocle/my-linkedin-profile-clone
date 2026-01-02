# JSON Resume Migration Guide

## Overview

The application has been refactored to use the [JSON Resume](https://jsonresume.org/schema) standard as the primary data structure. This provides better portability, standardization, and compatibility with the broader resume ecosystem.

## What Changed

### New Files

1. **`src/types/json-resume.ts`** - TypeScript types for the JSON Resume schema
2. **`src/data/resume.json`** - Main resume data file in JSON Resume format
3. **`src/hooks/useJSONResumeAdapter.ts`** - Adapter hook that converts JSON Resume to ProfileData format

### Modified Files

1. **`src/hooks/useProfileData.ts`** - Now uses the adapter hook internally
2. **`src/hooks/index.ts`** - Exports the new `useJSONResumeAdapter` hook

### Legacy Files (Can be removed)

- `src/data/experience.json`
- `src/data/projects.json`

## JSON Resume Schema

The JSON Resume schema includes these main sections:

```typescript
{
  basics: {
    name, label, image, email, phone, url, summary,
    location: { city, region, countryCode },
    profiles: [{ network, username, url }]
  },
  work: [{ name, position, url, startDate, endDate, summary, highlights, location }],
  volunteer: [{ organization, position, url, startDate, endDate, summary, highlights }],
  education: [{ institution, url, area, studyType, startDate, endDate, score, courses }],
  awards: [{ title, date, awarder, summary }],
  certificates: [{ name, date, issuer, url }],
  skills: [{ name, level, keywords }],
  languages: [{ language, fluency }],
  interests: [{ name, keywords }],
  projects: [{ name, startDate, endDate, description, highlights, url, keywords, roles }]
}
```

## Usage

### Option 1: Use the Adapter (Recommended for existing code)

```typescript
import { useProfileData } from '@/hooks';

function MyComponent() {
  const { personal, experience, projects, skills } = useProfileData();
  // Works exactly as before
}
```

### Option 2: Use JSON Resume Directly (Recommended for new code)

```typescript
import { useJSONResumeAdapter } from '@/hooks';

function MyComponent() {
  const profileData = useJSONResumeAdapter();
  // Same ProfileData structure
}
```

### Option 3: Access Raw JSON Resume Data

```typescript
import resumeData from '@/data/resume.json';
import type { JSONResume } from '@/types/json-resume';

function MyComponent() {
  const resume = resumeData as JSONResume;
  // Work with raw JSON Resume format
}
```

## Data Mapping

### Basics → PersonalInfo

| JSON Resume         | ProfileData         | Notes                    |
| ------------------- | ------------------- | ------------------------ |
| `basics.name`       | `personal.name`     | Direct mapping           |
| `basics.label`      | `personal.title`    | Job title                |
| `basics.summary`    | `personal.about`    | Bio/summary              |
| `basics.image`      | `personal.avatar`   | Profile image            |
| `basics.url`        | `personal.website`  | Personal website         |
| `basics.email`      | `personal.email`    | Contact email            |
| `basics.phone`      | `personal.phone`    | Phone number             |
| `basics.location.*` | `personal.location` | Formatted as string      |
| `basics.profiles[]` | `personal.github`   | GitHub profile extracted |

### Work → Experience

| JSON Resume         | ProfileData                | Notes              |
| ------------------- | -------------------------- | ------------------ |
| `work[].name`       | `experience[].company`     | Company name       |
| `work[].position`   | `experience[].position`    | Job title          |
| `work[].startDate`  | `experience[].dateRange`   | Formatted as range |
| `work[].endDate`    | `experience[].dateRange`   | "Present" if empty |
| `work[].summary`    | `experience[].description` | Job description    |
| `work[].highlights` | `experience[].highlights`  | Key achievements   |
| `work[].location`   | `experience[].location`    | Work location      |

### Projects → Project

| JSON Resume              | ProfileData                | Notes            |
| ------------------------ | -------------------------- | ---------------- |
| `projects[].name`        | `projects[].title`         | Project name     |
| `projects[].description` | `projects[].description`   | Description      |
| `projects[].url`         | `projects[].links.website` | Project URL      |
| `projects[].keywords`    | `projects[].technologies`  | Tech stack       |
| `projects[].highlights`  | Custom field               | Key achievements |
| `projects[].roles`       | `projects[].role`          | Role in project  |

### Skills → Skill

| JSON Resume         | ProfileData              | Notes                                    |
| ------------------- | ------------------------ | ---------------------------------------- |
| `skills[].name`     | `skills[].category`      | Skill category                           |
| `skills[].keywords` | `skills[].items[].name`  | Individual skills                        |
| `skills[].level`    | `skills[].items[].level` | Uses `skills.json` for individual levels |

**Level Conversion:**
Since JSON Resume applies a single level to an entire skill category, the adapter uses the original `skills.json` data to preserve individual skill levels. This ensures the detailed progression of skills as follows:

- Individual skills are assigned their specific levels from `skills.json` (e.g., "React": 95, "CSS-in-JS": 80)
- If a skill is not found in `skills.json`, it falls back to a category-based conversion:
  - "Beginner" → 30
  - "Intermediate" → 60
  - "Advanced" → 85
  - "Expert" → 95
  - "Master" → 100

### Education → Education

| JSON Resume               | ProfileData               | Notes          |
| ------------------------- | ------------------------- | -------------- |
| `education[].institution` | `education[].institution` | School name    |
| `education[].studyType`   | `education[].degree`      | Degree type    |
| `education[].area`        | `education[].degree`      | Field of study |
| `education[].startDate`   | `education[].dateRange`   | Year only      |
| `education[].endDate`     | `education[].dateRange`   | Year only      |

### Awards → Achievement

| JSON Resume        | ProfileData                  | Notes        |
| ------------------ | ---------------------------- | ------------ |
| `awards[].title`   | `achievements[].title`       | Award title  |
| `awards[].summary` | `achievements[].description` | Description  |
| `awards[].date`    | Custom field                 | Award date   |
| `awards[].awarder` | Custom field                 | Awarder name |

### Certificates → Certification

| JSON Resume             | ProfileData                   | Notes       |
| ----------------------- | ----------------------------- | ----------- |
| `certificates[].name`   | `certifications[].name`       | Cert name   |
| `certificates[].issuer` | `certifications[].issuer`     | Issuing org |
| `certificates[].date`   | `certifications[].dateIssued` | Issue date  |
| `certificates[].url`    | `certifications[].link`       | Cert URL    |

## Updating Resume Data

To update your resume, edit `src/data/resume.json`. The file follows the JSON Resume schema with these conventions:

### Date Format

Use ISO 8601 format: `YYYY-MM-DD`

- Start dates: `"2024-01-01"`
- End dates: `"2024-12-31"` or `""` for current positions

### URLs

- Always include full URLs with protocol: `https://`
- Use `url` field for primary link
- Use `profiles` array for social media

### Skills

Group related skills by category:

```json
{
  "name": "Frontend Development",
  "level": "Expert",
  "keywords": ["React", "TypeScript", "CSS"]
}
```

### Highlights

Use bullet points for achievements:

```json
{
  "highlights": ["Led team of 5 developers", "Increased performance by 40%", "Reduced bugs by 25%"]
}
```

## Benefits of JSON Resume

1. **Portability** - Standard format works with many tools
2. **Validation** - JSON Schema validation available
3. **Ecosystem** - Compatible with resume builders, parsers, and validators
4. **Documentation** - Well-documented standard with examples
5. **Internationalization** - Easy to create multiple language versions
6. **Export** - Can export to PDF, HTML, etc. using JSON Resume tools

## Multi-Language Support

To support multiple languages, separate JSON Resume files are created for each language (e.g., `resume-en.json`). The adapter hook dynamically loads the appropriate file based on the current locale. Translations for UI elements and fallback text are managed using the `useTranslations` hook from `use-intl`, ensuring a seamless experience across languages.

## Migration Checklist

- [x] Create JSON Resume types
- [x] Convert existing data to resume.json
- [x] Create adapter hook
- [x] Update useProfileData to use adapter
- [x] Export new hooks
- [x] Remove old data files (experience.json, projects.json, skills.json)
- [x] Update tests to use new structure
- [x] Verify all components work correctly
- [x] Update documentation

## Backward Compatibility

The `useProfileData` hook maintains full backward compatibility. All existing components continue to work without modification. The adapter pattern ensures a smooth transition while allowing gradual migration to the new structure.

## Resources

- [JSON Resume Schema](https://jsonresume.org/schema)
- [JSON Resume GitHub](https://github.com/jsonresume)
- [Schema Validator](https://jsonresume.org/schema/)
- [Example Resumes](https://jsonresume.org/getting-started/)
