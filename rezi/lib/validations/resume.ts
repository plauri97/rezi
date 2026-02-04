import { z } from "zod";

const personalInfoSchema = z.object({
  fullName: z.string(),
  email: z.string().email().or(z.literal("")),
  phone: z.string(),
  location: z.string(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
});

const workEntrySchema = z.object({
  id: z.string(),
  company: z.string(),
  jobTitle: z.string(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  bullets: z.array(z.string()),
});

const educationEntrySchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  bullets: z.array(z.string()),
});

const projectEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().optional(),
  description: z.string().optional(),
  bullets: z.array(z.string()),
  technologies: z.array(z.string()).optional(),
});

export const resumeContentSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().optional(),
  workExperience: z.array(workEntrySchema),
  education: z.array(educationEntrySchema),
  skills: z.array(z.string()),
  projects: z.array(projectEntrySchema),
});

export type ResumeContentSchema = z.infer<typeof resumeContentSchema>;
