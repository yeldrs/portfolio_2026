// src/data/workflow.types.ts

export type WorkflowProjectId = "tenon" | "food-journal" | "portfolio";

export interface WorkflowPage {
  eyebrow: string;
  title: string;
  intro: string;
  // Short intro used by the home teaser only (the page keeps `intro`).
  teaserIntro: string;
  /** One-line description of each project, shown at the top of its panel in every step. */
  projectIntros: Record<WorkflowProjectId, string>;
}
