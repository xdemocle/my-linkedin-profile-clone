# Routing Fixes - Locale-Aware Links with Trailing Slashes

## Problem

Links throughout the codebase were hardcoded to `/` or page paths like `/experience` without considering the current locale. Additionally, URLs were inconsistent - some had trailing slashes and some didn't. This caused:

- "Back to profile" buttons always redirecting to `/` instead of `/it/`, `/fr/`, etc.
- Navigation links not preserving locale when switching pages
- Inconsistent URL structure (some with trailing slashes, some without)

## Solution

1. Created a new `LinkTranslated` component that automatically applies locale prefixes to all URLs
2. Updated `getPageUrlFromPath()` to **always ensure trailing slashes** on all generated URLs

## Files Created

### `/src/components/ui/link-translated.tsx`

A locale-aware Link wrapper that:

- Reads the current locale from context
- Automatically prefixes URLs with the locale (e.g., `/experience` → `/it/experience/`)
- Handles default locale (en) correctly (no prefix needed)
- **All URLs now have trailing slashes**

## Files Updated

### Core Library

1. **i18n.ts** (`/src/lib/i18n.ts`)
   - Updated `getPageUrlFromPath()` to **always add trailing slashes**
   - Normalizes paths and ensures consistent URL structure

### Pages

1. **ExperiencePage** (`/src/pages/ExperiencePage.tsx`)

   - Replaced `Link` with `LinkTranslated` for "Back to profile" button

2. **ProjectsPage** (`/src/pages/ProjectsPage.tsx`)

   - Added `useLocale` and `getPageUrlFromPath`
   - Updated `handleBackToProfile` to use locale-aware navigation with trailing slash

3. **NotFoundPage** (`/src/pages/NotFoundPage.tsx`)
   - Updated "Go Home" button to use locale-aware navigation with trailing slash

### Components

1. **Navbar** (`/src/components/layout/Navbar.tsx`)

   - Replaced custom locale logic with `getPageUrlFromPath()`
   - All navigation links now have trailing slashes

2. **ExperienceSection** (`/src/components/profile/ExperienceSection.tsx`)

   - Replaced `Link` with `LinkTranslated` for "Show all experiences" button

3. **ProjectsSection** (`/src/components/profile/ProjectsSection.tsx`)

   - Updated "See All" button to use locale-aware navigation with trailing slash

4. **LanguageSwitcher** (`/src/components/ui/language-switcher.tsx`)
   - Already uses `getPageUrlFromPath()`, now automatically gets trailing slashes

## Usage Example

**Before:**

```tsx
<Link href="/experience">View Experience</Link>
// Always goes to /experience (wrong for non-English locales, no trailing slash)
```

**After:**

```tsx
<LinkTranslated href="/experience">View Experience</LinkTranslated>
// Goes to /it/experience/ when on Italian locale (with trailing slash)
// Goes to /experience/ when on English locale (default, with trailing slash)
```

## Testing

All navigation links now correctly preserve the user's selected language **with trailing slashes**:

| Current Locale | Link To       | Result            |
| -------------- | ------------- | ----------------- |
| en (default)   | `/`           | `/`               |
| it             | `/`           | `/it/`            |
| fr             | `/experience` | `/fr/experience/` |
| ar             | `/projects`   | `/ar/projects/`   |
| en             | `/projects`   | `/projects/`      |
| it             | `/experience` | `/it/experience/` |

### Test Commands

```bash
# Test Italian locale home
curl -I http://localhost:8788/it/
# Expected: 200 OK, Content-Language: it

# Test French experience page
curl -I http://localhost:8788/fr/experience/
# Expected: 200 OK, Content-Language: fr

# Test default locale (English) projects
curl -I http://localhost:8788/projects/
# Expected: 200 OK, Content-Language: en
```

## Trailing Slash Logic

The `getPageUrlFromPath()` function now:

1. Normalizes the input path (removes leading/trailing slashes)
2. Builds the URL with locale prefix (if not default locale)
3. Cleans up any double slashes
4. **Ensures the URL ends with a trailing slash**

```typescript
export const getPageUrlFromPath = (locale: Locale, page: string) => {
  // Normalize the page path - remove leading/trailing slashes
  const normalizedPage = page.replace(/^\/+|\/+$/g, '');

  // Build the URL with locale prefix (if not default)
  let url = locale === LOCALE_DEFAULT ? `/${normalizedPage}` : `/${locale}/${normalizedPage}`;

  // Clean up any double slashes
  url = url.replace(/\/+/g, '/');

  // Ensure trailing slash
  if (!url.endsWith('/')) {
    url += '/';
  }

  return url;
};
```

## Benefits

1. **Consistent UX**: Users stay in their selected language
2. **SEO**: Proper locale URLs for search engines
3. **Maintainability**: Single source of truth for link generation
4. **Type Safety**: Full TypeScript support with proper typing
5. **URL Consistency**: All URLs have trailing slashes, preventing redirect chains
