// src/data/workflow.en.ts
import type { WorkflowPage } from "./workflow.types";

export const workflow: WorkflowPage = {
  eyebrow: "How I work",
  title: "Design, code and AI, in one workflow",
  intro:
    "I run my projects end to end with AI agents. I frame and design; they write the code, then I review and polish. Here are the five steps of my workflow, shown on three projects, with the tools I used and the mistakes I corrected along the way.",
  teaserIntro:
    "My agentic design practice: three projects, five steps, and the tools I use.",
  projects: {
    tenon: {
      tagline: "A mobile game on the Play Store, adapted from a wooden puzzle.",
      intro:
        "Tenon is a mobile game adapted from a wooden puzzle: you swap the positions of pegs of different colors. It has been on the Play Store in early access since November 10, 2026. My goal: learn to design and publish a simple mobile game, working with AI agents.",
    },
    "food-journal": {
      tagline: "A calm-UX web app to track meals and body signals, with no judgement and no anxiety-inducing diagnosis.",
      intro:
        "Solene is a platform for tracking food and emotional state. It is aimed especially at people living with an eating disorder or chronic digestive conditions, and at anyone who wants to understand their body's signals better. It started as a personal tool that notably helped my doctor diagnose my IBS.",
    },
    portfolio: {
      tagline: "My portfolio. Third version, the first built with AI agents. Bilingual, EN and FR.",
      intro:
        "My portfolio is on its third version: the first coded by hand (HTML, CSS, a little JavaScript), the second designed in Figma and coded with Gemini 2.5 Pro, and this one built with Claude Code. It exists in French and English. Its goal: to showcase my UX design projects and my ways of working.",
    },
  },
};
