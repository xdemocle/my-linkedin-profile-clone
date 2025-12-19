export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  location: string;
  website?: string;
  github?: string;
  email: string;
  phone?: string;
  avatar: string;
  about: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  dateRange: string;
  type?: string;
  location?: string;
  description: string;
  highlights: string[];
  logo: string;
  metadata?: {
    featured?: boolean;
    order?: number;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role?: string | null;
  company?: string | null;
  links?: {
    website?: string;
    marketing?: string;
    github?: string | string[];
    screenshots?: string[];
    demo?: string;
  };
  technologies: string[];
  icon: string;
  imageUrl?: string | null;
  metadata?: {
    featured?: boolean;
    order?: number;
  };
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

export interface EducationResult {
  education: Education[];
  certifications: {
    name: string;
    issuer: string;
    dateIssued: string;
    link: string;
  }[];
}
