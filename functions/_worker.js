// Define supported languages
const LANGUAGES = ['en', 'it', 'fr', 'es', 'ar'];
const DEFAULT_LANGUAGE = 'en';

// Helper function to determine if a path is a language route
function isLanguageRoute(path) {
  // Check if the path starts with a language code
  for (const lang of LANGUAGES) {
    if (path === `/${lang}` || path.startsWith(`/${lang}/`)) {
      return true;
    }
  }
  return false;
}

// Helper function to extract language from path
function getLanguageFromPath(path) {
  // Extract the first segment after the leading slash
  const match = path.match(/^\/([^\/]+)/);
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
      return Response.redirect(`${url.origin}/${DEFAULT_LANGUAGE}/`, 302);
    }

    // Handle language routes
    if (isLanguageRoute(path)) {
      const language = getLanguageFromPath(path);

      // Ensure trailing slash for language root
      if (path === `/${language}`) {
        return Response.redirect(`${url.origin}/${language}/`, 301);
      }

      // Serve the language-specific index.html
      try {
        // Get the HTML content from KV or Assets
        const htmlContent = await env.ASSETS.fetch(`${url.origin}/${language}/index.html`);

        // Return the HTML with appropriate headers
        return new Response(htmlContent.body, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Content-Language': language,
            'Cache-Control': 'public, max-age=600',
          },
        });
      } catch (error) {
        console.error(`Error serving ${language} content:`, error);
      }
    }

    // For all other requests, try to serve from assets
    try {
      return await env.ASSETS.fetch(request);
    } catch (error) {
      // If asset not found, serve the default language index
      return Response.redirect(`${url.origin}/${DEFAULT_LANGUAGE}/`, 302);
    }
  },
};
