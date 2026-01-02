import { describe, expect, it } from "vitest";
import {
  getDirection,
  getLocaleFromPath,
  getPageUrlFromPath,
  isRTL,
} from "../../lib/i18n";
import {
  mockDirectionCases,
  mockUrlGenerationCases,
  mockUrlTestCases,
} from "../utils/mock-data";

describe("i18n utilities", () => {
  describe("getLocaleFromPath", () => {
    it.each(mockUrlTestCases)(
      "should detect locale correctly for path: $input",
      ({ input, expected }) => {
        const result = getLocaleFromPath(input);
        expect(result).toBe(expected);
      }
    );

    it("should handle edge cases", () => {
      // Empty string should return null (not a valid path)
      expect(getLocaleFromPath("")).toBe(null);

      // Multiple slashes
      expect(getLocaleFromPath("//it//experience")).toBe("it");

      // Hash fragments (should be handled by router, but function should still work)
      expect(getLocaleFromPath("/es/projects#section")).toBe("es");

      // Case sensitivity - locales are case sensitive
      expect(getLocaleFromPath("/IT/experience")).toBe(null);
    });
  });

  describe("getPageUrlFromPath", () => {
    it.each(mockUrlGenerationCases)(
      "should generate correct URL for locale: $locale, page: $page",
      ({ locale, page, expected }) => {
        const result = getPageUrlFromPath(locale, page);
        expect(result).toBe(expected);
      }
    );

    it("should handle double slashes correctly", () => {
      // This tests the replaceAll('//', '/') logic
      expect(getPageUrlFromPath("it", "/")).toBe("/it/");
      expect(getPageUrlFromPath("en", "/")).toBe("/");
      expect(getPageUrlFromPath("fr", "")).toBe("/fr/");
    });

    it("should handle special characters in page names", () => {
      expect(getPageUrlFromPath("it", "page-with-dashes")).toBe(
        "/it/page-with-dashes"
      );
      expect(getPageUrlFromPath("en", "page_with_underscores")).toBe(
        "/page_with_underscores"
      );
      expect(getPageUrlFromPath("fr", "page123")).toBe("/fr/page123");
    });
  });

  describe("getDirection", () => {
    it.each(mockDirectionCases)(
      "should return correct direction for locale: $locale",
      ({ locale, expected }) => {
        const result = getDirection(locale);
        expect(result).toBe(expected);
      }
    );
  });

  describe("isRTL", () => {
    it("should correctly identify RTL locales", () => {
      expect(isRTL("ar")).toBe(true);
      expect(isRTL("en")).toBe(false);
      expect(isRTL("it")).toBe(false);
      expect(isRTL("fr")).toBe(false);
      expect(isRTL("es")).toBe(false);
    });
  });

  describe("URL consistency", () => {
    it("should maintain consistency between locale detection and URL generation for non-default locales", () => {
      // Only test non-default locales since English has special behavior
      const testCases = [
        { locale: "fr", page: "projects" },
        { locale: "ar", page: "about" },
      ] as const;

      testCases.forEach(({ locale, page }) => {
        const generatedUrl = getPageUrlFromPath(locale, page);
        const detectedLocale = getLocaleFromPath(generatedUrl);

        expect(detectedLocale).toBe(locale);
      });
    });

    it("should handle English (default locale) special case", () => {
      // English pages without locale prefix should return null from getLocaleFromPath
      // because they don't have a locale prefix, except for root path
      expect(getLocaleFromPath("/experience")).toBe(null);
      expect(getLocaleFromPath("/projects")).toBe(null);

      // But root path should return 'en'
      expect(getLocaleFromPath("/")).toBe("en");

      // This is the expected behavior for the default locale system
    });

    it("should handle home page consistency correctly", () => {
      // Special case: English home page
      const enHomeUrl = getPageUrlFromPath("en", "");
      expect(enHomeUrl).toBe("/");
      expect(getLocaleFromPath(enHomeUrl)).toBe("en");

      // Other locales home pages
      const itHomeUrl = getPageUrlFromPath("it", "");
      expect(itHomeUrl).toBe("/it/");
      expect(getLocaleFromPath(itHomeUrl)).toBe("it");

      const arHomeUrl = getPageUrlFromPath("ar", "");
      expect(arHomeUrl).toBe("/ar/");
      expect(getLocaleFromPath(arHomeUrl)).toBe("ar");
    });

    it("should handle root path special case", () => {
      // Root should always detect as default locale
      expect(getLocaleFromPath("/")).toBe("en");

      // But generating URL for default locale with empty page should be root
      expect(getPageUrlFromPath("en", "")).toBe("/");
      expect(getPageUrlFromPath("en", "/")).toBe("/");
    });
  });
});
