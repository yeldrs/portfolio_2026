// src/data/workflow.types.ts

export type WorkflowProjectId = "tenon" | "food-journal" | "portfolio";

export interface WorkflowPage {
  eyebrow: string;
  title: string;
  intro: string;
  // Short intro used by the home teaser only (the page keeps `intro`).
  teaserIntro: string;
  /** Shown under the banner of each project: a one-line tagline, then a short introduction. */
  projects: Record<WorkflowProjectId, { tagline: string; intro: string }>;
}
