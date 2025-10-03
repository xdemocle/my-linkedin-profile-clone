import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs/promises';
import path from 'path';
import { defineConfig } from 'vite';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import { LOCALES, LOCALE_DEFAULT } from './src/constants/i18n';
import { getPageUrlFromPath } from './src/lib/i18n';
const mainLanguageRoutes = [...LOCALES.map(locale => getPageUrlFromPath(locale, ''))];

const additionalPrerenderRoutes = [
  // Main language routes
  ...mainLanguageRoutes,

  // Experience pages
  ...LOCALES.map(locale => getPageUrlFromPath(locale, 'experience')),

  // Blog pages
  ...LOCALES.map(locale => getPageUrlFromPath(locale, 'blog')),

  // Projects pages
  ...LOCALES.map(locale => getPageUrlFromPath(locale, 'projects')),
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      additionalPrerenderRoutes,
    }),

    // TODO: automatize _header and _redirect of cloudflare pages
    // Create Cloudflare Pages configuration files for proper routing
    {
      name: 'create-cloudflare-config',
      async writeBundle() {
        // Ensure each language directory has an index.html file
        const languages = LOCALES;

        // Create _redirects file
        const redirectsContent = [
          '# Handle direct language access with trailing slash',
          `/${LOCALE_DEFAULT}   /       302`,
          `/${LOCALE_DEFAULT}/  /       302`,
        ];

        for (const lang of languages) {
          if (lang !== LOCALE_DEFAULT) {
            redirectsContent.push(`/${lang}  /${lang}/     301`);
          }
        }

        redirectsContent.push(`/${LOCALE_DEFAULT}/* /:splat 302`);

        await fs.writeFile('dist/client/_redirects', redirectsContent.join('\n'));

        console.log('Created _redirects file for Cloudflare Pages');

        // Create _headers file for Cloudflare Pages
        let headersContent = [
          '# Cache assets with a long TTL',
          '/assets/*',
          '  Cache-Control: public, max-age=31536000, immutable',
          '  Access-Control-Allow-Origin: *',
          '  X-Robots-Tag: nosnippet\n',
          '/*',
          '  Cache-Control: public, max-age=600',
          '  referrer-policy: strict-origin-when-cross-origin\n',
          '# Cache HTML files with a short TTL',
          '/*.html',
          '  Content-Type: text/html; charset=utf-8',
          '  Cache-Control: public, max-age=600',
          '\n',
        ].join('\n');

        headersContent += `# Language directories\n`;

        for (const lang of languages) {
          try {
            // Create directory if it doesn't exist
            await fs.mkdir(`dist/client/${lang}`, { recursive: true });

            // Check if the language index.html already exists (prerendered)
            const langIndexPath = `dist/client/${lang}/index.html`;

            try {
              // Check if file exists by trying to access it
              await fs.access(langIndexPath);

              headersContent += [`/${lang}/*`, `  Content-Language: ${lang}\n\n`].join('\n');

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
