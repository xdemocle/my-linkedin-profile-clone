export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  location: string;
  website?: string;
  github?: string;
  email: string;
  avatar: string;
  about: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  dateRange: string;
  description: string;
  highlights: string[];
  logo?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  imageUrl?: string;
  tags: string[];
  sourceCode?: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface Skill {
  category: string;
  items: SkillItem[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  dateRange: string;
  logo?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  dateIssued: string;
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface ProfileData {
  personal: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
}
