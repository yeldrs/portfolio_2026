// src/data/workflow.loader.ts
//
// Reads the `workflow` content collection for one locale and shapes it for the page:
// blocks grouped per project (fixed order), the tools each step uses, and the filter
// vocabulary (every catalogue tool that appears in at least one block).

import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { toolIdFromLabel, toolNames } from "./workflow.tools";

export const PROJECT_ORDER = ["tenon", "portfolio", "food-journal"] as const;
export type ProjectId = (typeof PROJECT_ORDER)[number];

type Locale = "en" | "fr";
type Block = CollectionEntry<"workflow">["data"]["en"]["blocks"][number];

export interface WorkflowProject {
  id: ProjectId;
  blocks: Block[];
  // true when every block of this project is "not-applicable" for the step
  disabled: boolean;
  // true when the project is a teaser at this step: the page draws the barrier, no content
  teaser: boolean;
}

export interface WorkflowStep {
  id: string; // "step-1"
  order: number;
  title: string;
  globalText: string;
  teaserTools: string[];
  projects: WorkflowProject[];
  toolIds: string[]; // catalogue ids used by at least one active block
}

export async function getWorkflowSteps(lang: Locale): Promise<WorkflowStep[]> {
  const entries = (await getCollection("workflow")).sort((a, b) => a.data.order - b.data.order);

  return entries.map((entry) => {
    const copy = entry.data[lang];
    const projects: WorkflowProject[] = PROJECT_ORDER.map((id) => {
      const blocks = copy.blocks
        .filter((b) => b.project === id)
        .map((b) => {
          // Two labels can resolve to the same tool (Figma + Figma MCP): show it once.
          const tools = b.tools.map((tool) => ({ ...tool, id: tool.id ?? toolIdFromLabel(tool.label) }));
          return { ...b, tools: tools.filter((tool, i) => !tool.id || tools.findIndex((o) => o.id === tool.id) === i) };
        });
      return {
        id,
        blocks,
        disabled: blocks.length === 0 || blocks.every((b) => b.status === "not-applicable"),
        teaser: blocks.length > 0 && blocks.every((b) => b.status === "teaser"),
      };
    });

    const toolIds = new Set<string>();
    for (const b of copy.blocks) {
      if (b.status !== "active") continue;
      for (const tool of b.tools) if (tool.id) toolIds.add(tool.id);
    }

    return {
      id: `step-${entry.data.order}`,
      order: entry.data.order,
      title: copy.title,
      globalText: copy.globalText,
      teaserTools: entry.data.teaserTools,
      projects,
      toolIds: [...toolIds],
    };
  });
}

// Filter vocabulary, in order of first appearance across the five steps.
export function getUsedTools(steps: WorkflowStep[]): { id: string; name: string }[] {
  const seen = new Set<string>();
  const out: { id: string; name: string }[] = [];
  for (const step of steps) {
    for (const id of step.toolIds) {
      if (seen.has(id)) continue;
      seen.add(id);
      out.push({ id, name: toolNames[id] ?? id });
    }
  }
  return out;
}
