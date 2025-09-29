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

## Project Structure

- **src/** - Main source code directory
  - **App.tsx** - Main React component (currently basic Vite template)
  - **main.tsx** - Application entry point
  - **assets/** - Static assets like images and icons
- **public/** - Public static files served directly
  - Contains large HTML files (old.html, old-v1.html) likely for reference
  - **linkedin.css** - Large CSS file (3MB+) containing styling
  - **assets/** - Additional public assets
- **dist/client/** - Build output directory for Vite
- **build/** - Additional build artifacts

## Build System

- **Vite** with React SWC for fast builds and HMR
- **vite-prerender-plugin** for static site generation
- Custom build plugin that exits process on completion
- Sourcemaps enabled for debugging
- Outputs to `dist/client/` for Cloudflare Pages compatibility

## Deployment

- Configured for **Cloudflare Pages** deployment via Wrangler
- Build output directory: `./dist/client`
- Observability enabled for monitoring
- Uses compatibility date: 2025-09-15

## Code Style (from .cursorrules/.copilot)

- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Naming conventions**:
  - Components: PascalCase
  - Functions/variables: camelCase
- **Architecture**: Atomic design pattern with React hooks for state management

## Package Manager

- Uses **Bun** (v1.2.15) as the primary package manager
- Node.js requirement: >=22.19.0
- All package operations should use `bun` instead of `npm`

## Key Files

- **transforms.ts** - Build transformation configurations
- **combine-css.sh** - Shell script for CSS processing
- **wrangler.jsonc** - Cloudflare Pages configuration
- **.cursorrules/.copilot** - AI assistant configuration with project context

## Notes

- The project appears to be in early development (App.tsx still contains Vite template code)
- Large CSS file in public/ suggests this may be a reference implementation or migration from existing LinkedIn styling
- ESLint configuration uses modern flat config format