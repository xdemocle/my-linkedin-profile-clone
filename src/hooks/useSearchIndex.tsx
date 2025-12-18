import { useMemo } from 'react';
import { useTranslations } from 'use-intl';
import Fuse from 'fuse.js';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'profile' | 'experience' | 'project' | 'skill' | 'recommendation' | 'page';
  url?: string;
  sectionId?: string;
}

export function useSearchIndex() {
  const tProfileHeader = useTranslations('ProfileHeader');
  const tAbout = useTranslations('About');
  const tExperience = useTranslations('Experience');
  const tProjects = useTranslations('Projects');
  const tSkills = useTranslations('Skills');
  const tRecommendations = useTranslations('Recommendations');
  const tNav = useTranslations('Navigation');
  const tCommon = useTranslations('Common');

  const searchData = useMemo<SearchResult[]>(() => {
    const data: SearchResult[] = [];

    // Profile information
    data.push({
      id: 'profile-header',
      title: tCommon('profileName'),
      description: tProfileHeader('fullStackEngineer'),
      category: 'profile',
      sectionId: 'profile-header',
    });

    // About section
    data.push({
      id: 'about-section',
      title: tAbout('title'),
      description: tAbout('firstParagraph'),
      category: 'profile',
      sectionId: 'about',
    });

    // Experience section
    data.push({
      id: 'experience-section',
      title: tExperience('title'),
      description: tExperience('description'),
      category: 'experience',
      url: '/experience',
      sectionId: 'experience',
    });

    // Add specific experience terms that users might search for
    const experienceTerms = [
      { term: 'technicalLead', desc: tExperience('ledFrontendDevelopment') },
      { term: 'frontendDeveloper', desc: tExperience('developedInteractiveUI') },
      { term: 'cyberSecurityOperations', desc: tExperience('createdDashboardInterfaces') },
    ];
    experienceTerms.forEach(({ term, desc }, index) => {
      data.push({
        id: `experience-term-${index}`,
        title: tExperience(term),
        description: desc,
        category: 'experience',
        url: '/experience',
        sectionId: 'experience',
      });
    });

    // Projects section
    data.push({
      id: 'projects-section',
      title: tProjects('title'),
      description: tProjects('featuredProjects'),
      category: 'project',
      url: '/projects',
      sectionId: 'projects',
    });

    // Add specific projects
    const projectTerms = ['ajnaLabs', 'modeNetwork', 'cyberGrandpa', 'tetrisCrypto', 'linkedinExtension'];
    projectTerms.forEach((term, index) => {
      data.push({
        id: `project-${index}`,
        title: tProjects(term),
        description: tProjects('seeAll'),
        category: 'project',
        url: '/projects',
        sectionId: 'projects',
      });
    });

    // Skills section
    data.push({
      id: 'skills-section',
      title: tSkills('title'),
      description: tSkills('frontendDevelopment'),
      category: 'skill',
      url: '/skills',
      sectionId: 'skills',
    });

    // Add common skills
    const skills = ['react', 'typescript', 'nextjs', 'nodejs', 'docker', 'aws', 'web3js', 'ethersjs'];
    skills.forEach((skill) => {
      data.push({
        id: `skill-${skill}`,
        title: tSkills(skill),
        description: `${tSkills(skill)} skill`,
        category: 'skill',
        url: '/skills',
        sectionId: 'skills',
      });
    });

    // Recommendations section
    data.push({
      id: 'recommendations-section',
      title: tRecommendations('title'),
      description: tRecommendations('exceptionalDeveloper'),
      category: 'recommendation',
      url: '/recommendations',
      sectionId: 'recommendations',
    });

    // Navigation pages
    const pages = [
      { key: 'home', url: '/', section: 'profile-header' },
      { key: 'experience', url: '/experience', section: 'experience' },
      { key: 'projects', url: '/projects', section: 'projects' },
      { key: 'skills', url: '/skills', section: 'skills' },
      { key: 'recommendations', url: '/recommendations', section: 'recommendations' },
    ];

    pages.forEach(({ key, url, section }) => {
      data.push({
        id: `page-${key}`,
        title: tNav(key),
        description: `Navigate to ${tNav(key)} page`,
        category: 'page',
        url,
        sectionId: section,
      });
    });

    return data;
  }, [tProfileHeader, tAbout, tExperience, tProjects, tSkills, tRecommendations, tNav, tCommon]);

  const fuse = useMemo(
    () =>
      new Fuse(searchData, {
        keys: ['title', 'description'],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
        ignoreLocation: true,
      }),
    [searchData]
  );

  return { searchData, fuse };
}
