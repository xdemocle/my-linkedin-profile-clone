import type { ProfileData, Experience, Project, Education, Skill, Achievement } from '../types/profile';

export const profileData: ProfileData = {
  personal: {
    name: 'Rocco Russo',
    title: 'Software Engineer / Tech Lead',
    headline: 'Blockchain & Dapps | Agentic AI | Cybersecurity Advocate',
    location: 'Apulia, Italy',
    website: 'https://rocco.me',
    github: 'https://github.com/xdemocle',
    email: 'hello@rocco.me',
    avatar: '/assets/png/rocco-me-nft.png',
    about: 'Software engineer with over 20 years of front-end experience, 5 years in Web3, and hands-on full-stack and AI agent integration expertise. I design, refactor, and ship products that merge blockchain transparency with real user value, from DeFi and RWA platforms to secure browser extensions and gamified apps. I lead small agile teams with a focus on mentorship, code quality, and long-term sustainability — not just delivery speed.',
  },
  
  experience: [
    {
      id: 'exp1',
      company: 'The Web3 Ninja',
      position: 'Lead Software Engineer, Web3',
      dateRange: '2024 - Present',
      description: 'Leading Web3 integration projects and mentoring junior developers.',
      highlights: [
        'Mentored 5 developers; placed 3 in junior roles.',
        'Built full-stack blockchain integrations for 3 DApps and Web2 apps.',
        'Optimized API communication, improving speed by 15% and cutting gas costs.',
      ],
      logo: '/assets/png/web3ninja-logo.png',
    },
    {
      id: 'exp2',
      company: 'Games Global',
      position: 'Lead Frontend Engineer',
      dateRange: '2023 - 2024',
      description: 'Leading front-end development for gaming platforms.',
      highlights: [
        'Delivered UI for Lotsaloot™, a three-tier jackpot system.',
        'Designed a fast-hitting reward loop to maximize engagement.',
        'Strengthened jackpot portfolios with consistent micro-reward feedback.',
      ],
      logo: '/assets/png/gamesglobal-logo.png',
    },
    {
      id: 'exp3',
      company: 'Shiba Inu',
      position: 'Tech Lead, Web3',
      dateRange: '2023',
      description: 'Led technical development for the Shiba Inu ecosystem.',
      highlights: [
        'Led a 12-member team, achieving a 30% productivity boost.',
        'Reduced bugs by 25% and raised code quality 40%.',
        'Supported 5M monthly users with 3k concurrent.',
      ],
      logo: '/assets/png/shibainu-logo.png',
    },
    {
      id: 'exp4',
      company: 'Ajna Labs',
      position: 'Lead Frontend Engineer',
      dateRange: '2022 - 2023',
      description: 'Leading front-end development for DeFi applications.',
      highlights: [
        'Launched SPA with $20M+ liquidity and SDK integration.',
        'Cut integration time by 50% and standardized design systems.',
        'Built a marketing site that drew 10k+ unique visitors in 3 months.',
      ],
      logo: '/assets/png/ajna-logo.png',
    },
    {
      id: 'exp5',
      company: 'Linum Labs',
      position: 'Lead Frontend Engineer',
      dateRange: '2021 - 2022',
      description: 'Leading Web3 and crypto application development.',
      highlights: [
        'Supervised 10 Web3 and crypto app projects.',
        'Mentored 4 front-end developers within a 15-person team.',
        'Enhanced scalability and UI performance across multiple DApps.',
      ],
      logo: '/assets/png/linum-logo.png',
    },
    {
      id: 'exp6',
      company: 'Omnia DeFi',
      position: 'Lead Software Engineer, Web3',
      dateRange: '2021',
      description: 'Building DeFi infrastructure and smart contract integrations.',
      highlights: [
        'Programmed vesting, farming, and rewards systems connected to DeFi contracts.',
        'Contributed to DApp dashboards with React, Next.js, and Node.js.',
      ],
      logo: '/assets/png/omnia-logo.png',
    },
    {
      id: 'exp7',
      company: 'HCLTech',
      position: 'Lead Software Engineer',
      dateRange: '2014 - 2015',
      description: 'Delivering enterprise software solutions.',
      highlights: [
        'Delivered high-impact Web2 software for enterprise clients in The Hague, NL.',
        'Focused on performance refactoring and cloud transitions.',
      ],
      logo: '/assets/png/hcl-logo.png',
    },
    {
      id: 'exp8',
      company: 'Elsevier',
      position: 'Software Engineer',
      dateRange: '2013 - 2014',
      description: 'Building scientific data platforms.',
      highlights: [
        'Contributed to Reaxys 2 Web App integrating chemical and medical data.',
        'Worked with Angular and cross-platform optimization for research applications.',
      ],
      logo: '/assets/png/elsevier-logo.png',
    },
    {
      id: 'exp9',
      company: 'AdForum',
      position: 'Software Engineer',
      dateRange: '2012 - 2013',
      description: 'Building marketplace for advertising industry.',
      highlights: [
        'Helped build one of Europe\'s most visited ad marketplaces (~3M users/month).',
        'Delivered multilingual, SEO-optimized codebases in international teams.',
      ],
      logo: '/assets/png/adforum-logo.png',
    },
  ] as Experience[],

  projects: [
    {
      id: 'proj1',
      name: 'Ajna Labs — DeFi DApp + SDK',
      description: 'DeFi DApp + SDK ($20M liquidity)',
      link: 'https://www.ajna.finance',
      imageUrl: '/assets/png/ajna-project.png',
      tags: ['React', 'TypeScript', 'Web3', 'DeFi', 'SDK'],
      sourceCode: 'https://github.com/ajna-finance',
    },
    {
      id: 'proj2',
      name: 'Mode Network',
      description: 'Large-scale React refactoring',
      link: 'https://www.mode.network',
      imageUrl: '/assets/png/mode-project.png',
      tags: ['Next.js', 'React', 'TypeScript', 'Web3'],
    },
    {
      id: 'proj3',
      name: 'CyberGrandpa Anti-Fraud',
      description: 'Browser extension for phishing prevention',
      link: 'https://github.com/CyberGrandpas/cybergrandpa-web-extension-antifraud',
      imageUrl: '/assets/png/cybersec-project.png',
      tags: ['JavaScript', 'Extension', 'Security'],
      sourceCode: 'https://github.com/CyberGrandpas/cybergrandpa-web-extension-antifraud',
    },
    {
      id: 'proj4',
      name: 'Tetris with Crypto Rewards',
      description: 'Telegram mini app with TON token prizes',
      link: 'https://github.com/xdemocle/tetris-mini-app',
      imageUrl: '/assets/png/tetris-project.png',
      tags: ['JavaScript', 'Gaming', 'Crypto', 'TON'],
      sourceCode: 'https://github.com/xdemocle/tetris-mini-app',
    },
    {
      id: 'proj5',
      name: 'LinkedIn Full Width',
      description: 'UI enhancement Chrome extension',
      link: 'https://chromewebstore.google.com/detail/linkedin-full-width/pijfcmadcbkcjdmajckndpccemdgebhn',
      imageUrl: '/assets/png/linkedin-project.png',
      tags: ['JavaScript', 'Extension', 'UI'],
      sourceCode: 'https://github.com/xdemocle/linkedin-full-width',
    },
  ] as Project[],

  skills: [
    {
      category: 'Frontend',
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
      category: 'Backend',
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
      category: 'DevOps & Cloud',
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
      category: 'Web3 & AI',
      items: [
        { name: 'Smart Contracts', level: 85 },
        { name: 'DeFi DApps', level: 90 },
        { name: 'SDK Development', level: 90 },
        { name: 'LLM Agents', level: 85 },
        { name: 'Prompt Engineering', level: 85 },
      ],
    },
    {
      category: 'Tools & Testing',
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
      institution: 'Athena Institute',
      degree: 'Higher Diploma, Accounting & Business',
      location: 'Foggia, Italy',
      dateRange: '2010 - 2012',
      logo: '/assets/png/athena-logo.png',
    },
  ] as Education[],

  certifications: [
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Coursera',
      dateIssued: '2023',
    },
    {
      name: 'Build a JavaScript AI App with OpenAI API',
      issuer: 'LinkedIn Learning',
      dateIssued: '2024',
    },
    {
      name: 'Practical GitHub Project Management & Collaboration',
      issuer: 'LinkedIn Learning',
      dateIssued: '2023',
    },
  ],

  achievements: [
    {
      id: 'ach1',
      title: 'Launched DeFi apps reaching 5M+ monthly users',
      description: 'Led development of widely used platforms and applications.',
    },
    {
      id: 'ach2',
      title: 'Refactored legacy SPA saving ~€50,000 in maintenance',
      description: 'Improved code efficiency and reduced technical debt at iControlApp.',
    },
    {
      id: 'ach3',
      title: 'Improved code quality by 40%, reduced bugs by 25%',
      description: 'Implemented better workflows and code standards.',
    },
    {
      id: 'ach4',
      title: 'Mentored 5+ developers who advanced to new positions',
      description: 'Provided mentorship and career guidance to junior developers.',
    },
    {
      id: 'ach5',
      title: 'Authored ecosystem-wide design & style guides',
      description: 'Created development standards for better code quality and consistency.',
    },
    {
      id: 'ach6',
      title: 'Delivered cybersecurity-focused open-source extensions',
      description: 'Built tools to protect users from phishing and fraud.',
    },
  ] as Achievement[],
};

export default profileData;
