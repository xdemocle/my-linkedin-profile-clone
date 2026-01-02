import { useMemo } from "react";
import { useLocale, useTranslations } from "use-intl";
import resumeDataAR from "../data/resume-ar.json";
import resumeDataEN from "../data/resume-en.json";
import resumeDataES from "../data/resume-es.json";
import resumeDataFR from "../data/resume-fr.json";
import resumeDataIT from "../data/resume-it.json";
import skillsData from "../data/skills.json";
import type { JSONResume } from "../types/json-resume";
import type {
  Achievement,
  Certification,
  Education,
  Experience,
  Interest,
  PersonalInfo,
  ProfileData,
  Project,
  Skill,
} from "../types/profile";

/**
 * Adapter hook that converts JSON Resume format to ProfileData format
 * This allows gradual migration while maintaining backward compatibility
 */
export function useJSONResumeAdapter(): ProfileData {
  const tPersonal = useTranslations("ProfileData.personal");
  const tAchievements = useTranslations("ProfileData.achievements");
  const tCertifications = useTranslations("ProfileData.certifications");
  const tEducation = useTranslations("ProfileData.education");
  const locale = useLocale();

  // Dynamically load resume data based on locale
  const resumeDataMap: Record<string, JSONResume> = {
    en: resumeDataEN as JSONResume,
    it: resumeDataIT as JSONResume,
    fr: resumeDataFR as JSONResume,
    ar: resumeDataAR as JSONResume,
    es: resumeDataES as JSONResume,
  };

  const resume = useMemo(() => {
    const localeResume = resumeDataMap[locale] || (resumeDataEN as JSONResume);
    return deepMerge(resumeDataEN as JSONResume, localeResume);
  }, [locale]);

  return useMemo(() => {
    // Map basics to PersonalInfo
    const personal: PersonalInfo = {
      name: resume.basics?.name || "",
      title: resume.basics?.label || "",
      headline: tPersonal("headline"),
      location: resume.basics?.location
        ? `${resume.basics.location.city}, ${resume.basics.location.region}, ${resume.basics.location.countryCode}`
        : "",
      website: resume.basics?.url,
      github: resume.basics?.profiles?.find(p => p.network === "GitHub")?.url,
      email: resume.basics?.email || "",
      phone: resume.basics?.phone,
      avatar: resume.basics?.image || "",
      about: resume.basics?.summary || "",
    };

    // Map work to Experience[]
    const experience: Experience[] =
      resume.work?.map((job, index) => {
        // Extract company logo from existing data structure
        const logoMap: Record<string, string> = {
          "The Web3 Ninja": "/assets/exp/web3ninja_logo.jpg",
          "Games Global": "/assets/exp/gamesglobal_logo.jpg",
          "Shiba Inu": "/assets/exp/shibainu_logo.jpg",
          "Ajna Labs": "/assets/exp/ajna_logo.jpg",
          "Linum Labs": "/assets/exp/linum_logo.jpg",
          "Omnia DeFi": "/assets/exp/omnia_logo.jpg",
          HCLTech: "/assets/exp/hcltech_logo.jpg",
          Elsevier: "/assets/exp/elsevier_logo.jpg",
          AdForum: "/assets/exp/adforum_logo.jpg",
        };

        // Format date range
        const startDate = job.startDate
          ? new Date(job.startDate).toLocaleDateString(locale, {
              month: "2-digit",
              year: "numeric",
            })
          : "";
        const endDate =
          job.endDate && job.endDate !== ""
            ? new Date(job.endDate).toLocaleDateString(locale, {
                month: "2-digit",
                year: "numeric",
              })
            : locale === "en"
              ? "Present"
              : locale === "it"
                ? "Attuale"
                : locale === "fr"
                  ? "Présent"
                  : locale === "es"
                    ? "Presente"
                    : "حالي";
        const dateRange = `${startDate} - ${endDate}`;

        return {
          id: `exp${index + 1}`,
          company: job.name || "",
          position: job.position || "",
          dateRange,
          location: job.location,
          description: job.summary || "",
          highlights: job.highlights || [],
          logo: logoMap[job.name || ""] || "",
          metadata: {
            featured: index < 3, // First 3 are featured
            order: index + 1,
          },
        };
      }) || [];

    // Map projects to Project[]
    const projects: Project[] =
      resume.projects?.map((proj, index) => {
        // Generate icon based on project type
        const iconMap: Record<string, string> = {
          "Ajna Labs - DeFi DApp + SDK": "blue-circle",
          "Mode Network - Large-scale React Refactoring": "lightning",
          "GamesGlobal - Lotsaloot Progressive Jackpot Slot Machines": "game",
          "Landworks by EnterDAO - Metaverse Rental System": "building",
          "Omnia DeFi - Dapp Dashboard for Real World Assets": "home",
          "Lokr.io (former Polkalokr) - Marketing website": "mail",
          "AltCash - B2C Crypto Exchanger": "github",
          "CyberGrandpa Anti-Fraud - Browser Extension": "github",
          "LinkedIn Full Width - UI Enhancement Extension": "code",
          "Tetris with Crypto Rewards - Telegram Mini App": "code",
        };

        return {
          id: proj.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "",
          title: proj.name || "",
          description: proj.description || "",
          role: proj.roles?.[0] || null,
          company: null,
          links: {
            website: proj.url || undefined,
            github: undefined,
          },
          technologies: proj.keywords || [],
          icon: iconMap[proj.name || ""] || "code",
          imageUrl: null,
          metadata: {
            featured: index < 5, // First 5 are featured
            order: index + 1,
          },
        };
      }) || [];

    // Map skills to Skill[] using skills.json for levels
    const skills: Skill[] =
      resume.skills?.map(skillCategory => {
        // Find matching category in skillsData
        const categoryData = skillsData.find(
          data =>
            data.categoryKey ===
            skillCategory.name
              ?.toLowerCase()
              .replace(/ & /g, "-and-")
              .replace(/ /g, "-")
        );

        if (categoryData && skillCategory.keywords) {
          return {
            category: skillCategory.name || "",
            items: skillCategory.keywords.map(keyword => {
              const item = categoryData.items.find(i => i.name === keyword);
              return {
                name: keyword,
                level: item
                  ? item.level
                  : getLevelFromString(skillCategory.level || ""),
              };
            }),
          };
        }

        return {
          category: skillCategory.name || "",
          items:
            skillCategory.keywords?.map(keyword => ({
              name: keyword,
              level: getLevelFromString(skillCategory.level || ""),
            })) || [],
        };
      }) || [];

    // Map education to Education[]
    const education: Education[] =
      resume.education?.map(edu => {
        const startYear = edu.startDate
          ? new Date(edu.startDate).getFullYear()
          : "";
        const endYear = edu.endDate ? new Date(edu.endDate).getFullYear() : "";
        const dateRange = `${startYear} - ${endYear}`;

        return {
          institution: edu.institution || "",
          degree: `${edu.studyType || ""} in ${edu.area || ""}`,
          location: tEducation("edu1.location"),
          dateRange,
          logo: "/assets/png/athena-logo.png",
        };
      }) || [];

    // Map certificates to Certification[]
    const certifications: Certification[] =
      resume.certificates?.map(cert => ({
        name: cert.name || "",
        issuer: cert.issuer || "",
        dateIssued: cert.date || "",
        link: cert.url,
      })) || [];

    // Map awards to Achievement[]
    const achievements: Achievement[] =
      resume.awards?.map((award, index) => ({
        id: `ach${index + 1}`,
        title: award.title || "",
        description: award.summary || "",
      })) || [];

    // Map interests to Interest[]
    const interests: Interest[] =
      resume.interests?.map(interest => ({
        name: interest.name || "",
        keywords: interest.keywords || [],
      })) || [];

    return {
      personal,
      experience,
      projects,
      skills,
      education,
      certifications,
      achievements,
      interests,
    };
  }, [resume, tPersonal, tAchievements, tCertifications, tEducation, locale]);
}

/**
 * Convert skill level string to numeric value
 */
function getLevelFromString(level: string): number {
  const levelMap: Record<string, number> = {
    beginner: 30,
    intermediate: 60,
    advanced: 85,
    expert: 95,
    master: 100,
    esperto: 95,
    experto: 95,
    خبير: 95,
  };

  return levelMap[level.toLowerCase()] || 70;
}

function deepMerge<T>(base: T, override: T): T {
  if (Array.isArray(base) && Array.isArray(override)) {
    if (override.length === 0 && base.length > 0) {
      return base;
    }

    return override as T;
  }

  if (
    typeof base === "object" &&
    base !== null &&
    typeof override === "object" &&
    override !== null &&
    !Array.isArray(base) &&
    !Array.isArray(override)
  ) {
    const result: Record<string, unknown> = {
      ...(base as Record<string, unknown>),
    };
    for (const [key, overrideValue] of Object.entries(
      override as Record<string, unknown>
    )) {
      const baseValue = (base as Record<string, unknown>)[key];
      if (baseValue === undefined) {
        result[key] = overrideValue;
        continue;
      }

      result[key] = deepMerge(baseValue, overrideValue);
    }
    return result as T;
  }

  return (override ?? base) as T;
}
