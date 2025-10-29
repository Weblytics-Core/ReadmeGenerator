import { z } from "zod";

export const readmeProfileSchema = z.object({
  template: z.enum(["minimal", "detailed", "creative"]),
  name: z.string().min(1, "Name is required"),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  
  skills: z.array(z.string()).default([]),
  
  githubUsername: z.string().optional(),
  showStats: z.boolean().default(false),
  showStreak: z.boolean().default(false),
  showTopLanguages: z.boolean().default(false),
  
  socialLinks: z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    instagram: z.string().optional(),
    website: z.string().optional(),
  }).optional(),
  
  customSections: z.array(z.object({
    title: z.string(),
    content: z.string(),
  })).default([]),
});

export type ReadmeProfile = z.infer<typeof readmeProfileSchema>;

export const skillCategories = {
  "Languages": ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin"],
  "Frontend": ["React", "Vue", "Angular", "Next.js", "Svelte", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "SASS"],
  "Backend": ["Node.js", "Express", "Django", "Flask", "Spring Boot", "ASP.NET", "Ruby on Rails", "FastAPI"],
  "Database": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Firebase", "Supabase"],
  "DevOps": ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Jenkins", "GitHub Actions"],
  "Tools": ["Git", "VS Code", "Figma", "Postman", "Webpack", "Vite", "Jest", "Cypress"],
};

export const allSkills = Object.values(skillCategories).flat();
