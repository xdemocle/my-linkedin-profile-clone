import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'node:fs/promises';
import path from 'path';
import { defineConfig } from 'vite';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      additionalPrerenderRoutes: [
        // Main language routes
        '/en', '/it', '/fr', '/es', '/ar',
        // Experience pages
        '/en/experience', '/it/experience', '/fr/experience', '/es/experience', '/ar/experience',
        // Blog pages
        '/en/blog', '/it/blog', '/fr/blog', '/es/blog', '/ar/blog',
        // Projects pages
        '/en/projects', '/it/projects', '/fr/projects', '/es/projects', '/ar/projects'
      ],
    }),
    // Create Cloudflare Pages configuration files for proper routing
    {
      name: 'create-cloudflare-config',
      async writeBundle() {
        // Create _redirects file
        const redirectsContent = `
# Redirect root to default language
/  /en  302

# Handle language-specific routes
/en/*  /en/:splat  200
/it/*  /it/:splat  200
/fr/*  /fr/:splat  200
/es/*  /es/:splat  200
/ar/*  /ar/:splat  200

# Handle direct language access
/en  /en/  200
/it  /it/  200
/fr  /fr/  200
/es  /es/  200
/ar  /ar/  200
`;

        await fs.writeFile('dist/client/_redirects', redirectsContent.trim());
        console.log('Created _redirects file for Cloudflare Pages');

        // Create _routes.json file for Cloudflare Pages
        const routesConfig = {
          version: 1,
          include: ['/*'],
          exclude: [],
          routes: [
            { src: '/', dst: '/en/' },
            { src: '/en', dst: '/en/' },
            { src: '/it', dst: '/it/' },
            { src: '/fr', dst: '/fr/' },
            { src: '/es', dst: '/es/' },
            { src: '/ar', dst: '/ar/' },
            { src: '/en/*', dst: '/en/index.html' },
            { src: '/it/*', dst: '/it/index.html' },
            { src: '/fr/*', dst: '/fr/index.html' },
            { src: '/es/*', dst: '/es/index.html' },
            { src: '/ar/*', dst: '/ar/index.html' },
          ],
        };

        await fs.writeFile('dist/client/_routes.json', JSON.stringify(routesConfig, null, 2));
        console.log('Created _routes.json file for Cloudflare Pages');

        // Ensure each language directory has an index.html file
        const languages = ['en', 'it', 'fr', 'es', 'ar'];
        for (const lang of languages) {
          try {
            // Create directory if it doesn't exist
            await fs.mkdir(`dist/client/${lang}`, { recursive: true });

            // Check if the language index.html already exists (prerendered)
            const langIndexPath = `dist/client/${lang}/index.html`;

            try {
              // Check if file exists by trying to access it
              await fs.access(langIndexPath);
              console.log(`Preserving existing prerendered content in ${lang}/index.html`);
            } catch (e: unknown) {
              console.error(e);

              // Only copy if the file doesn't exist (to preserve prerendered content)
              const indexContent = await fs.readFile('dist/client/index.html', 'utf-8');
              await fs.writeFile(langIndexPath, indexContent);
              console.log(`Copied index.html to ${lang} directory`);
            }
          } catch (error) {
            console.error(`Error handling index.html for ${lang} directory:`, error);
          }
        }

        // Create _headers file for Cloudflare Pages
        const headersContent = `
# Cache assets with a long TTL
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache HTML files with a short TTL
/*.html
  Cache-Control: public, max-age=0, must-revalidate

# Language directories
/en/*
  Content-Language: en
/it/*
  Content-Language: it
/fr/*
  Content-Language: fr
/es/*
  Content-Language: es
/ar/*
  Content-Language: ar
`;

        await fs.writeFile('dist/client/_headers', headersContent.trim());
        console.log('Created _headers file for Cloudflare Pages');
      },
    },
    {
      name: 'ClosePlugin', // required, will show up in warnings and errors

      // use this to catch errors when building
      buildEnd(error) {
        if (error) {
          console.error('Error bundling');
          console.error(error);
          process.exit(1);
        } else {
          console.log('Build ended');
        }
      },

      // use this to catch the end of a build without errors
      closeBundle() {
        console.log('Bundle closed');
        process.exit(0);
      },
    },
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/client',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
