// src/data/workflow.fr.ts
import type { WorkflowPage } from "./workflow.types";

export const workflow: WorkflowPage = {
  title: "Design, code et IA, dans un seul workflow",
  intro:
    "Je mène certains de mes projets les plus récents avec des agents IA. Je cadre, je pilote et j'esquisse le design ; les agents construisent le projet et écrivent le code, que je relis et peaufine. Voici cinq grandes étapes de mon workflow, illustrées par trois projets différents, avec les outils utilisés et les erreurs corrigées en route.",
  teaserIntro:
    "Ma pratique du design agentique : trois projets, cinq étapes, et les outils que j'utilise.",
  projects: {
    tenon: {
      tagline: "Un jeu mobile sur le Play Store, tiré d'un casse-tête en bois.",
      intro:
        "Tenon est un jeu mobile, adapté d'un casse-tête en bois : il faut inverser l'emplacement des pions de couleurs différentes. Disponible sur le Play Store depuis le 10 novembre 2026, en accès anticipé. Mon objectif : apprendre à concevoir et à publier un jeu mobile simple, en travaillant avec des agents IA.",
    },
    "food-journal": {
      tagline: "Une application web pour suivre ses repas et ses signaux corporels, en calm UX : sans jugement, sans diagnostic anxiogène.",
      intro:
        "Health journal est une plateforme de suivi alimentaire et du ressenti émotionnel. Elle s'adresse notamment aux personnes qui vivent avec un trouble du comportement alimentaire ou des maladies digestives chroniques, ainsi qu'à toute personne qui souhaite mieux comprendre les signaux du corps. Au départ, c'était un outil personnel qui a notamment aidé mon médecin à diagnostiquer chez moi un SII.",
    },
    portfolio: {
      tagline: "Mon portfolio. Troisième version, la première faite avec des agents IA. Bilingue FR et EN.",
      intro:
        "Mon portfolio en est à sa troisième version : la première codée à la main (HTML, CSS, un peu de JavaScript), la deuxième conçue dans Figma et codée avec Gemini 2.5 Pro, celle-ci construite avec Claude Code. Il existe en français et en anglais. Son objectif : mettre en avant mes projets de design UX et mes méthodes de travail.",
    },
  },
};
