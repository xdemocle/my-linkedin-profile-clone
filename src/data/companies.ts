export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
}

export const companies: Record<string, Company> = {
  web3ninja: {
    id: 'web3ninja',
    name: 'The Web3 Ninja',
    logo: '/assets/png/web3ninja-logo.png',
    website: 'https://web3.ninja'
  },
  gamesglobal: {
    id: 'gamesglobal',
    name: 'Games Global',
    logo: '/assets/png/gamesglobal-logo.png',
    website: 'https://gamesglobal.com'
  },
  shibainu: {
    id: 'shibainu',
    name: 'Shiba Inu',
    logo: '/assets/png/shibainu-logo.png',
    website: 'https://shibatoken.com'
  },
  ajna: {
    id: 'ajna',
    name: 'Ajna Labs',
    logo: '/assets/png/ajna-logo.png',
    website: 'https://ajna.finance'
  },
  linum: {
    id: 'linum',
    name: 'Linum Labs',
    logo: '/assets/png/linum-logo.png',
    website: 'https://linumlabs.com'
  },
  omnia: {
    id: 'omnia',
    name: 'Omnia DeFi',
    logo: '/assets/png/omnia-logo.png',
    website: 'https://omniadefi.com'
  },
  hcl: {
    id: 'hcl',
    name: 'HCLTech',
    logo: '/assets/png/hcl-logo.png',
    website: 'https://hcltech.com'
  },
  elsevier: {
    id: 'elsevier',
    name: 'Elsevier',
    logo: '/assets/png/elsevier-logo.png',
    website: 'https://elsevier.com'
  },
  adforum: {
    id: 'adforum',
    name: 'AdForum',
    logo: '/assets/png/adforum-logo.png',
    website: 'https://adforum.com'
  },
  betuniq: {
    id: 'betuniq',
    name: 'BetuniQ',
    logo: '/assets/png/betuniq-logo.png',
    website: 'https://betuniq.com'
  }
};

export default companies;
