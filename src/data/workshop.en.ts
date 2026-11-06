// src/data/workshop.en.ts
// UNVERIFIED EN TRANSLATION of workshop.fr.ts, written by an assistant at the owner's
// request. Process steps shortened to one word to fit one line. Faithful to the FR copy, nothing added. Owner to review before the page is
// linked from the site (see BACKLOG.md).

import type { WorkshopData } from "./workshop.types";

export const workshop: WorkshopData = {
  breadcrumb: "Portfolio / Design and workshop",
  title: "Design and workshop projects",
  filters: [
    { id: "all", label: "All" },
    { id: "design", label: "Design" },
    { id: "workshop", label: "Workshop" },
    { id: "3d", label: "3D" },
    { id: "crafts", label: "Crafts" },
  ],
  projects: [
    {
      id: "cartes",
      n: "01",
      title: "Project management cards",
      ctx: "Caisse des Dépôts, Master EDNA",
      line: "Caisse des Dépôts, Master EDNA, 2022, 6 months.",
      short: "2022 · Design, Workshop",
      tags: ["design", "workshop"],
      summary:
        "Prototype of a methodology tool made of 36 laser-cut cards, each built from 3 assembled layers (printed graphics, magnetic base, erasable surface). The card content is managed in an extensible spreadsheet and can be printed in series using data merge. Concept selected by the CDC for in-house development.",
      skills: ["prototypage", "decoupe-laser"],
      steps: ["Concept", "Cutting", "Assembly", "Printing"],
    },
    {
      id: "etagere",
      n: "02",
      title: "Recycled plastic shelf",
      ctx: "Precious Plastic, Master EDNA",
      line: "Precious Plastic, Master EDNA, 2021.",
      short: "2021 · Design, 3D",
      tags: ["design", "3d"],
      summary:
        "Team project: concept definition, technical drawings and plans, 3D modelling with renders in context, 1:1 scale physical model.",
      skills: ["dessin-technique", "plans-2d", "modelisation-3d", "maquettes", "collaboration"],
      steps: ["Concept", "Plans", "3D", "Model"],
    },
    {
      id: "biomimetisme",
      n: "03",
      title: "Biomimicry",
      ctx: "Natural History Museum of Nantes",
      line: "Natural History Museum of Nantes.",
      short: "Workshop, 3D",
      tags: ["design", "workshop", "3d"],
      summary:
        "Augmented reality installation at the museum over 2 days with more than 100 visitors. Within a small team, I produced the technical drawing, the 3D modelling of the digital interface assets, and the workshop construction of the wooden totem (angle cuts and bevels).",
      skills: ["dessin-technique", "modelisation-3d", "travail-du-bois", "collaboration"],
      steps: ["Drawing", "3D", "Totem", "Museum"],
    },
    {
      id: "salon",
      n: "04",
      title: "Salon du Chocolat 2022",
      ctx: "Maison Le Roux",
      line: "Maison Le Roux, 2022.",
      short: "2022 · 3D",
      tags: ["3d"],
      summary: "3D of the stand through to the final plan, on a tight budget (Blender, Cinema 4D).",
      skills: ["modelisation-3d", "plans-2d", "blender", "cinema-4d", "budget"],
      steps: ["3D modelling", "Final plan"],
    },
    {
      id: "bagues",
      n: "05",
      title: "Wooden rings",
      ctx: "Bent veneers and solid wood",
      line: "Personal projects.",
      short: "Crafts",
      tags: ["crafts", "workshop"],
      summary:
        "I designed and made wooden rings, from the drawing (size, materials, design) to the finished piece. Two techniques: bent veneers (wood strips glued with a specific wood glue, rolled, then bent with steam) and solid wood (blocks or offcuts of dense exotic wood, such as mahogany and ebony, turned on a manual or CNC wood lathe, drilled with a drill press, then finished with a rotary tool). Much of the work is done by hand: precision files, sanding, engraving and decoration. I also used epoxy resin, and varied the sizes and designs from one ring to the next.",
      skills: ["travail-du-bois", "essences", "tour-a-bois", "outil-rotatif"],
      steps: ["Drawing", "Bending", "Turning", "Finishing"],
    },
    {
      id: "limonadier",
      n: "06",
      title: "Waiter's corkscrew",
      ctx: "Wooden bottle opener and corkscrew",
      line: "Personal project.",
      short: "Crafts",
      tags: ["crafts", "workshop"],
      summary:
        "Wooden waiter's corkscrew (corkscrew and bottle opener): drawing, milling, assembly, gluing, sanding and varnish, with a rotary tool and a milling machine.",
      skills: ["travail-du-bois", "fraiseuse", "outil-rotatif"],
      steps: ["Drawing", "Milling", "Gluing", "Sanding", "Varnish"],
    },
    {
      id: "polybud",
      n: "07",
      title: "Polybud",
      ctx: "Earphone, master's project",
      line: "Earphone, master's project.",
      short: "Design, Workshop",
      tags: ["design", "workshop"],
      summary:
        "Earphone (master's project): from sketch to physical prototype in polyurethane foam (technical sketch, modelling, sanding, painting).",
      skills: ["dessin-technique", "prototypage", "maquettes"],
      steps: ["Sketch", "Modelling", "Sanding", "Painting"],
    },
  ],
};
