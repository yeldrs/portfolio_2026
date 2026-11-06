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
      id: "salon",
      n: "01",
      title: "Stand, Salon du Chocolat",
      ctx: "Maison Le Roux",
      line: "Maison Le Roux",
      short: "3D",
      tags: ["3d"],
      summary:
        "Conception de l'espace de vente éphémère de Maison Le Roux pour le Salon du Chocolat, dans le cadre de mon poste de directeur artistique. Le projet a démarré par un cadrage avec un budget serré, suivi de la modélisation 3D du stand (Blender, Cinema 4D) jusqu'au plan final, puis de la production, en contactant les prestataires de fabrication. Sur place pendant le salon, j'ai vérifié la mise en place du stand et participé à la vente.",
      skills: ["modelisation-3d", "plans-2d", "blender", "cinema-4d", "budget"],
      steps: ["Cadrage", "3D", "Plans", "Production", "Salon"],
    },
    {
      id: "bagues",
      n: "02",
      title: "Bagues en bois",
      ctx: "Placages cintrés et bois massif",
      line: "Projet personnel",
      short: "Artisanat",
      tags: ["crafts", "workshop"],
      summary:
        "J'ai conçu et fabriqué des bagues en bois, du dessin (taille, matériaux, design) au produit fini. Deux techniques : les placages cintrés (lamelles de bois cintrées à la vapeur, puis collées) et le bois massif (bois exotique dense, comme l'acajou et l'ébène, tourné sur un tour à bois manuel ou CNC, percé à la perceuse à colonne, puis fini à l'outil rotatif). Une grande part du travail se fait à la main : limes de précision, ponçage, gravures et décorations. Résine époxy en complément, avec des tailles et des designs variés.",
      skills: ["travail-du-bois", "essences", "tour-a-bois", "outil-rotatif"],
      steps: ["Dessin", "Cintrage", "Tournage", "Finitions"],
    },
    {
      id: "limonadier",
      n: "03",
      title: "Limonadier",
      ctx: "Décapsuleur et tire-bouchon en bois",
      line: "Projet personnel",
      short: "Artisanat",
      tags: ["crafts", "workshop"],
      summary:
        "Limonadier en bois (tire-bouchon et décapsuleur) assemblé à partir de pièces que j'ai conçues. Étapes : dessin, fraisage (fraiseuse, outil rotatif), gravure laser de la signature, assemblage et collage, ponçage, incrustation d'une pierre de Quiberon, puis finition au vernis. J'ai également réalisé la photographie du projet.",
      skills: ["travail-du-bois", "fraiseuse", "outil-rotatif", "gravure-laser"],
      steps: ["Dessin", "Fraisage", "Gravure", "Assemblage", "Vernis"],
    },
    {
      id: "polybud",
      n: "04",
      title: "Polybud",
      ctx: "Écouteur modulaire, projet master",
      line: "Écouteur modulaire, projet master",
      short: "Conception, Atelier",
      tags: ["design", "workshop"],
      summary:
        "Prototypage d'un écouteur modulaire (projet de master), conçu pour être polyvalent : utilisable sans fil, rechargeable ou branché avec un câble, en kit mains libres avec un seul écouteur ou avec deux, grâce à un embout réversible. L'écouteur se compose de trois pièces détachables, réparables et interchangeables, dans une logique d'économie circulaire visant un indice de réparabilité élevé. J'ai réalisé le concept et le dessin technique, puis la maquette physique en mousse polyuréthane, avec ponçage et finitions.",
      skills: ["dessin-technique", "prototypage", "maquettes"],
      steps: ["Concept", "Dessin", "Maquette", "Ponçage", "Finitions"],
    },
    {
      id: "biomimetisme",
      n: "05",
      title: "Biomimétisme",
      ctx: "Muséum d'histoire naturelle de Nantes",
      line: "Muséum d'histoire naturelle de Nantes",
      short: "Atelier, 3D",
      tags: ["design", "workshop", "3d"],
      summary:
        "Installation en réalité augmentée au musée pendant 2 jours avec plus de 100 visiteurs. Au sein d'une petite équipe, j'ai réalisé le dessin technique, la modélisation 3D des assets de l'interface digitale ainsi que la conception en atelier du totem en bois (coupes d'angle et biseaux).",
      skills: ["dessin-technique", "modelisation-3d", "travail-du-bois", "collaboration"],
      steps: ["Dessin", "3D", "Totem", "Musée"],
    },
    {
      id: "cartes",
      n: "06",
      title: "Concevoir un outil agile pour designer avec éthique",
      ctx: "Caisse des Dépôts, Master EDNA",
      line: "Caisse des Dépôts, Master EDNA, 6 mois",
      short: "Conception, Atelier",
      tags: ["design", "workshop"],
      summary:
        "Projet d'équipe (2 à 5 personnes). Prototype d'un outil de méthodologie composé de 36 cartes découpées au laser, chacune en 3 couches assemblées (graphisme imprimé, base magnétique, surface effaçable). Le contenu des cartes est géré dans un tableur extensible et imprimable en série par fusion de données. Concept retenu par la CDC pour un développement interne.",
      skills: ["prototypage", "decoupe-laser"],
      steps: ["Recherche", "Concept", "Prototype", "Test", "Livraison"],
    },
    {
      id: "etagere",
      hidden: true, // no photos yet
      n: "07",
      title: "Étagère en plastique recyclé",
      ctx: "Precious Plastic, Master EDNA",
      line: "Precious Plastic, Master EDNA",
      short: "Conception, 3D",
      tags: ["design", "3d"],
      summary:
        "Projet d'équipe : définition du concept, dessins techniques et plans, modélisation 3D avec rendus en situation, maquette physique à l'échelle 1:1.",
      skills: ["dessin-technique", "plans-2d", "modelisation-3d", "maquettes", "collaboration"],
      steps: ["Concept", "Plans", "3D", "Maquette"],
    },
  ],
};
