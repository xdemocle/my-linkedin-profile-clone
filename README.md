# 🚀 LinkedIn Profile Clone

An open-source demo project replicating the modern LinkedIn experience with advanced internationalization, dynamic theme switching, and robust routing capabilities.

[![Built with React](https://img.shields.io/badge/Built_with-React-61DAFB?style=flat-square&logo=react)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/) [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/) [![ShadcnUI](https://img.shields.io/badge/UI-Shadcn-000000?style=flat-square)](https://ui.shadcn.com/)  [![Tested with Vitest](https://img.shields.io/badge/Tested_with-Vitest-729B1B?style=flat-square)](https://vitest.dev/)

## ✨ Features

- **Multi-language Support** - Complete i18n with RTL support for 5 languages (en, it, fr, es, ar)
- **Clean & Modern UI** - Professional LinkedIn-inspired interface built with TailwindCSS and Shadcn/UI
- **SSG Pre-rendering** - Static generation for all language routes
- **Dark/Light Themes** - Automatic and manual theme switching
- **Edge Routing** - Smart routing with Cloudflare Pages integration
- **Comprehensive Testing** - 100% test coverage for routing logic
- **Responsive Design** - Mobile-first approach for all screen sizes

## 🏗️ Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS v4, Shadcn/UI
- **Build Tools**: Vite, Bun
- **Internationalization**: use-intl
- **Routing**: Wouter (lightweight)
- **Testing**: Vitest, React Testing Library
- **Deployment**: Cloudflare Pages

## 🧠 Technical Design

### Multi-language Architecture

The application implements a sophisticated i18n system with:

- URL-based locale detection
- Default locale (English) without prefix (`/experience`)
- Other languages with prefix (`/fr/experience`)
- Automatic redirects for legacy paths
- RTL support for Arabic

### Routes & Pages

```text
/ (en)           - Profile page in English
/it/, /fr/, etc. - Localized profile pages
/experience      - Experience page in English
/*/experience    - Localized experience pages
/blog            - Blog page in English
/*/blog          - Localized blog pages
/projects        - Projects page in English
/*/projects      - Localized projects pages
```

### Components

The application follows a modular component architecture:

- `<ThemeProvider>` - Manages light/dark mode
- `<LocaleProvider>` - Handles internationalization
- `<Router>` - Smart routing with locale detection
- `<ProfileLayout>`, `<PageLayout>` - Layout components

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (package manager)
- Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/[username]/my-linkedin-profile-clone.git
cd my-linkedin-profile-clone

# Install dependencies
bun install

# Start development server
bun run dev
```

### Testing

```bash
# Run all tests
bun run test

# Run specific tests
bun run test:run src/__tests__/components/Router.test.tsx
```

## 📋 Project Structure

```text
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── constants/      # Configuration constants
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── __tests__/      # Test files
```

## 📝 Testing Strategy

The application includes comprehensive tests focusing on:

- **URL Generation & Parsing** - Core routing logic
- **Locale Detection** - Determines initial app state
- **Route Matching** - Ensures correct page rendering
- **Language Switching** - Key user interaction

## 🔒 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful component library
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [use-intl](https://use-intl.vercel.app/) for internationalization support
- [Wouter](https://github.com/molefrog/wouter) for lightweight routing
