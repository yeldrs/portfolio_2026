// src/data/about.types.ts

export interface ProfessionalExperience {
  title: string;
  company: string;
  duration: string;
  highlights: string[];
  trackingSlug: string;
  cvLink?: string;
  cvLinkLabel?: string;
}

export interface Skill {
  title: string;
  description?: string;
}

export interface SkillSection {
  title: string;
  skills: Skill[];
}

export interface SignificantWork {
  title: string;
  description: string;
  href?: string;
}

export interface EducationExperience {
  year: string;
  title: string;
  school: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface AboutData {
  introHeading: string;
  introBody: string;
  introCta: string;
  experienceHeading: string;
  professionalExperience: ProfessionalExperience[];
  toolkitHeading: string;
  skillSections: SkillSection[];
  significantWorkHeading: string;
  significantWork: SignificantWork[];
  educationHeading: string;
  educationExperience: EducationExperience[];
  languagesHeading: string;
  languages: Language[];
}
