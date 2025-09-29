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
  - **main.tsx** - Application entry point with prerender function
  - **assets/** - Directory for static assets (currently empty)
  - **index.css** - Global CSS styles
  - **App.css** - Component-specific CSS
- **public/** - Public static files served directly
  - **assets/** - Organized assets with ico/, png/, css/, images/ subdirectories
- **dist/client/** - Build output directory for Vite

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

## Code Style (from .vscode/settings.json)

- **Indentation**: 2 spaces
- **Quotes**: Single quotes (Prettier configuration)
- **Line width**: 120 characters
- **Naming conventions**:
  - Components: PascalCase
  - Functions/variables: camelCase
- **ESLint**: Modern flat configuration format

## Package Manager

- Uses **Bun** (v1.2.15) as the primary package manager
- Node.js requirement: >=22.19.0
- All package operations should use `bun` instead of `npm`

## Key Configuration Files

- **vite.config.ts** - Vite configuration with React SWC, prerender plugin, and custom exit plugin
- **wrangler.jsonc** - Cloudflare Pages deployment configuration
- **tsconfig.json** - Root TypeScript configuration with project references
- **tsconfig.app.json** - App-specific TypeScript config (ES2022, strict mode)
- **tsconfig.node.json** - Node-specific TypeScript config (ES2023)
- **eslint.config.js** - Modern flat ESLint configuration
- **worker-configuration.d.ts** - Generated Cloudflare worker types

## Technology Stack

- **React 19.1.1** with React DOM
- **TypeScript 5.9.2** with strict mode enabled
- **Vite 7.1.2** with React SWC plugin for fast builds
- **ESLint 9.36.0** with modern flat configuration
- **Wrangler 4.40.2** for Cloudflare deployment
- **vite-prerender-plugin** for static site generation

## Notes

- The project is in early development (App.tsx still contains Vite template code)
- Modern setup using React 19, latest TypeScript, and Vite 7
- Configured for Cloudflare Pages deployment with prerendering
- Asset organization system in place under public/assets/
