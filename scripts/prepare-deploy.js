// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define supported languages
const LANGUAGES = ['en', 'it', 'fr', 'es', 'ar'];
const DIST_DIR = path.join(__dirname, '..', 'dist', 'client');

/**
 * Ensures language directories exist and contain the correct index.html
 */
function prepareLanguageDirectories() {
  console.log('Preparing language directories...');

  try {
    // Check if language directories exist and have prerendered content
    for (const lang of LANGUAGES) {
      const langDir = path.join(DIST_DIR, lang);
      const langIndexPath = path.join(langDir, 'index.html');

      // Create directory if it doesn't exist
      if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
        console.log(`Created directory: ${langDir}`);

        // If the directory didn't exist, we need to create the index.html file
        // Use the base index.html as a fallback
        const indexPath = path.join(DIST_DIR, 'index.html');
        if (fs.existsSync(indexPath)) {
          const indexContent = fs.readFileSync(indexPath, 'utf-8');
          fs.writeFileSync(langIndexPath, indexContent);
          console.log(`Created ${langIndexPath} from base index.html`);
        } else {
          console.error('Error: index.html not found in dist directory');
        }
      } else {
        // Directory exists, check if index.html exists
        if (!fs.existsSync(langIndexPath)) {
          // If the language index.html doesn't exist, create it from the base index.html
          const indexPath = path.join(DIST_DIR, 'index.html');
          if (fs.existsSync(indexPath)) {
            const indexContent = fs.readFileSync(indexPath, 'utf-8');
            fs.writeFileSync(langIndexPath, indexContent);
            console.log(`Created ${langIndexPath} from base index.html`);
          } else {
            console.error('Error: index.html not found in dist directory');
          }
        } else {
          console.log(`Preserving existing prerendered content in ${langIndexPath}`);
        }
      }
    }

    console.log('Language directories prepared successfully');
  } catch (error) {
    console.error('Error preparing language directories:', error);
    process.exit(1);
  }
}

/**
 * Creates Cloudflare Pages configuration files
 */
function createCloudflareConfig() {
  console.log('Creating Cloudflare Pages configuration files...');

  try {
    // Create _redirects file
    const redirectsContent = `
# Redirect root to default language
/  /en/  302

# Handle direct language access without trailing slash
/en  /en/  301
/it  /it/  301
/fr  /fr/  301
/es  /es/  301
/ar  /ar/  301

# Serve the correct index.html for each language path
/en/  /en/index.html  200
/it/  /it/index.html  200
/fr/  /fr/index.html  200
/es/  /es/index.html  200
/ar/  /ar/index.html  200

# Handle all other language-specific routes by serving the language's index.html
/en/*  /en/index.html  200  SPA
/it/*  /it/index.html  200  SPA
/fr/*  /fr/index.html  200  SPA
/es/*  /es/index.html  200  SPA
/ar/*  /ar/index.html  200  SPA
`;

    fs.writeFileSync(path.join(DIST_DIR, '_redirects'), redirectsContent.trim());
    console.log('Created _redirects file');

    // Create _routes.json file
    const routesConfig = {
      version: 1,
      include: ['/*'],
      exclude: [],
      routes: [
        // Root redirect
        { src: '/', dst: '/en/' },

        // Direct language access without trailing slash
        { src: '/en', dst: '/en/' },
        { src: '/it', dst: '/it/' },
        { src: '/fr', dst: '/fr/' },
        { src: '/es', dst: '/es/' },
        { src: '/ar', dst: '/ar/' },

        // Serve the correct index.html for each language path
        { src: '/en/', dst: '/en/index.html' },
        { src: '/it/', dst: '/it/index.html' },
        { src: '/fr/', dst: '/fr/index.html' },
        { src: '/es/', dst: '/es/index.html' },
        { src: '/ar/', dst: '/ar/index.html' },

        // Handle all other language-specific routes
        { src: '/en/*', dst: '/en/index.html' },
        { src: '/it/*', dst: '/it/index.html' },
        { src: '/fr/*', dst: '/fr/index.html' },
        { src: '/es/*', dst: '/es/index.html' },
        { src: '/ar/*', dst: '/ar/index.html' },
      ],
    };

    fs.writeFileSync(path.join(DIST_DIR, '_routes.json'), JSON.stringify(routesConfig, null, 2));
    console.log('Created _routes.json file');

    // Create _headers file
    const headersContent = `
# Cache assets with a long TTL
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache HTML files with a short TTL
/*.html
  Cache-Control: public, max-age=600

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
    fs.writeFileSync(path.join(DIST_DIR, '_headers'), headersContent.trim());
    console.log('Created _headers file');

    // Create _worker.js file for edge routing
    const workerContent = `
// Define supported languages
const LANGUAGES = ['en', 'it', 'fr', 'es', 'ar'];
const DEFAULT_LANGUAGE = 'en';

// Helper function to determine if a path is a language route
function isLanguageRoute(path) {
  // Check if the path starts with a language code
  for (const lang of LANGUAGES) {
    if (path === '/' + lang || path.startsWith('/' + lang + '/')) {
      return true;
    }
  }
  return false;
}

// Helper function to extract language from path
function getLanguageFromPath(path) {
  // Extract the first segment after the leading slash
  const match = path.match(/^\\/([^\\/]+)/);
  if (match && LANGUAGES.includes(match[1])) {
    return match[1];
  }
  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Handle root path - redirect to default language
    if (path === '/' || path === '') {
      return Response.redirect(url.origin + '/' + DEFAULT_LANGUAGE + '/', 302);
    }
    
    // Handle language routes
    if (isLanguageRoute(path)) {
      const language = getLanguageFromPath(path);
      
      // Ensure trailing slash for language root
      if (path === '/' + language) {
        return Response.redirect(url.origin + '/' + language + '/', 301);
      }
      
      // For asset requests, serve them directly
      if (path.includes('/assets/')) {
        try {
          return await env.ASSETS.fetch(request);
        } catch (error) {
          // Fall through to serving the index.html
        }
      }
      
      // For all other language-specific routes, serve the language's index.html
      try {
        const response = await env.ASSETS.fetch(url.origin + '/' + language + '/index.html');
        return new Response(response.body, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Content-Language': language,
            'Cache-Control': 'public, max-age=600'
          }
        });
      } catch (error) {
        console.error('Error serving ' + language + ' content:', error);
      }
    }
    
    // For all other requests, try to serve from assets
    try {
      return await env.ASSETS.fetch(request);
    } catch (error) {
      // If asset not found, serve the default language index
      return Response.redirect(url.origin + '/' + DEFAULT_LANGUAGE + '/', 302);
    }
  }
};
`;

    fs.writeFileSync(path.join(DIST_DIR, '_worker.js'), workerContent.trim());
    console.log('Created _worker.js file');
  } catch (error) {
    console.error('Error in language prerender plugin:', error);
  }
}

// Run the script
prepareLanguageDirectories();
createCloudflareConfig();
console.log('Deployment preparation completed successfully');
