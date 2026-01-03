import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs/promises";
import path from "path";
import { defineConfig } from "vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { LOCALES, LOCALE_DEFAULT } from "./src/constants/i18n";
import { getPageUrlFromPath } from "./src/lib/i18n";

const mainLanguageRoutes = [
  ...LOCALES.map(locale => getPageUrlFromPath(locale, "")),
];

const additionalPrerenderRoutes = [
  // Main language routes
  ...mainLanguageRoutes,

  // Experience pages
  ...LOCALES.map(locale => getPageUrlFromPath(locale, "experience")),

  // Projects pages
  ...LOCALES.map(locale => getPageUrlFromPath(locale, "projects")),

  // Skills pages
  ...LOCALES.map(locale => getPageUrlFromPath(locale, "skills")),

  // Recommendations pages
  ...LOCALES.map(locale => getPageUrlFromPath(locale, "recommendations")),
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // { enforce: "pre" },
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      additionalPrerenderRoutes,
    }),

    // Inject SEO meta tags into prerendered HTML files
    {
      name: "inject-seo-meta",
      async writeBundle() {
        // Process all prerendered HTML files and inject hreflang + structured data
        const routes = [
          { path: "", type: "home" as const },
          { path: "experience", type: "experience" as const },
          { path: "projects", type: "projects" as const },
          { path: "skills", type: "skills" as const },
          { path: "recommendations", type: "recommendations" as const },
        ];

        const WEBSITE_URL = "https://linkedin-roccorusso.work";

        for (const lang of LOCALES) {
          for (const route of routes) {
            const isDefault = lang === LOCALE_DEFAULT;
            const langPrefix = isDefault ? "" : `/${lang}`;
            const routePath = route.path ? `/${route.path}` : "";
            const filePath = `dist/client${langPrefix}${routePath}/index.html`;

            try {
              let html = await fs.readFile(filePath, "utf-8");

              // Generate hreflang tags
              const hreflangTags = LOCALES.map(l => {
                const href = `${WEBSITE_URL}${l === LOCALE_DEFAULT ? "" : `/${l}`}${routePath}`;
                return `<link rel="alternate" hreflang="${l}" href="${href}" />`;
              });
              hreflangTags.push(
                `<link rel="alternate" hreflang="x-default" href="${WEBSITE_URL}${routePath}" />`
              );

              // Generate canonical URL
              const canonicalUrl = `${WEBSITE_URL}${langPrefix}${routePath}`;

              // Replace existing canonical tag with the correct one for this page
              const canonicalRegex = /<link rel="canonical" href="[^"]*" >/;
              if (canonicalRegex.test(html)) {
                html = html.replace(
                  canonicalRegex,
                  `<link rel="canonical" href="${canonicalUrl}" >`
                );
              }

              // Generate structured data
              let structuredData = "";
              if (route.type === "home") {
                const personSchema = {
                  "@context": "https://schema.org",
                  "@type": "Person",
                  name: "Rocco Russo",
                  jobTitle: "Software Engineer / Tech Lead",
                  description:
                    "Software engineer with over 20 years of experience in front-end engineering, Web3 integrations, and full-stack development.",
                  url: WEBSITE_URL,
                  image: `${WEBSITE_URL}/assets/png/profile.png`,
                  sameAs: [
                    "https://github.com/xdemocle",
                    "https://linkedin.com/in/roccorusso",
                    "https://twitter.com/xdemocle",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Málaga",
                    addressRegion: "Andalusia",
                    addressCountry: "ES",
                  },
                  knowsAbout: [
                    "React",
                    "TypeScript",
                    "Blockchain",
                    "Web3",
                    "DeFi",
                    "Smart Contracts",
                  ],
                };
                structuredData = `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`;
              } else {
                const routeNames = {
                  experience: "Experience",
                  projects: "Projects",
                  skills: "Skills",
                  recommendations: "Recommendations",
                };
                const breadcrumbSchema = {
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: `${WEBSITE_URL}${langPrefix}`,
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name:
                        routeNames[route.type as keyof typeof routeNames] || "",
                      item: `${WEBSITE_URL}${langPrefix}${routePath}`,
                    },
                  ],
                };
                structuredData = `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;
              }

              // Create script to prevent layout flash by reading localStorage preference early
              const layoutPreferenceScript = `<script>
    (function() {
      try {
        const stored = localStorage.getItem("isLayoutLarge");
        const isLayoutLarge = stored ? JSON.parse(stored) : false;
        if (isLayoutLarge) {
          document.documentElement.classList.add("layout-large");
        }
      } catch (e) {
        // Silently fail if localStorage is not available
      }
    })();
  </script>`;

              // Inject before </head>
              const injection = `
    ${layoutPreferenceScript}
    ${hreflangTags.join("\n    ")}
    ${structuredData}
  `;
              html = html.replace("</head>", `${injection}\n  </head>`);

              await fs.writeFile(filePath, html);
              console.log(
                `✓ Injected SEO meta into ${lang}${routePath || "/"}`
              );
            } catch {
              // File might not exist for some routes, skip silently
            }
          }
        }
      },
    },

    // Automatize _header and _redirect of cloudflare pages
    // Create Cloudflare Pages configuration files for proper routing
    {
      name: "create-cloudflare-config",
      async writeBundle() {
        // Ensure each language directory has an index.html file
        const languages = LOCALES;

        // Create _redirects file
        const redirectsContent = [
          "# Handle language routes with trailing slash",
        ];

        // Add language-specific redirects to add trailing slash
        for (const lang of languages) {
          if (lang !== LOCALE_DEFAULT) {
            redirectsContent.push(`/${lang}  /${lang}/     301`);
          }
        }

        // Add catch-all for routes without trailing slash (but NOT for other languages)
        // This ensures /en/* routes work but doesn't interfere with /fr/*, /it/*, etc.
        redirectsContent.push(`/experience  /experience/     301`);
        redirectsContent.push(`/projects  /projects/     301`);
        redirectsContent.push(`/skills  /skills/     301`);
        redirectsContent.push(`/recommendations  /recommendations/     301`);

        await fs.writeFile(
          "dist/client/_redirects",
          redirectsContent.join("\n")
        );

        console.log("Created _redirects file for Cloudflare Pages");

        // Create _headers file for Cloudflare Pages
        let headersContent = [
          "# Cache assets with a long TTL",
          "/assets/*",
          "  Cache-Control: public, max-age=31536000, immutable",
          "  Access-Control-Allow-Origin: *",
          "  X-Robots-Tag: nosnippet\n",
          "/*",
          "  Cache-Control: public, max-age=600",
          "  referrer-policy: strict-origin-when-cross-origin\n",
          "# Cache HTML files with a short TTL",
          "/*.html",
          "  Content-Type: text/html; charset=utf-8",
          "  Cache-Control: public, max-age=600",
          "\n",
        ].join("\n");

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

              headersContent += [
                `/${lang}/*`,
                `  Content-Language: ${lang}\n\n`,
              ].join("\n");

              console.log(
                `Preserving existing prerendered content in ${lang}/index.html`
              );
            } catch (e: unknown) {
              console.error(e);

              // Only copy if the file doesn't exist (to preserve prerendered content)
              const indexContent = await fs.readFile(
                "dist/client/index.html",
                "utf-8"
              );
              await fs.writeFile(langIndexPath, indexContent);
              console.log(`Copied index.html to ${lang} directory`);
            }
          } catch (error) {
            console.error(
              `Error handling index.html for ${lang} directory:`,
              error
            );
          }
        }

        await fs.writeFile("dist/client/_headers", headersContent.trim());

        console.log("Created _headers file for Cloudflare Pages");
      },
    },
    {
      name: "ClosePlugin", // required, will show up in warnings and errors

      // use this to catch errors when building
      buildEnd(error) {
        if (error) {
          console.error("Error bundling");
          console.error(error);
          process.exit(1);
        } else {
          console.log("Build ended");
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
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist/client",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
