import { useMemo } from 'react';
import { useTranslations } from 'use-intl';
import { staticAssets } from '../data/static-assets';
import type { Achievement, Education, Experience, ProfileData, Project, Skill } from '../types/profile';

/**
 * Hook for accessing profile data with appropriate localization.
 * Combines static assets with translated content.
 */
export function useProfileData(): ProfileData {
  const tPersonal = useTranslations('ProfileData.personal');
  const tExperience = useTranslations('ProfileData.experience');
  const tProjects = useTranslations('ProfileData.projects');
  const tSkills = useTranslations('ProfileData.skills');
  const tEducation = useTranslations('ProfileData.education');
  const tCertifications = useTranslations('ProfileData.certifications');
  const tAchievements = useTranslations('ProfileData.achievements');

  // Return memoized data to prevent unnecessary re-renders
  return useMemo(() => {
    // Build experience array from translations + static logos
    const experience: Experience[] = ['exp1', 'exp2', 'exp3', 'exp4', 'exp5', 'exp6', 'exp7', 'exp8', 'exp9'].map(
      key => ({
        id: key,
        company: tExperience(`${key}.company`),
        position: tExperience(`${key}.position`),
        dateRange: tExperience(`${key}.dateRange`),
        description: tExperience(`${key}.description`),
        highlights: tExperience.raw(`${key}.highlights`) as string[],
        logo: staticAssets.experienceLogos[key as keyof typeof staticAssets.experienceLogos],
      })
    );

    // Build projects array from translations + static assets
    const projects: Project[] = (['proj1', 'proj2', 'proj3', 'proj4', 'proj5'] as const).map(key => {
      const staticData = staticAssets.projects[key];
      return {
        id: key,
        name: tProjects(`${key}.name`),
        description: tProjects(`${key}.description`),
        link: staticData.link,
        imageUrl: staticData.imageUrl,
        tags: staticData.tags,
        sourceCode: 'sourceCode' in staticData ? staticData.sourceCode : undefined,
      };
    });

    // Build skills array with translated categories + static skill items
    const skills: Skill[] = [
      {
        category: tSkills('categories.frontend'),
        items: staticAssets.skills[0],
      },
      {
        category: tSkills('categories.frontend'),
        items: staticAssets.skills[1],
      },
      {
        category: tSkills('categories.backend'),
        items: staticAssets.skills[1],
      },
      {
        category: tSkills('categories.backend'),
        items: staticAssets.skills[2],
      },
      {
        category: tSkills('categories.devopsCloud'),
        items: staticAssets.skills[2],
      },
      {
        category: tSkills('categories.web3AI'),
        items: staticAssets.skills[3],
      },
      {
        category: tSkills('categories.toolsTesting'),
        items: staticAssets.skills[4],
      },
    ];

    // Build education array from translations + static logo
    const education: Education[] = [
      {
        institution: tEducation('edu1.institution'),
        degree: tEducation('edu1.degree'),
        location: tEducation('edu1.location'),
        dateRange: tEducation('edu1.dateRange'),
        logo: staticAssets.educationLogos.edu1,
      },
    ];

    // Build certifications array from translations
    const certifications = ['cert1', 'cert2', 'cert3'].map(key => ({
      name: tCertifications(`${key}.name`),
      issuer: tCertifications(`${key}.issuer`),
      dateIssued: tCertifications(`${key}.dateIssued`),
    }));

    // Build achievements array from translations
    const achievements: Achievement[] = ['ach1', 'ach2', 'ach3', 'ach4', 'ach5', 'ach6'].map(key => ({
      id: key,
      title: tAchievements(`${key}.title`),
      description: tAchievements(`${key}.description`),
    }));

    return {
      personal: {
        name: staticAssets.personal.name,
        title: tPersonal('title'),
        headline: tPersonal('headline'),
        location: tPersonal('location'),
        website: staticAssets.personal.website,
        github: staticAssets.personal.github,
        email: staticAssets.personal.email,
        phone: staticAssets.personal.phone,
        avatar: staticAssets.personal.avatar,
        about: tPersonal('about'),
      },
      experience,
      projects,
      skills,
      education,
      certifications,
      achievements,
    };
  }, [tPersonal, tExperience, tProjects, tSkills, tEducation, tCertifications, tAchievements]);
}
