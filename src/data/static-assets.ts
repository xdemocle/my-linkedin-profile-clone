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
