import { useMemo } from 'react';
import { useTranslations } from 'use-intl';
import { profileData } from '../data/profile-data';
import type { ProfileData, Experience, Project, Skill, Achievement, Education } from '../types/profile';

/**
 * Hook for accessing profile data with appropriate localization.
 * Now reads from translation files for multilingual support.
 */
export function useProfileData(): ProfileData {
  const tPersonal = useTranslations('ProfileData.personal');
  const tExperience = useTranslations('ProfileData.experience');
  const tProjects = useTranslations('ProfileData.projects');
  const tSkills = useTranslations('ProfileData.skills');
  const tEducation = useTranslations('ProfileData.education');
  const tCertifications = useTranslations('ProfileData.certifications');
  const tAchievements = useTranslations('ProfileData.achievements');
  const tCommon = useTranslations('Common');

  // Return memoized data to prevent unnecessary re-renders
  return useMemo(() => {
    // Build experience array from translations
    const experience: Experience[] = ['exp1', 'exp2', 'exp3', 'exp4', 'exp5', 'exp6', 'exp7', 'exp8', 'exp9'].map((key, index) => ({
      id: key,
      company: tExperience(`${key}.company`),
      position: tExperience(`${key}.position`),
      dateRange: tExperience(`${key}.dateRange`),
      description: tExperience(`${key}.description`),
      highlights: tExperience.raw(`${key}.highlights`) as string[],
      logo: profileData.experience[index]?.logo || '/assets/png/default-logo.png',
    }));

    // Build projects array from translations
    const projects: Project[] = ['proj1', 'proj2', 'proj3', 'proj4', 'proj5'].map((key, index) => ({
      id: key,
      name: tProjects(`${key}.name`),
      description: tProjects(`${key}.description`),
      link: profileData.projects[index]?.link || '',
      imageUrl: profileData.projects[index]?.imageUrl || '',
      tags: profileData.projects[index]?.tags || [],
      sourceCode: profileData.projects[index]?.sourceCode,
    }));

    // Build skills array with translated categories
    const skills: Skill[] = [
      {
        category: tSkills('categories.frontend'),
        items: profileData.skills[0]?.items || [],
      },
      {
        category: tSkills('categories.backend'),
        items: profileData.skills[1]?.items || [],
      },
      {
        category: tSkills('categories.devopsCloud'),
        items: profileData.skills[2]?.items || [],
      },
      {
        category: tSkills('categories.web3AI'),
        items: profileData.skills[3]?.items || [],
      },
      {
        category: tSkills('categories.toolsTesting'),
        items: profileData.skills[4]?.items || [],
      },
    ];

    // Build education array from translations
    const education: Education[] = [{
      institution: tEducation('edu1.institution'),
      degree: tEducation('edu1.degree'),
      location: tEducation('edu1.location'),
      dateRange: tEducation('edu1.dateRange'),
      logo: profileData.education[0]?.logo || '/assets/png/default-logo.png',
    }];

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
        name: tCommon('profileName'),
        title: tPersonal('title'),
        headline: tPersonal('headline'),
        location: tPersonal('location'),
        website: profileData.personal.website,
        github: profileData.personal.github,
        email: profileData.personal.email,
        avatar: profileData.personal.avatar,
        about: tPersonal('about'),
      },
      experience,
      projects,
      skills,
      education,
      certifications,
      achievements,
    };
  }, [tPersonal, tExperience, tProjects, tSkills, tEducation, tCertifications, tAchievements, tCommon]);
}
