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

        // Concise, page-specific meta descriptions (<160 chars) injected into
        // every prerendered page. Without this, all pages inherit the single
        // long (346 char) description from index.html → "description too long".
        const descriptions: Record<string, string> = {
          home: "Rocco Russo — software engineer and tech lead with 10+ years in React, TypeScript, Web3 and DeFi, building scalable apps for 5M+ monthly users.",
          experience:
            "The professional experience of Rocco Russo: 10+ years leading frontend, Web3 and full-stack teams across DeFi, blockchain and high-traffic web apps.",
          projects:
            "Selected projects by Rocco Russo across DeFi, blockchain, smart contracts and modern web apps built with React, TypeScript and Next.js.",
          skills:
            "Technical skills of Rocco Russo: React, TypeScript, Next.js, Web3, smart contracts, DeFi, frontend architecture and AI integrations.",
          recommendations:
            "Professional recommendations and testimonials for Rocco Russo — software engineer and tech lead specialising in frontend, Web3 and DeFi.",
        };

        for (const lang of LOCALES) {
          for (const route of routes) {
            const isDefault = lang === LOCALE_DEFAULT;
            const langPrefix = isDefault ? "" : `/${lang}`;
            const routePath = route.path ? `/${route.path}` : "";
            const filePath = `dist/client${langPrefix}${routePath}/index.html`;

            try {
              let html = await fs.readFile(filePath, "utf-8");

              // Slash-free URL convention: canonical/hreflang have NO trailing
              // slash. The host serves /experience directly (the HTML is
              // flattened to experience.html post-build) and 301s /experience/
              // to it; the home is the bare origin. Everything must agree.

              // Generate hreflang tags (absolute, slash-free)
              const hreflangTags = LOCALES.map(l => {
                const href = `${WEBSITE_URL}${l === LOCALE_DEFAULT ? "" : `/${l}`}${routePath}`;
                return `<link rel="alternate" hreflang="${l}" href="${href}" />`;
              });
              hreflangTags.push(
                `<link rel="alternate" hreflang="x-default" href="${WEBSITE_URL}${routePath}" />`
              );

              // Generate canonical URL (absolute, slash-free)
              const canonicalUrl = `${WEBSITE_URL}${langPrefix}${routePath}`;

              // Replace existing canonical tag (tolerant of `" >` and `" />`)
              const canonicalRegex = /<link rel="canonical"[^>]*>/;
              if (canonicalRegex.test(html)) {
                html = html.replace(
                  canonicalRegex,
                  `<link rel="canonical" href="${canonicalUrl}" />`
                );
              }

              // Preload the LCP image with fetchpriority="high" so the
              // browser kicks off the request before parsing CSS. The
              // prerender plugin auto-emits the basic preload when it
              // sees the <img fetchpriority="high"> in the DOM, but
              // the priority hint doesn't always survive the rewrite
              // → we patch it in here too.
              const lcpPreloadRegex =
                /<link rel="preload" as="image" href="\/assets\/ui\/banner-1\.jpg"[^>]*>/;
              const lcpPreloadReplacement =
                '<link rel="preload" as="image" href="/assets/ui/banner-1.jpg" fetchpriority="high" />';
              if (lcpPreloadRegex.test(html)) {
                html = html.replace(lcpPreloadRegex, lcpPreloadReplacement);
              } else {
                html = html.replace(
                  "</head>",
                  `    ${lcpPreloadReplacement}\n  </head>`
                );
              }

              // Keep og:url / twitter:url in sync with the canonical
              html = html
                .replace(
                  /<meta property="og:url"[^>]*>/,
                  `<meta property="og:url" content="${canonicalUrl}" />`
                )
                .replace(
                  /<meta name="twitter:url"[^>]*>/,
                  `<meta name="twitter:url" content="${canonicalUrl}" />`
                );

              // Replace the long, shared meta description with a concise,
              // page-specific one (<160 chars). Fixes "description too long".
              const pageDescription = descriptions[route.type];
              if (pageDescription) {
                html = html
                  .replace(
                    /<meta name="description"[\s\S]*?\/?>/,
                    `<meta name="description" content="${pageDescription}" />`
                  )
                  .replace(
                    /<meta property="og:description"[\s\S]*?\/?>/,
                    `<meta property="og:description" content="${pageDescription}" />`
                  )
                  .replace(
                    /<meta name="twitter:description"[\s\S]*?\/?>/,
                    `<meta name="twitter:description" content="${pageDescription}" />`
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
                    "Software engineer with over 10+ years of experience in front-end engineering, Web3 integrations, and full-stack development.",
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

        // NOTE: _redirects is generated AFTER the build by
        // scripts/flatten-html.ts — it emits the reverse trailing-slash 301s
        // (/experience/ → /experience) for the flattened slash-free HTML.

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
                `/${lang}`,
                `  Content-Language: ${lang}`,
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
      name: "ClosePlugin",
      buildEnd(error) {
        if (error) {
          console.error("Error bundling");
          console.error(error);
          process.exit(1);
        }
      },
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
    // Disable code splitting for prerendered apps - causes SSR issues
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
