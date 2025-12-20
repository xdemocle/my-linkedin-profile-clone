import { LOCALE_DEFAULT, LOCALES, WEBSITE_URL } from "@/constants";
import { useProfileData } from "@/hooks";
import { useLocale } from "@/hooks/useLocale";
import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "profile" | "article";
  path?: string;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  image = "/assets/png/og-image.png",
  type = "profile",
  path = "",
  noindex = false,
}: SEOProps) {
  const { locale } = useLocale();
  const { personal } = useProfileData();

  // Default values from profile data
  const defaultTitle = `${personal.name} | ${personal.title}`;
  const defaultDescription = personal.about;
  const siteUrl = WEBSITE_URL;

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const canonicalUrl = `${siteUrl}${locale === LOCALE_DEFAULT ? "" : `/${locale}`}${path}`;

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      isProperty = false,
    ) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", pageDescription);
    updateMetaTag(
      "keywords",
      "software engineer, tech lead, blockchain, web3, react, typescript, full-stack developer",
    );
    updateMetaTag("author", personal.name);

    // Open Graph tags
    updateMetaTag("og:title", pageTitle, true);
    updateMetaTag("og:description", pageDescription, true);
    updateMetaTag("og:image", pageImage, true);
    updateMetaTag("og:url", canonicalUrl, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", personal.name, true);
    updateMetaTag("og:locale", locale.replace("-", "_"), true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", pageTitle);
    updateMetaTag("twitter:description", pageDescription);
    updateMetaTag("twitter:image", pageImage);
    updateMetaTag("twitter:creator", "@xdemocle"); // Update with actual Twitter handle

    // Robots meta tag
    if (noindex) {
      updateMetaTag("robots", "noindex, nofollow");
    } else {
      updateMetaTag(
        "robots",
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      );
    }

    // Update canonical link
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Update or create alternate language links (hreflang)
    const existingAlternates = document.querySelectorAll(
      'link[rel="alternate"]',
    );
    existingAlternates.forEach((link) => link.remove());

    LOCALES.forEach((lang) => {
      const alternate = document.createElement("link");
      alternate.rel = "alternate";
      alternate.hreflang = lang;
      alternate.href = `${siteUrl}${lang === LOCALE_DEFAULT ? "" : `/${lang}`}${path}`;
      document.head.appendChild(alternate);
    });

    // Add x-default hreflang
    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = `${siteUrl}${path}`;
    document.head.appendChild(xDefault);

    // Update language attribute on html element
    document.documentElement.lang = locale;
  }, [
    pageTitle,
    pageDescription,
    pageImage,
    canonicalUrl,
    locale,
    path,
    type,
    noindex,
    personal.name,
    siteUrl,
  ]);

  return null;
}
