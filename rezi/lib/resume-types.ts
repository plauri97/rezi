/**
 * Structured resume content stored in Resume.content (JSON).
 * Single source of truth for form state and preview/PDF.
 */

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

export interface WorkExperienceEntry {
  id: string;
  company: string;
  jobTitle: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  url?: string;
  description?: string;
  bullets: string[];
  technologies?: string[];
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  summary?: string;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  projects: ProjectEntry[];
}

export const defaultPersonalInfo: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
};

export const defaultResumeContent: ResumeContent = {
  personalInfo: defaultPersonalInfo,
  summary: "",
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
};

export function createWorkEntry(): WorkExperienceEntry {
  return {
    id: crypto.randomUUID(),
    company: "",
    jobTitle: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    bullets: [""],
  };
}

export function createEducationEntry(): EducationEntry {
  return {
    id: crypto.randomUUID(),
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    bullets: [],
  };
}

export function createProjectEntry(): ProjectEntry {
  return {
    id: crypto.randomUUID(),
    name: "",
    url: "",
    description: "",
    bullets: [""],
    technologies: [],
  };
}
