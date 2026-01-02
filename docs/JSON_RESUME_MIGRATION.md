# JSON Resume Migration Guide

This document outlines the migration of our resume data to the [JSON Resume](https://jsonresume.org/) standard, which provides a structured, open-source format for representing resume information. This migration enhances maintainability, interoperability, and future-proofs our data structure.

## Why JSON Resume?

- **Standardization**: JSON Resume is a widely recognized open standard for resume data, ensuring compatibility with various tools and platforms.
- **Community Support**: Leveraging a community-driven schema means access to ongoing updates and improvements.
- **Tooling**: Enables integration with editors, themes, and exporters built around the JSON Resume ecosystem.
- **Type Safety**: Facilitates generating TypeScript types directly from the schema for robust type checking.
- **Multi-language Support**: Allows for separate resume files per language, improving localization.

## Migration Overview

We have transitioned from a custom data structure to the JSON Resume schema. The primary data files are now located at:

- `src/data/resume-en.json` (English)
- `src/data/resume-it.json` (Italian)
- `src/data/resume-fr.json` (French)
- `src/data/resume-ar.json` (Arabic)
- `src/data/resume-es.json` (Spanish)

These files serve as the single source of truth for all resume-related data, dynamically loaded based on the user's locale.

## Data Adapter

To maintain backward compatibility with the existing application, an adapter hook `useJSONResumeAdapter` has been implemented at `src/hooks/useJSONResumeAdapter.ts`. This hook:

1. Dynamically loads the appropriate language-specific resume file based on the current locale.
2. Maps the JSON Resume structure to the `ProfileData` interface expected by the application.
3. Handles skill level mapping using `skills.json` as a static database for accurate level values.

## Skill Level Mapping

Skill levels in the JSON Resume format are mapped to numeric values using `skills.json` as the primary source. This ensures:

- **Consistency**: Levels are sourced from a static database, preventing discrepancies.
- **Fallback**: If a skill is not found in `skills.json`, a helper function `getLevelFromString` converts string levels (e.g., "expert") to numeric values.

## Multi-Language Support

The application now supports multiple languages by maintaining separate JSON Resume files for each language. The adapter hook selects the correct file based on the user's locale, ensuring content is displayed in the appropriate language.

## Migration Checklist

- [x] **TypeScript Types**: Generated `JSONResume` types from the schema at `src/types/json-resume.ts`.
- [x] **Data Migration**: Created language-specific resume files following the JSON Resume structure.
- [x] **Adapter Implementation**: Built `useJSONResumeAdapter` to map JSON Resume data to `ProfileData`.
- [x] **Skill Levels**: Integrated `skills.json` for precise skill level mapping.
- [x] **Deprecation**: Marked the original `resume.json` as deprecated with a note redirecting to language-specific files.
- [x] **Documentation**: Updated `DATA_STRUCTURE.md` and this guide to reflect the new approach.

## Benefits of Migration

- **Maintainability**: Structured data format simplifies updates and maintenance.
- **Interoperability**: Compatibility with external tools and platforms that support JSON Resume.
- **Localization**: Enhanced support for multiple languages through separate files.
- **Type Safety**: Generated types ensure data integrity throughout the application.

## Backward Compatibility

The `useProfileData` hook remains unchanged for backward compatibility, internally using `useJSONResumeAdapter` to provide the same `ProfileData` structure to existing components.

## Resources

- **JSON Resume Official Site**: [jsonresume.org](https://jsonresume.org/)
- **Schema**: [JSON Resume Schema](https://github.com/jsonresume/resume-schema)
- **Language-Specific Files**: Located in `src/data/` as `resume-[language].json`
- **Adapter Hook**: `src/hooks/useJSONResumeAdapter.ts`
