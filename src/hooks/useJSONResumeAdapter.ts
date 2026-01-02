import { useMemo } from 'react';
import { useTranslations } from 'use-intl';
import resumeData from '../data/resume.json';
import skillsData from '../data/skills.json';
import type { JSONResume } from '../types/json-resume';
import type {
  Achievement,
  Certification,
  Education,
  Experience,
  PersonalInfo,
  ProfileData,
  Project,
  Skill,
} from '../types/profile';

/**
 * Adapter hook that converts JSON Resume format to ProfileData format
 * This allows gradual migration while maintaining backward compatibility
 */
export function useJSONResumeAdapter(): ProfileData {
  const tPersonal = useTranslations('ProfileData.personal');
  const tAchievements = useTranslations('ProfileData.achievements');
  const tCertifications = useTranslations('ProfileData.certifications');
  const tEducation = useTranslations('ProfileData.education');

  const resume = resumeData as JSONResume;

  return useMemo(() => {
    // Map basics to PersonalInfo
    const personal: PersonalInfo = {
      name: resume.basics?.name || '',
      title: resume.basics?.label || '',
      headline: tPersonal('headline'),
      location:
        resume.basics?.location ?
          `${resume.basics.location.city}, ${resume.basics.location.region}, ${resume.basics.location.countryCode}`
        : '',
      website: resume.basics?.url,
      github: resume.basics?.profiles?.find(p => p.network === 'GitHub')?.url,
      email: resume.basics?.email || '',
      phone: resume.basics?.phone,
      avatar: resume.basics?.image || '',
      about: resume.basics?.summary || '',
    };

    // Map work to Experience[]
    const experience: Experience[] =
      resume.work?.map((job, index) => {
        // Extract company logo from existing data structure
        const logoMap: Record<string, string> = {
          'The Web3 Ninja': '/assets/exp/web3ninja_logo.jpg',
          'Games Global': '/assets/exp/gamesglobal_logo.jpg',
          'Shiba Inu': '/assets/exp/shibainu_logo.jpg',
          'Ajna Labs': '/assets/exp/ajna_logo.jpg',
          'Linum Labs': '/assets/exp/linum_logo.jpg',
          'Omnia DeFi': '/assets/exp/omnia_logo.jpg',
          HCLTech: '/assets/exp/hcltech_logo.jpg',
          Elsevier: '/assets/exp/elsevier_logo.jpg',
          AdForum: '/assets/exp/adforum_logo.jpg',
        };

        // Format date range
        const startDate =
          job.startDate ?
            new Date(job.startDate).toLocaleDateString('en-US', {
              month: '2-digit',
              year: 'numeric',
            })
          : '';
        const endDate =
          job.endDate && job.endDate !== '' ?
            new Date(job.endDate).toLocaleDateString('en-US', {
              month: '2-digit',
              year: 'numeric',
            })
          : 'Present';
        const dateRange = `${startDate} - ${endDate}`;

        return {
          id: `exp${index + 1}`,
          company: job.name || '',
          position: job.position || '',
          dateRange,
          location: job.location,
          description: job.summary || '',
          highlights: job.highlights || [],
          logo: logoMap[job.name || ''] || '',
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
          'Ajna Labs - DeFi DApp + SDK': 'blue-circle',
          'Mode Network - Large-scale React Refactoring': 'lightning',
          'GamesGlobal - Lotsaloot™ Progressive Jackpot Slot Machines': 'game',
          'Landworks by EnterDAO - Metaverse Rental System': 'building',
          'Omnia DeFi - Dapp Dashboard for Real World Assets': 'home',
          'Lokr.io (former Polkalokr) - Marketing website': 'mail',
          'AltCash - B2C Crypto Exchanger': 'github',
          'CyberGrandpa Anti-Fraud - Browser Extension': 'github',
          'LinkedIn Full Width - UI Enhancement Extension': 'code',
          'Tetris with Crypto Rewards - Telegram Mini App': 'code',
        };

        return {
          id: proj.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
          title: proj.name || '',
          description: proj.description || '',
          role: proj.roles?.[0] || null,
          company: null,
          links: {
            website: proj.url || undefined,
            github: undefined,
          },
          technologies: proj.keywords || [],
          icon: iconMap[proj.name || ''] || 'code',
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
          data => data.categoryKey === skillCategory.name?.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')
        );

        if (categoryData && skillCategory.keywords) {
          return {
            category: skillCategory.name || '',
            items: skillCategory.keywords.map(keyword => {
              const item = categoryData.items.find(i => i.name === keyword);
              return {
                name: keyword,
                level: item ? item.level : getLevelFromString(skillCategory.level || ''),
              };
            }),
          };
        }

        return {
          category: skillCategory.name || '',
          items:
            skillCategory.keywords?.map(keyword => ({
              name: keyword,
              level: getLevelFromString(skillCategory.level || ''),
            })) || [],
        };
      }) || [];

    // Map education to Education[]
    const education: Education[] =
      resume.education?.map(edu => {
        const startYear = edu.startDate ? new Date(edu.startDate).getFullYear() : '';
        const endYear = edu.endDate ? new Date(edu.endDate).getFullYear() : '';
        const dateRange = `${startYear} - ${endYear}`;

        return {
          institution: edu.institution || '',
          degree: `${edu.studyType || ''} in ${edu.area || ''}`,
          location: tEducation('edu1.location'),
          dateRange,
          logo: '/assets/png/athena-logo.png',
        };
      }) || [];

    // Map certificates to Certification[]
    const certifications: Certification[] =
      resume.certificates?.map(cert => ({
        name: cert.name || '',
        issuer: cert.issuer || '',
        dateIssued: cert.date || '',
        link: cert.url,
      })) || [];

    // Map awards to Achievement[]
    const achievements: Achievement[] =
      resume.awards?.map((award, index) => ({
        id: `ach${index + 1}`,
        title: award.title || '',
        description: award.summary || '',
      })) || [];

    return {
      personal,
      experience,
      projects,
      skills,
      education,
      certifications,
      achievements,
    };
  }, [resume, tPersonal, tAchievements, tCertifications, tEducation]);
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
  };

  return levelMap[level.toLowerCase()] || 70;
}
