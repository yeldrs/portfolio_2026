// src/data/workshop.skills.ts
// Single list of know-how, taken from the "Compétences" block of the owner's
// reconversion CV (2026-11-05). Projects reference these ids (WorkshopProject.skills),
// so a skill carries the same name on every project. FR labels are the owner's; EN
// labels are an UNVERIFIED translation to review with workshop.en.ts.

export type SkillCategory = "conception" | "workshop" | "software" | "project";

export const SKILLS = {
  prototypage: { category: "conception", fr: "Prototypage", en: "Prototyping" },
  maquettes: { category: "conception", fr: "Maquettes", en: "Models" },
  "modelisation-3d": { category: "conception", fr: "Modélisation 3D", en: "3D modelling" },
  "plans-2d": { category: "conception", fr: "Plans 2D", en: "2D plans" },
  "dessin-technique": { category: "conception", fr: "Dessin technique", en: "Technical drawing" },

  "travail-du-bois": { category: "workshop", fr: "Travail du bois", en: "Woodworking" },
  essences: { category: "workshop", fr: "Essences de bois", en: "Wood species" },
  "tour-a-bois": { category: "workshop", fr: "Tour à bois", en: "Wood lathe" },
  fraiseuse: { category: "workshop", fr: "Fraiseuse", en: "Milling machine" },
  "scie-a-ruban": { category: "workshop", fr: "Scie à ruban", en: "Band saw" },
  "scie-a-onglets": { category: "workshop", fr: "Scie à onglets", en: "Mitre saw" },
  "outil-rotatif": { category: "workshop", fr: "Outil rotatif", en: "Rotary tool" },
  "gravure-laser": { category: "workshop", fr: "Gravure laser", en: "Laser engraving" },
  "decoupe-laser": { category: "workshop", fr: "Découpe laser", en: "Laser cutting" },

  blender: { category: "software", fr: "Blender", en: "Blender" },
  "cinema-4d": { category: "software", fr: "Cinema 4D", en: "Cinema 4D" },
  figma: { category: "software", fr: "Figma", en: "Figma" },
  indesign: { category: "software", fr: "InDesign", en: "InDesign" },
  photoshop: { category: "software", fr: "Photoshop", en: "Photoshop" },
  pao: { category: "software", fr: "PAO", en: "DTP" },

  "equipe-pluridisciplinaire": {
    category: "project",
    fr: "Équipe pluridisciplinaire",
    en: "Cross-functional team",
  },
  collaboration: { category: "project", fr: "Collaboration", en: "Collaboration" },
  cadrage: { category: "project", fr: "Cadrage de problèmes", en: "Problem framing" },
  budget: { category: "project", fr: "Contraintes de budget", en: "Budget constraints" },
  "ia-generative": { category: "project", fr: "IA générative", en: "Generative AI" },
} as const satisfies Record<string, { category: SkillCategory; fr: string; en: string }>;

export type SkillId = keyof typeof SKILLS;

export function skillLabel(id: SkillId, lang: "en" | "fr"): string {
  return SKILLS[id][lang];
}
