import { ArrowLeftIcon, ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'use-intl';
import { useLocation } from 'wouter';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ProjectIconWrapper } from '../utils/iconComponents';
import { scrollToTop } from '../utils/scrollUtils';

interface Project {
  id: string;
  title: string;
  description: string;
  role?: string;
  company?: string;
  links?: {
    website?: string;
    marketing?: string;
    github?: string | string[];
    screenshots?: string[];
    demo?: string;
  };
  technologies: string[];
  icon: string;
  featured?: boolean;
}

export function ProjectsPage() {
  const t = useTranslations('Projects');
  const [, setLocation] = useLocation();

  // Navigate back to profile with scroll restoration
  const handleBackToProfile = () => {
    setLocation('/');
    scrollToTop(true);
  };

  const projects: Project[] = [
    {
      id: 'ajna-labs',
      title: 'Ajna Labs | DeFi Dapp, SDK, Website, Styling Library',
      description:
        'Deliverables included the construction of a proprietary SDK to facilitate seamless integration with decentralized smart contracts, as well as the development of scalable front-end architectures.',
      links: {
        website: 'https://www.ajnafi.com',
        marketing: 'https://www.ajna.finance',
      },
      technologies: ['React', 'TypeScript', 'Solidity', 'Web3.js', 'Ethers.js'],
      icon: 'blue-circle',
      featured: true,
    },
    {
      id: 'mode-network',
      title: 'MODE Network EVM Chain | Refactoring codebase',
      description:
        'Engaged on a time-bound contract to execute a comprehensive architectural refactor of a large-scale codebase built with Next.js, React Hooks, and TailwindCSS.',
      links: {
        website: 'https://www.mode.network',
      },
      technologies: ['Next.js', 'React Hooks', 'TailwindCSS', 'TypeScript'],
      icon: 'lightning',
      featured: true,
    },
    {
      id: 'games-global',
      title: 'GamesGlobal | Lotsaloot™ Progressive Jackpot Slot Machines',
      description:
        'Implemented an enhanced user interface for a jackpot system deployed across diverse iGaming platforms. Responsive UI for player engagement. Entirely in Vanilla.',
      links: {
        website: 'https://www.bet365.com',
        screenshots: ['Link1', 'Link2', 'Link3'],
      },
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API', 'WebGL'],
      icon: 'game',
      featured: true,
    },
    {
      id: 'landworks',
      title: 'Landworks by EnterDAO | Metaverse Rental System',
      description:
        'Contributed to codebase optimization and iterative refactoring initiatives across both user-facing and governance modules.',
      company: 'Linum Labs',
      links: {
        marketing: 'https://www.enterdao.xyz',
        screenshots: ['Link1'],
      },
      technologies: ['React', 'TypeScript', 'Web3', 'Solidity', 'GraphQL'],
      icon: 'building',
      featured: true,
    },
    {
      id: 'omnia-defi',
      title: 'Omnia DeFi | Dapp Dashboard for Real World Assets',
      description:
        'Dashboard for investors with vesting, farming, and rewards system connected to Ethereum smart contracts. Working across a stack of Node.js, React.js, Next.js, and some basics tasks with Python, Django, and Flask frameworks.',
      links: {
        screenshots: ['Link1'],
      },
      technologies: ['Node.js', 'React.js', 'Next.js', 'Python', 'Django', 'Flask', 'Ethereum'],
      icon: 'home',
      featured: true,
    },
    {
      id: 'lokr-io',
      title: 'Lokr.io (former Polkalokr) | Marketing website',
      description:
        'Optimization and refactoring of the main website for best browser performances. Next.js and CSS3 Animations',
      links: {
        screenshots: ['Link1'],
      },
      technologies: ['Next.js', 'CSS3 Animations', 'Performance Optimization'],
      icon: 'mail',
      featured: false,
    },
    {
      id: 'altcash',
      title: 'AltCash | B2C Crypto Exchanger',
      description:
        'Another open source project aiming to showcase a one way exchanger to allow small buyers of crypto coins/tokens with Fiat Onramp and Bittrex or Binance API.',
      links: {
        screenshots: ['Link1'],
        github: ['https://github.com/altcash-frontend', 'https://github.com/altcash-backend'],
      },
      technologies: ['React', 'Node.js', 'Crypto APIs', 'Fiat Onramp'],
      icon: 'github',
      featured: false,
    },
    {
      id: 'cyber-grandpa',
      title: 'CyberGrandpa Anti-Fraud | Cross-Browser Web Extension',
      description:
        'This open source project entails the development of a cross-browser web extension engineered to enhance digital safety by mitigating exposure to fraudulent activities.',
      links: {
        github: ['https://github.com/cybergrandpa-web-extension-antifraud'],
      },
      technologies: ['JavaScript', 'Browser Extensions', 'Security', 'Anti-Fraud'],
      icon: 'github',
      featured: false,
    },
    {
      id: 'linkedin-full-width',
      title: 'LinkedIn Full Width | Cross-Browser Web Extension',
      description: 'Makes LinkedIn website display in full width mode.',
      links: {
        github: ['https://github.com/linkedin-full-width-extension'],
        demo: 'https://chrome.google.com/webstore/detail/linkedin-full-width',
      },
      technologies: ['JavaScript', 'Browser Extensions', 'CSS'],
      icon: 'code',
      featured: false,
    },
    {
      id: 'tetris-crypto',
      title: 'Tetris with Crypto Rewards | Telegram Mini App',
      description: 'Arcade game for Telegram Mini Apps with leaderboard and TON token prizes.',
      links: {
        github: ['https://github.com/tetris-mini-app'],
      },
      technologies: ['JavaScript', 'Telegram Mini Apps', 'TON Blockchain', 'Canvas API'],
      icon: 'code',
      featured: false,
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-4" onClick={handleBackToProfile}>
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            {t('backToProfile')}
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{t('title')}</h1>
              <p className="text-muted-foreground mt-1">Rocco Russo</p>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t('featuredProjects')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map(project => (
              <Card key={project.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center h-8 w-8">
                          <ProjectIconWrapper iconKey={project.icon} />
                        </div>
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                      {/* Links */}
                      {project.links && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.links.website && (
                            <Button variant="outline" size="sm" className="h-8" asChild>
                              <a href={project.links.website} target="_blank" rel="noopener noreferrer">
                                {t('viewProject')}
                                <ExternalLinkIcon className="ml-1 h-3 w-3" />
                              </a>
                            </Button>
                          )}
                          {project.links.marketing && (
                            <Button variant="outline" size="sm" className="h-8" asChild>
                              <a href={project.links.marketing} target="_blank" rel="noopener noreferrer">
                                {t('viewDemo')}
                                <ExternalLinkIcon className="ml-1 h-3 w-3" />
                              </a>
                            </Button>
                          )}
                          {project.links.github &&
                            Array.isArray(project.links.github) &&
                            project.links.github.map((link: string, i: number) => (
                              <Button key={i} variant="outline" size="sm" className="h-8" asChild>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                  <GitHubLogoIcon className="mr-1 h-3 w-3" />
                                  {t('viewCode')}{' '}
                                  {Array.isArray(project.links?.github) && project.links?.github.length > 1
                                    ? i + 1
                                    : ''}
                                </a>
                              </Button>
                            ))}
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">{t('otherProjects')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map(project => (
              <Card key={project.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center justify-center h-6 w-6">
                          <ProjectIconWrapper iconKey={project.icon} className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium">{project.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-6 line-clamp-2">{project.description}</p>

                      {/* Links - Simplified for smaller cards */}
                      {project.links && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.links.github && (
                            <Button variant="outline" size="sm" className="h-7 text-xs px-2" asChild>
                              <a
                                href={
                                  Array.isArray(project.links.github) ? project.links.github[0] : project.links.github
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <GitHubLogoIcon className="mr-1 h-3 w-3" />
                                {t('viewCode')}
                              </a>
                            </Button>
                          )}
                          {project.links.demo && (
                            <Button variant="outline" size="sm" className="h-7 text-xs px-2" asChild>
                              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                {t('viewDemo')}
                                <ExternalLinkIcon className="ml-1 h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      )}

                      {/* Technologies - Limited to save space */}
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
