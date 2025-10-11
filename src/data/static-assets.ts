/**
 * Static assets configuration
 * Contains only non-translatable data: URLs, logos, images, technical metadata
 * All translatable text is in src/messages/*.json files
 */

export const staticAssets = {
  personal: {
    name: 'Rocco Russo',
    website: 'https://rocco.me',
    github: 'https://github.com/xdemocle',
    email: 'hello@rocco.me',
    phone: '+39 379 263 0288',
    avatar: '/assets/ui/rocco-me-nft.png',
  },

  experienceLogos: {
    exp1: '/assets/exp/web3ninja_logo.jpg',
    exp2: '/assets/exp/gamesglobal_logo.jpg',
    exp3: '/assets/exp/shibainu_logo.jpg',
    exp4: '/assets/exp/ajna_logo.jpg',
    exp5: '/assets/exp/linum_logo.jpg',
    exp6: '/assets/exp/omnia_logo.jpg',
    exp7: '/assets/exp/hcltech_logo.jpg',
    exp8: '/assets/exp/elsevier_logo.jpg',
    exp9: '/assets/exp/adforum_logo.jpg',
  },

  projects: {
    proj1: {
      link: 'https://www.ajna.finance',
      imageUrl: '/assets/png/projects/ajna-project.png',
      tags: ['React', 'TypeScript', 'Web3', 'DeFi', 'SDK'],
      sourceCode: 'https://github.com/ajna-finance',
    },
    proj2: {
      link: 'https://www.mode.network',
      imageUrl: '/assets/png/projects/mode-project.png',
      tags: ['Next.js', 'React', 'TypeScript', 'Web3'],
    },
    proj3: {
      link: 'https://github.com/CyberGrandpas/cybergrandpa-web-extension-antifraud',
      imageUrl: '/assets/png/projects/cybersec-project.png',
      tags: ['JavaScript', 'Extension', 'Security'],
      sourceCode: 'https://github.com/CyberGrandpas/cybergrandpa-web-extension-antifraud',
    },
    proj4: {
      link: 'https://github.com/xdemocle/tetris-mini-app',
      imageUrl: '/assets/png/projects/tetris-project.png',
      tags: ['JavaScript', 'Gaming', 'Crypto', 'TON'],
      sourceCode: 'https://github.com/xdemocle/tetris-mini-app',
    },
    proj5: {
      link: 'https://chromewebstore.google.com/detail/linkedin-full-width/pijfcmadcbkcjdmajckndpccemdgebhn',
      imageUrl: '/assets/png/projects/linkedin-project.png',
      tags: ['JavaScript', 'Extension', 'UI'],
      sourceCode: 'https://github.com/xdemocle/linkedin-full-width',
    },
  },

  skills: [
    // Frontend
    [
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
    // Backend
    [
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
    // DevOps & Cloud
    [
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 75 },
      { name: 'CI/CD', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'GCP', level: 75 },
      { name: 'Vercel', level: 90 },
      { name: 'Heroku', level: 80 },
    ],
    // Web3 & AI
    [
      { name: 'Smart Contracts', level: 85 },
      { name: 'DeFi DApps', level: 90 },
      { name: 'SDK Development', level: 90 },
      { name: 'LLM Agents', level: 85 },
      { name: 'Prompt Engineering', level: 85 },
    ],
    // Tools & Testing
    [
      { name: 'GitHub', level: 95 },
      { name: 'GitLab', level: 85 },
      { name: 'Webpack', level: 85 },
      { name: 'Vite', level: 90 },
      { name: 'Figma', level: 80 },
      { name: 'Jest', level: 85 },
      { name: 'Vitest', level: 90 },
      { name: 'Selenium', level: 75 },
    ],
  ],

  educationLogos: {
    edu1: '/assets/png/athena-logo.png',
  },
};

export default staticAssets;
