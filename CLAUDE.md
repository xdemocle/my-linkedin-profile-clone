# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a LinkedIn profile clone built with React, TypeScript, and Vite. The project is configured for deployment on Cloudflare Pages and uses Bun as the package manager.

## Development Commands

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production (outputs to `dist/client/`)
- `bun run lint` - Run ESLint on the codebase
- `bun run preview` - Build and preview using Wrangler Pages locally
- `bun run deploy` - Build and deploy to Cloudflare Pages
- `bun run cf-typegen` - Generate Cloudflare worker types

## Adding shadcn/ui Components

Use this command pattern to add new shadcn/ui components:

```bash
bunx --bun shadcn@latest add [component-name]
```

Example: `bunx --bun shadcn@latest add button`

## Project Structure

- **src/** - Main source code directory
  - **app.tsx** - Main React component (currently basic Vite template)
  - **main.tsx** - Application entry point with prerender function
  - **components/ui/** - shadcn/ui component library
    - **button.tsx** - Reusable button component with Radix UI Slot
    - **button.variants.ts** - Button variant definitions using CVA
  - **lib/utils.ts** - Utility functions including `cn` for class merging
  - **index.css** - Global CSS styles with Tailwind CSS
  - **vite-env.d.ts** - Vite environment type definitions
- **public/** - Public static files served directly
  - **assets/** - Organized assets with ico/, png/, css/, images/ subdirectories
- **dist/client/** - Build output directory for Vite

## Build System

- **Vite** with React SWC for fast builds and HMR
- **Tailwind CSS v4** with @tailwindcss/vite plugin for styling
- **vite-prerender-plugin** for static site generation
- Custom build plugin that exits process on completion
- Sourcemaps enabled for debugging
- Outputs to `dist/client/` for Cloudflare Pages compatibility

## Deployment

- Configured for **Cloudflare Pages** deployment via Wrangler
- Build output directory: `./dist/client`
- Observability enabled for monitoring
- Uses compatibility date: 2025-09-15

## Code Style (from .vscode/settings.json)

- **Indentation**: 2 spaces
- **Quotes**: Single quotes (Prettier configuration)
- **Line width**: 120 characters
- **Naming conventions**:
  - Components: PascalCase
  - Functions/variables: camelCase
- **ESLint**: Modern flat configuration format

## Styling Guidelines

**IMPORTANT**: Follow these strict styling guidelines:

- **Never add CSS to style attribute** - Always use Tailwind CSS classes
- **Use Tailwind CSS for styling only** - No custom CSS or inline styles
- **Always follow latest v4 guidelines for Tailwind CSS** - Use modern Tailwind v4 syntax and features
- **Never use inline styles** - All styling must be done through Tailwind classes
- **Use shadcn/ui components** - Prefer shadcn/ui components for consistent design system
- **Use Bun as package manager** - Always use `bun` commands instead of `npm` or `yarn`

## Package Manager

- Uses **Bun** (v1.2.15) as the primary package manager
- Node.js requirement: >=22.19.0
- All package operations should use `bun` instead of `npm`

## Key Configuration Files

- **vite.config.ts** - Vite configuration with React SWC, Tailwind CSS, prerender plugin, and custom exit plugin
- **components.json** - shadcn/ui configuration for component generation and aliases
- **wrangler.jsonc** - Cloudflare Pages deployment configuration
- **tsconfig.json** - Root TypeScript configuration with path aliases (`@/*` maps to `./src/*`)
- **tsconfig.app.json** - App-specific TypeScript config (ES2022, strict mode)
- **tsconfig.node.json** - Node-specific TypeScript config (ES2023)
- **eslint.config.js** - Modern flat ESLint configuration
- **worker-configuration.d.ts** - Generated Cloudflare worker types

## Technology Stack

- **React 19.1.1** with React DOM
- **TypeScript 5.9.2** with strict mode enabled
- **Vite 7.1.2** with React SWC plugin for fast builds
- **Tailwind CSS 4.1.13** for utility-first styling
- **shadcn/ui** component system with Radix UI primitives
- **Class Variance Authority** for component variant management
- **React Hook Form 7.63.0** with Zod validation for form handling
- **Embla Carousel** for carousel/slider components
- **Lucide React** for iconography
- **ESLint 9.36.0** with modern flat configuration
- **Wrangler 4.40.2** for Cloudflare deployment
- **vite-prerender-plugin** for static site generation
- **MDX 3.1.1** with @mdx-js/rollup and @mdx-js/react for MDX content support

## Component Architecture

The project uses **shadcn/ui** component architecture with extensive Radix UI integration:

- Components are built with **Radix UI** primitives for accessibility and interaction patterns
- **Class Variance Authority (CVA)** manages component variants and styling
- **Tailwind CSS** provides utility classes with custom design tokens
- Path aliases (`@/components`, `@/lib/utils`) simplify imports
- The `cn()` utility function merges Tailwind classes using `clsx` and `tailwind-merge`

### Installed shadcn/ui Components

Current components available (based on Radix UI dependencies):

- Aspect Ratio, Avatar, Button, Collapsible, Dialog
- Dropdown Menu, Hover Card, Label, Navigation Menu
- Popover, Scroll Area, Separator, Slot (for composition)
- Tabs, Toggle, Tooltip
- Carousel (with Embla Carousel integration)
- Form components (with React Hook Form + Zod integration)

### LinkedIn Profile Components Needed

For the LinkedIn profile clone, key component categories include:

- **Layout**: Card, Avatar, Separator
- **Navigation**: Navigation Menu, Tabs
- **Interactive**: Button, Dialog, Dropdown Menu, Hover Card
- **Content**: Collapsible, Scroll Area, Badge
- **Forms**: Input, Textarea, Search

## MDX Support

The project includes **MDX** support for writing content with React components embedded in Markdown:

- **@mdx-js/rollup 3.1.1** - Rollup plugin for processing MDX files
- **@mdx-js/react 3.1.1** - React runtime for MDX components
- **Configuration**: MDX plugin configured with `enforce: 'pre'` in Vite
- **TypeScript**: Full TypeScript support with type declarations in `src/mdx.d.ts`
- **Usage**: Import and use `.mdx` files as React components
- **File Extension**: Use `.mdx` extension for files containing JSX/React components in Markdown

### MDX Example Usage

```tsx
import MyContent from './content/example.mdx';

function Page() {
  return (
    <div>
      <MyContent />
    </div>
  );
}
```

## Blog Setup

The project includes a **blog page** at the `/blog` route:

- **BlogPage Component**: Located at `src/pages/BlogPage.tsx`
- **Route Configuration**: Configured in `src/components/Router.tsx` with `/blog` path
- **Navigation**: Blog link added to Navbar with ReaderIcon from Lucide React
- **Content**: Features blog posts with author information, publish dates, read times, and tags
- **Layout**: Uses shadcn/ui Card components for post display and responsive grid layout
- **Internationalization**: Fully integrated with use-intl for multi-language support
- **Features**:
  - Featured post section highlighting the latest blog post
  - Recent posts grid with hover effects
  - Newsletter signup section for user engagement
  - Responsive design with mobile-first approach
  - Blog post metadata including author, date, read time, and tags

### Blog Structure

```tsx
// Blog posts are defined as TypeScript interfaces
interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: { name: string; avatar: string };
  publishedAt: string;
  readTime: number;
  tags: string[];
  slug: string;
}
```

### Translation Keys

Blog translations are organized under the `"Blog"` section in translation files:

- `title`, `subtitle`, `featured`, `recentPosts`
- `readFullArticle`, `readMore`, `minRead`
- `stayUpdated`, `subscribeDescription`, `enterEmail`, `subscribe`

## Development Plan & Priorities

The project follows a structured development plan outlined in `DEVELOPMENT_PLAN.md`:

### **High Priority Tasks**

1. **Complete Translation Implementation** (✅ **ALL COMPLETED**):

   - ExperienceSection job titles and descriptions (✅ **COMPLETED**)
   - SkillsSection skill names and endorsements (✅ **COMPLETED**)
   - ProfileSidebar languages, interests, and footer (✅ **COMPLETED**)
   - ActivityPage & ExperiencePage full translations (✅ **COMPLETED**)
   - BlogPage translations (✅ **COMPLETED**)

2. **UX & Accessibility Improvements**:

   - Error boundaries for translation/data loading (✅ **COMPLETED**)
   - Mobile-first responsive design completion (✅ **COMPLETED**)
   - ARIA labels and keyboard navigation (✅ **COMPLETED**)

3. **Advanced Features**:

   - Social sharing functionality (✅ **COMPLETED**)
   - Print-optimized styles (✅ **COMPLETED**)
   - PWA capabilities with offline support (✅ **COMPLETED**)

4. **Content Management**:
   - Dynamic profile data layer
   - Inline editing capabilities
     {{ ... }}

### **Medium Priority Tasks**

- Functional navbar search
- Real profile analytics data
- Enhanced mobile navigation patterns
- Optimized touch interactions

### **Explicitly Excluded (Low Priority)**

❌ **Do not implement**: Interactive elements (likes/comments), loading states, image upload, PDF export, testing, performance monitoring

### **Current Development Phase**

**Phase 1**: Translation completion for remaining pages (ActivityPage & ExperiencePage) is the immediate priority.

### **✅ Completed Implementations**

#### **Translation System (100% Complete)**

- **Core Components**: ProfileHeader, AboutSection, ExperienceSection, SkillsSection, ProfileSidebar (with clustered interests), BlogPage, Navbar, ActivityPage, ExperiencePage
- **5 Languages Supported**: English, Italian, Spanish, French, Arabic
- **Clustered Interests**: 4 categories with 35+ interest tags fully translated
- **Translation Features**:
  - Dynamic skill names and endorsement text using translation keys
  - Parameterized translations (e.g., `{count} endorsements`)
  - Language-specific professional terminology
  - Cultural adaptation of expressions

**⚠️ CRITICAL REMINDER**: When adding new translation keys to `en.json`, **ALWAYS** update all 5 language files simultaneously:
- `src/messages/en.json` (English - base)
- `src/messages/it.json` (Italian)
- `src/messages/es.json` (Spanish)
- `src/messages/fr.json` (French)
- `src/messages/ar.json` (Arabic)

**Translation Update Process**:
1. Add keys to English (`en.json`) first
2. Immediately update all other language files with appropriate translations
3. Use culturally appropriate terminology for each language
4. Test all languages to ensure no missing keys

#### **Mobile-First Responsive Design (Complete)**

- **Progressive Disclosure**: Essential functions always visible, secondary features on larger screens
- **Touch Optimization**: 44px+ touch targets on mobile (40px buttons vs 36px on desktop)
- **Responsive Navigation**: Core navigation (Home, Blog) always visible, secondary items (Jobs, Messages) on larger screens
- **Layout Adaptation**: Proper content flow and spacing across xs, sm, md, lg breakpoints

#### **Accessibility Implementation (Complete)**

- **ARIA Labels**: All interactive elements have proper `aria-label` attributes
- **Keyboard Navigation**: Full keyboard accessibility maintained
- **Semantic HTML**: Proper use of nav, main, header elements
- **Focus Management**: Clear focus indicators and logical tab order

#### **Error Handling (Complete)**

- **ErrorBoundary Component**: Catches React errors with graceful fallback UI
- **Translation Integration**: Error messages properly internationalized
- **User-Friendly Interface**: Clear error display with retry functionality

### **⏭️ Next High-Priority Tasks**

- **PWA capabilities with offline support**: Service worker implementation
- **Dynamic profile data layer**: Move hardcoded data to structured layer
- **Content editing capabilities**: Inline editing for profile sections

## Notes

- The project is in early development (app.tsx still contains Vite template code)
- Modern setup using React 19, Tailwind CSS v4, and Vite 7
- Configured for Cloudflare Pages deployment with prerendering
- shadcn/ui component system is configured with "new-york" style and Lucide icons
