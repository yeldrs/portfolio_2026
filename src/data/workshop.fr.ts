// src/data/workshop.fr.ts
// Copied from the Claude Design canvas "Section conception tangible"
// (project/projects.js). Changes: process steps shortened to one word (2026-11-06,
// owner request: each step must fit on one line); also, the "[Date] · " and "[Équipe à compléter]"
// placeholders are omitted (see workshop.types.ts), pending the owner's real values.

import type { WorkshopData } from "./workshop.types";

export const workshop: WorkshopData = {
  breadcrumb: "Portfolio / Conception et atelier",
  title: "Projets de conception et d'atelier",
  filters: [
    { id: "all", label: "Tous" },
    { id: "design", label: "Conception" },
    { id: "workshop", label: "Atelier" },
    { id: "3d", label: "3D" },
    { id: "crafts", label: "Artisanat" },
  ],
  projects: [
    {
      id: "cartes",
      n: "01",
      title: "Cartes de gestion de projet",
      ctx: "Caisse des Dépôts, Master EDNA",
      line: "Caisse des Dépôts, Master EDNA, 2022, 6 mois.",
      short: "2022 · Conception, Atelier",
      tags: ["design", "workshop"],
      summary:
        "Prototype d'un outil de méthodologie composé de 36 cartes découpées au laser, chacune en 3 couches assemblées (graphisme imprimé, base magnétique, surface effaçable). Le contenu des cartes est géré dans un tableur extensible et imprimable en série par fusion de données. Concept retenu par la CDC pour un développement interne.",
      skills: ["prototypage", "decoupe-laser"],
      steps: ["Concept", "Découpe", "Assemblage", "Impression"],
    },
    {
      id: "etagere",
      n: "02",
      title: "Étagère en plastique recyclé",
      ctx: "Precious Plastic, Master EDNA",
      line: "Precious Plastic, Master EDNA, 2021.",
      short: "2021 · Conception, 3D",
      tags: ["design", "3d"],
      summary:
        "Projet d'équipe : définition du concept, dessins techniques et plans, modélisation 3D avec rendus en situation, maquette physique à l'échelle 1:1.",
      skills: ["dessin-technique", "plans-2d", "modelisation-3d", "maquettes", "collaboration"],
      steps: ["Concept", "Plans", "3D", "Maquette"],
    },
    {
      id: "biomimetisme",
      n: "03",
      title: "Biomimétisme",
      ctx: "Muséum d'histoire naturelle de Nantes",
      line: "Muséum d'histoire naturelle de Nantes.",
      short: "Atelier, 3D",
      tags: ["design", "workshop", "3d"],
      summary:
        "Installation en réalité augmentée au musée pendant 2 jours avec plus de 100 visiteurs. Au sein d'une petite équipe, j'ai réalisé le dessin technique, la modélisation 3D des assets de l'interface digitale ainsi que la conception en atelier du totem en bois (coupes d'angle et biseaux).",
      skills: ["dessin-technique", "modelisation-3d", "travail-du-bois", "collaboration"],
      steps: ["Dessin", "3D", "Totem", "Musée"],
    },
    {
      id: "salon",
      n: "04",
      title: "Salon du Chocolat 2022",
      ctx: "Maison Le Roux",
      line: "Maison Le Roux, 2022.",
      short: "2022 · 3D",
      tags: ["3d"],
      summary: "3D du stand jusqu'au plan final, avec un budget serré (Blender, Cinema 4D).",
      skills: ["modelisation-3d", "plans-2d", "blender", "cinema-4d", "budget"],
      steps: ["Modélisation 3D", "Plan final"],
    },
    {
      id: "bagues",
      n: "05",
      title: "Bagues en bois",
      ctx: "Placages cintrés et bois massif",
      line: "Projets personnels.",
      short: "Artisanat",
      tags: ["crafts", "workshop"],
      summary:
        "J'ai conçu et fabriqué des bagues en bois, du dessin (taille, matériaux, design) au produit fini. Deux techniques : les placages cintrés (lamelles de bois collées avec une colle à bois spécifique, enroulées puis pliées à la vapeur) et le bois massif (blocs ou chutes de bois exotique dense, comme l'acajou et l'ébène, tournés sur un tour à bois manuel ou CNC, percés à la perceuse à colonne, puis finis à l'outil rotatif). Une grande part du travail se fait à la main : limes de précision, ponçage, gravures et décorations. J'ai aussi utilisé de la résine époxy, et fait varier les tailles et les designs d'une bague à l'autre.",
      skills: ["travail-du-bois", "essences", "tour-a-bois", "outil-rotatif"],
      steps: ["Dessin", "Cintrage", "Tournage", "Finitions"],
    },
    {
      id: "limonadier",
      n: "06",
      title: "Limonadier",
      ctx: "Décapsuleur et tire-bouchon en bois",
      line: "Projet personnel.",
      short: "Artisanat",
      tags: ["crafts", "workshop"],
      summary:
        "Limonadier en bois (tire-bouchon et décapsuleur) : dessin, fraisage, assemblage, collage, ponçage et vernis, à l'outil rotatif et à la fraiseuse.",
      skills: ["travail-du-bois", "fraiseuse", "outil-rotatif"],
      steps: ["Dessin", "Fraisage", "Collage", "Ponçage", "Vernis"],
    },
    {
      id: "polybud",
      n: "07",
      title: "Polybud",
      ctx: "Écouteur, projet master",
      line: "Écouteur, projet master.",
      short: "Conception, Atelier",
      tags: ["design", "workshop"],
      summary:
        "Écouteur (projet master) : du croquis au prototype physique en mousse polyuréthane (croquis technique, modelage, ponçage, peinture).",
      skills: ["dessin-technique", "prototypage", "maquettes"],
      steps: ["Croquis", "Modelage", "Ponçage", "Peinture"],
    },
  ],
};
