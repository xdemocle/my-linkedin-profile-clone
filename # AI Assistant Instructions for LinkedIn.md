# AI Assistant Instructions for LinkedIn Profile Clone

## Project Overview

This is a LinkedIn profile clone project that focuses on replicating the LinkedIn profile UI. The project uses Bun as the JavaScript runtime and build tool.

## Key Architecture Components

### Asset Pipeline

- CSS assets are managed in `raw/assets/` directory
- Build process uses Bun to bundle and minify CSS files
- Output directory is `raw/build/`

### Build System

The project uses Bun for building and serving:

```bash
# Build CSS assets
bun transforms.ts

# Serve the application
bun index.html
```

### File Structure

```
├── raw/
│   ├── assets/    # Raw CSS assets
│   ├── build/     # Built/processed assets
│   └── index.html # Main entry point
├── transforms.ts  # Build configuration
```

## Development Workflows

### Asset Processing

- CSS files are processed using Bun's built-in bundler
- Configuration is in `transforms.ts`
- Assets should be placed in `raw/assets/` directory
- Asset references in HTML should use relative paths (`./assets/`)

### Common Patterns

1. CSS files use unique hash-based naming
2. Assets are referenced relatively from the HTML file
3. Build process includes minification and splitting

## Integration Points

- Static assets (images, CSS) are served from local `/assets` directory
- Profile data is embedded directly in HTML structure

## Environment Setup

1. Requires Bun runtime
2. Assets must be present in correct directory structure
3. Relative path resolution is critical for asset loading
