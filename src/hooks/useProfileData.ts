import { useMemo } from 'react';
import { useTranslations } from 'use-intl';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import { staticAssets } from '../data/static-assets';
import type { Achievement, Education, Experience, ProfileData, Project, Skill } from '../types/profile';

/**
 * Hook for accessing profile data with appropriate localization.
 * Combines static assets with translated content.
 */
export function useProfileData(): ProfileData {
  const tPersonal = useTranslations('ProfileData.personal');
  const tSkills = useTranslations('ProfileData.skills');
  const tEducation = useTranslations('ProfileData.education');
  const tCertifications = useTranslations('ProfileData.certifications');
  const tAchievements = useTranslations('ProfileData.achievements');

  // Return memoized data to prevent unnecessary re-renders
  return useMemo(() => {
    // Use experience data from JSON file
    const experience: Experience[] = experienceData as Experience[];

    // Use projects data from JSON file
    const projects: Project[] = projectsData as Project[];

    // Build skills array with translated categories + static skill items
    const skillItems = skillsData as Skill['items'][];
    const skills: Skill[] = [
      {
        category: tSkills('categories.frontend'),
        items: skillItems[0],
      },
      {
        category: tSkills('categories.web3AI'),
        items: skillItems[3],
      },
      {
        category: tSkills('categories.backend'),
        items: skillItems[1],
      },
      {
        category: tSkills('categories.devopsCloud'),
        items: skillItems[2],
      },
      {
        category: tSkills('categories.toolsTesting'),
        items: skillItems[4],
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
  }, [tPersonal, tSkills, tEducation, tCertifications, tAchievements]);
}
