// src/data/workshop.types.ts
import type { SkillId } from "./workshop.skills";

export interface WorkshopFilter {
  /** Locale-neutral id, referenced by WorkshopProject.tags. "all" is the reset filter. */
  id: string;
  label: string;
}

export interface WorkshopProject {
  /** Locale-neutral id, also the key into workshop.media.ts. */
  id: string;
  n: string;
  title: string;
  ctx: string;
  line: string;
  short: string;
  tags: string[];
  summary: string;
  /** Ids into SKILLS (workshop.skills.ts), shared across projects and locales. */
  skills: SkillId[];
  steps: string[];
  /** Omit while unknown: the Team block is hidden when absent. */
  team?: string;
}

export interface WorkshopData {
  breadcrumb: string;
  title: string;
  filters: WorkshopFilter[];
  projects: WorkshopProject[];
}

/** A project joined with its language-neutral media (see workshop.media.ts). */
export interface WorkshopItem extends WorkshopProject {
  cover?: string;
  gallery: string[];
  fit: "cover" | "contain";
  /** `skills` resolved to the current locale's labels. */
  skillLabels: string[];
}
