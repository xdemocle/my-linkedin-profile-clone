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

- [x] **LocaleContext** (`src/contexts/LocaleContext.tsx`)
  - Initial locale detection from URL
  - Locale switching functionality
  - Messages loading and caching
  - URL synchronization
- [x] **useLocale hook** (`src/hooks/useLocale.ts`)
  - Context consumption
  - Error handling when used outside provider

### Phase 4: Router Component Testing 🔄

- [x] **Route matching and rendering**
  - Home routes for each locale
  - Page routes (experience, projects)
  - 404 fallback behavior
  - Legacy route redirects
- [x] **Navigation scenarios**
  - Direct URL access
  - Language switching
  - Invalid route handling
  - Root redirect behavior

### Phase 5: Integration Testing 🔄

- [x] **End-to-end routing flows**
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

## Future Enhancements

- **ExpandContentAutomation**
  Introduce a content pipeline for profile data to sync with external resume sources (e.g., Notion, Airtable, or LinkedIn export).

- **AIEnhancements**
  Prototype AI-assisted career summaries and skill tagging using LLM-generated highlights sourced from existing achievements.

- **OnChainIntegrations**
  Explore verifiable credential issuance and wallet-linked identity badges for Web3-native credibility.

- **TestingCoverageReview**
  Audit Vitest suites, add accessibility checks, and ensure multilingual snapshots stay current.

---

**See `changelog.md` for completed work and historical updates.**
