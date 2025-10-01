import type { ProfileData, Experience, Project, Education, Skill, Achievement } from '../types/profile';

export const profileData: ProfileData = {
  personal: {
    name: 'Rocco Russo',
    title: 'Software Engineer / Tech Lead',
    headline: 'Blockchain & Dapps | AI Agents | Cybersecurity Advocate',
    location: 'Apulia, Italy',
    website: 'https://example.com',
    github: 'https://github.com/example',
    email: 'hello@rocco.me',
    avatar: '/assets/png/rocco-me-nft.png',
    about: 'Software engineer with over 20 years in front-end engineering, 5 years in Web3 integrations, and hands-on full-stack experience. Expert in React, Svelte, TypeScript, Next.js, Node.js, TailwindCSS, MongoDB, and cloud-native solutions. I mentor developers, lead teams, and architect solutions for decentralized ecosystems — from DeFi and RWA platforms to AI-augmented apps.',
  },
  
  experience: [
    {
      id: 'exp1',
      company: 'The Web3 Ninja',
      position: 'Lead Software Engineer, Web3',
      dateRange: '2024 - Present',
      description: 'Leading Web3 integration projects and mentoring junior developers.',
      highlights: [
        'Mentored 5 interns, placed 3 in junior dev roles.',
        'Engineered full-stack blockchain integrations for 3 DApps.',
        'Improved transaction speeds by 15% and cut gas fees.',
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
        'Built UI for Lotsaloot™, a three-tier jackpot system.',
        'Designed fast-hitting reward loops to boost player engagement.',
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
        'Led 12-member team, increasing productivity by 30%.',
        'Reduced bugs by 25% and improved code quality by 40%.',
        'Scaled front-ends to 5M users, 3k concurrent.',
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
        'Deployed SPA with $20M+ liquidity.',
        'Cut integration time by 50% with SDKs.',
        'Released ecosystem-wide style guide, boosting dev speed 25%.',
      ],
      logo: '/assets/png/ajna-logo.png',
    },
  ] as Experience[],

  projects: [
    {
      id: 'proj1',
      name: 'Ajna Labs — DeFi Dapp + SDK',
      description: 'DeFi protocol with $20M+ in liquidity',
      link: 'https://ajna.finance',
      imageUrl: '/assets/png/ajna-project.png',
      tags: ['React', 'TypeScript', 'Web3', 'DeFi'],
    },
    {
      id: 'proj2',
      name: 'Mode Network',
      description: 'Next.js refactoring at scale',
      link: 'https://mode.network',
      imageUrl: '/assets/png/mode-project.png',
      tags: ['Next.js', 'React', 'TypeScript', 'Web3'],
    },
    {
      id: 'proj3',
      name: 'CyberGrandpa Anti-Fraud Extension',
      description: 'Open-source browser extension for anti-phishing',
      link: 'https://github.com/example/cybergrandpa',
      imageUrl: '/assets/png/cybersec-project.png',
      tags: ['JavaScript', 'Extension', 'Security'],
      sourceCode: 'https://github.com/example/cybergrandpa',
    },
    {
      id: 'proj4',
      name: 'Tetris with Crypto Rewards',
      description: 'Telegram Mini App with TON token rewards',
      link: 'https://github.com/example/tetris-crypto',
      imageUrl: '/assets/png/tetris-project.png',
      tags: ['JavaScript', 'Gaming', 'Crypto', 'TON'],
      sourceCode: 'https://github.com/example/tetris-crypto',
    },
    {
      id: 'proj5',
      name: 'LinkedIn Full Width Extension',
      description: 'Small but viral Chrome extension',
      link: 'https://chrome.google.com/webstore/detail/example',
      imageUrl: '/assets/png/linkedin-project.png',
      tags: ['JavaScript', 'Extension', 'UI'],
      sourceCode: 'https://github.com/example/linkedin-width',
    },
  ] as Project[],

  skills: [
    {
      category: 'Frontend',
      items: [
        { name: 'React', level: 95 },
        { name: 'Svelte', level: 90 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 95 },
        { name: 'CSS-in-JS', level: 90 },
        { name: 'Redux', level: 85 },
        { name: 'Zustand', level: 90 },
        { name: 'Wagmi', level: 85 },
        { name: 'Viem', level: 80 },
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
      ],
    },
    {
      category: 'DevOps',
      items: [
        { name: 'Docker', level: 85 },
        { name: 'Kubernetes', level: 75 },
        { name: 'AWS', level: 80 },
        { name: 'GCP', level: 75 },
        { name: 'CI/CD', level: 85 },
        { name: 'Vercel', level: 90 },
      ],
    },
    {
      category: 'Other',
      items: [
        { name: 'Web3.js', level: 90 },
        { name: 'Ethers.js', level: 85 },
        { name: 'SDK development', level: 90 },
        { name: 'Prompt Engineering', level: 85 },
        { name: 'Cybersecurity', level: 80 },
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
      link: 'https://example.com/cert1',
    },
    {
      name: 'JavaScript AI App with OpenAI API',
      issuer: 'LinkedIn Learning',
      dateIssued: '2024',
      link: 'https://example.com/cert2',
    },
    {
      name: 'Practical GitHub Project Management',
      issuer: 'LinkedIn Learning',
      dateIssued: '2023',
      link: 'https://example.com/cert3',
    },
  ],

  achievements: [
    {
      id: 'ach1',
      title: 'Delivered software used by 5M+ users monthly',
      description: 'Led development of widely used platforms and applications.',
    },
    {
      id: 'ach2',
      title: 'Saved ~€50,000 via major refactoring at iControlApp',
      description: 'Improved code efficiency and reduced technical debt.',
    },
    {
      id: 'ach3',
      title: 'Boosted team productivity +30% with mentorship',
      description: 'Implemented better workflows and mentoring programs.',
    },
    {
      id: 'ach4',
      title: 'Increased engagement +20% with DeFi app launch',
      description: 'Designed more intuitive UI/UX for better user retention.',
    },
    {
      id: 'ach5',
      title: 'Authored style guides for ecosystem consistency',
      description: 'Created development standards for better code quality.',
    },
  ] as Achievement[],
};

export default profileData;
