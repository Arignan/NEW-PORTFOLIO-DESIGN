export interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  challenges?: string;
  videoUrl?: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl: string;
  // New fields for the dedicated project detail page
  gallery?: string[];
  technicalDetails?: {
    title: string;
    description: string;
  }[];
  codeSnippet?: {
    language: string;
    code: string;
    description?: string;
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  url:string;
  imageUrl: string;
  headline: string;
}

export interface ResearchIdea {
    title: string;
    description: string;
    keywords: string[];
}