import type { ProfileData, Experience, Project, Education, Skill, Achievement } from '../types/profile';

/**
 * Static profile data - contains only non-translatable content
 * (URLs, logos, images, technical data)
 * All translatable text is in src/messages/*.json files
 */
export const profileData: ProfileData = {
  personal: {
    name: 'Rocco Russo',
    title: '', // From translations
    headline: '', // From translations
    location: '', // From translations
    website: 'https://rocco.me',
    github: 'https://github.com/xdemocle',
    email: 'hello@rocco.me',
    phone: '+39 379 263 0288',
    avatar: '/assets/png/rocco-me-nft.png',
    about: '', // From translations
  },
  
  experience: [
    {
      id: 'exp1',
      company: '', // From translations
      position: '', // From translations
      dateRange: '', // From translations
      type: '', // From translations
      location: '', // From translations
      description: '', // From translations
      highlights: [], // From translations
      logo: '/assets/png/web3ninja-logo.png',
    },
    {
      id: 'exp2',
      company: '', // From translations
      position: '', // From translations
      dateRange: '', // From translations
      location: '', // From translations
      description: '', // From translations
      highlights: [], // From translations
      logo: '/assets/png/gamesglobal-logo.png',
    },
    {
      id: 'exp3',
      company: '', // From translations
      position: '', // From translations
      dateRange: '', // From translations
      description: '', // From translations
      highlights: [], // From translations
      logo: '/assets/png/shibainu-logo.png',
    },
    {
      id: 'exp4',
      company: '', // From translations
      position: '', // From translations
      dateRange: '', // From translations
      description: '', // From translations
      highlights: [], // From translations
      logo: '/assets/png/ajna-logo.png',
    },
    {
      id: 'exp5',
      company: '', // From translations
      position: '', // From translations
      dateRange: '', // From translations
      description: '', // From translations
      highlights: [], // From translations
      logo: '/assets/png/linum-logo.png',
    },
    {
      id: 'exp6',
      company: '', // From translations
      position: '', // From translations
      dateRange: '', // From translations
      description: '', // From translations
      highlights: [], // From translations
      logo: '/assets/png/omnia-logo.png',
    },
    {
      id: 'exp7',
      company: '', // From translations
      position: '', // From translations
      dateRange: '', // From translations
      location: '', // From translations
      description: '', // From translations
      highlights: [], // From translations
      logo: '/assets/png/hcl-logo.png',
    },
    {
      id: 'exp8',
      company: '', // From translations
      position: '', // From translations
      dateRange: '', // From translations
      description: '', // From translations
      highlights: [], // From translations
      logo: '/assets/png/elsevier-logo.png',
    },
    {
      id: 'exp9',
      company: '', // From translations
      position: '', // From translations
      dateRange: '', // From translations
      description: '', // From translations
      highlights: [], // From translations
      logo: '/assets/png/adforum-logo.png',
    },
  ] as Experience[],

  projects: [
    {
      id: 'proj1',
      name: '', // From translations
      description: '', // From translations
      link: 'https://www.ajna.finance',
      imageUrl: '/assets/png/ajna-project.png',
      tags: ['React', 'TypeScript', 'Web3', 'DeFi', 'SDK'],
      sourceCode: 'https://github.com/ajna-finance',
    },
    {
      id: 'proj2',
      name: '', // From translations
      description: '', // From translations
      link: 'https://www.mode.network',
      imageUrl: '/assets/png/mode-project.png',
      tags: ['Next.js', 'React', 'TypeScript', 'Web3'],
    },
    {
      id: 'proj3',
      name: '', // From translations
      description: '', // From translations
      link: 'https://github.com/CyberGrandpas/cybergrandpa-web-extension-antifraud',
      imageUrl: '/assets/png/cybersec-project.png',
      tags: ['JavaScript', 'Extension', 'Security'],
      sourceCode: 'https://github.com/CyberGrandpas/cybergrandpa-web-extension-antifraud',
    },
    {
      id: 'proj4',
      name: '', // From translations
      description: '', // From translations
      link: 'https://github.com/xdemocle/tetris-mini-app',
      imageUrl: '/assets/png/tetris-project.png',
      tags: ['JavaScript', 'Gaming', 'Crypto', 'TON'],
      sourceCode: 'https://github.com/xdemocle/tetris-mini-app',
    },
    {
      id: 'proj5',
      name: '', // From translations
      description: '', // From translations
      link: 'https://chromewebstore.google.com/detail/linkedin-full-width/pijfcmadcbkcjdmajckndpccemdgebhn',
      imageUrl: '/assets/png/linkedin-project.png',
      tags: ['JavaScript', 'Extension', 'UI'],
      sourceCode: 'https://github.com/xdemocle/linkedin-full-width',
    },
  ] as Project[],

  skills: [
    {
      category: '', // From translations
      items: [
        { name: 'React', level: 95 },
        { name: 'Svelte', level: 90 },
        { name: 'TypeScript', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'Redux', level: 85 },
        { name: 'Zustand', level: 90 },
        { name: 'Wagmi', level: 85 },
        { name: 'Viem', level: 85 },
        { name: 'CSS-in-JS', level: 90 },
        { name: 'TailwindCSS', level: 95 },
        { name: 'Atomic Design', level: 90 },
      ],
    },
    {
      category: '', // From translations
      items: [
        { name: 'Node.js', level: 90 },
        { name: 'Express', level: 85 },
        { name: 'NestJS', level: 80 },
        { name: 'GraphQL', level: 85 },
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'Redis', level: 75 },
        { name: 'Flask', level: 70 },
        { name: 'Python', level: 75 },
      ],
    },
    {
      category: '', // From translations
      items: [
        { name: 'Docker', level: 85 },
        { name: 'Kubernetes', level: 75 },
        { name: 'CI/CD', level: 85 },
        { name: 'AWS', level: 80 },
        { name: 'GCP', level: 75 },
        { name: 'Vercel', level: 90 },
        { name: 'Heroku', level: 80 },
      ],
    },
    {
      category: '', // From translations
      items: [
        { name: 'Smart Contracts', level: 85 },
        { name: 'DeFi DApps', level: 90 },
        { name: 'SDK Development', level: 90 },
        { name: 'LLM Agents', level: 85 },
        { name: 'Prompt Engineering', level: 85 },
      ],
    },
    {
      category: '', // From translations
      items: [
        { name: 'GitHub', level: 95 },
        { name: 'GitLab', level: 85 },
        { name: 'Webpack', level: 85 },
        { name: 'Vite', level: 90 },
        { name: 'Figma', level: 80 },
        { name: 'Jest', level: 85 },
        { name: 'Vitest', level: 90 },
        { name: 'Selenium', level: 75 },
      ],
    },
  ] as Skill[],

  education: [
    {
      institution: '', // From translations
      degree: '', // From translations
      location: '', // From translations
      dateRange: '', // From translations
      logo: '/assets/png/athena-logo.png',
    },
  ] as Education[],

  certifications: [
    {
      name: '', // From translations
      issuer: '', // From translations
      dateIssued: '', // From translations
    },
    {
      name: '', // From translations
      issuer: '', // From translations
      dateIssued: '', // From translations
    },
    {
      name: '', // From translations
      issuer: '', // From translations
      dateIssued: '', // From translations
    },
  ],

  achievements: [
    {
      id: 'ach1',
      title: '', // From translations
      description: '', // From translations
    },
    {
      id: 'ach2',
      title: '', // From translations
      description: '', // From translations
    },
    {
      id: 'ach3',
      title: '', // From translations
      description: '', // From translations
    },
    {
      id: 'ach4',
      title: '', // From translations
      description: '', // From translations
    },
    {
      id: 'ach5',
      title: '', // From translations
      description: '', // From translations
    },
    {
      id: 'ach6',
      title: '', // From translations
      description: '', // From translations
    },
  ] as Achievement[],
};

export default profileData;
