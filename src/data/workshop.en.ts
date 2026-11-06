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
      title: "Crafting an agile tool to design with ethics",
      ctx: "Caisse des Dépôts, Master EDNA",
      line: "Caisse des Dépôts, Master EDNA, 2022, 6 months",
      short: "2022 · Design, Workshop",
      tags: ["design", "workshop"],
      summary:
        "Team project (2 to 5 people). Prototype of a methodology tool made of 36 laser-cut cards, each built from 3 assembled layers (printed graphics, magnetic base, erasable surface). The card content is managed in an extensible spreadsheet and can be printed in series using data merge. Concept selected by the CDC for in-house development.",
      skills: ["prototypage", "decoupe-laser"],
      steps: ["Research", "Concept", "Prototype", "Testing", "Delivery"],
    },
    {
      id: "etagere",
      n: "02",
      title: "Recycled plastic shelf",
      ctx: "Precious Plastic, Master EDNA",
      line: "Precious Plastic, Master EDNA, 2021",
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
      line: "Natural History Museum of Nantes",
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
      line: "Maison Le Roux, 2022",
      short: "2022 · 3D",
      tags: ["3d"],
      summary:
        "Design of the pop-up sales space for Maison Le Roux at the Salon du Chocolat 2022, as part of my art director role. The project started with scoping on a tight budget, followed by 3D modelling of the stand (Blender, Cinema 4D) through to the final plan, then production, by contacting the manufacturing suppliers. On site during the show, I checked the stand set-up and took part in the sales.",
      skills: ["modelisation-3d", "plans-2d", "blender", "cinema-4d", "budget"],
      steps: ["Scoping", "3D", "Plans", "Production", "On site"],
    },
    {
      id: "bagues",
      n: "05",
      title: "Wooden rings",
      ctx: "Bent veneers and solid wood",
      line: "Personal project",
      short: "Crafts",
      tags: ["crafts", "workshop"],
      summary:
        "I designed and made wooden rings, from the drawing (size, materials, design) to the finished piece. Two techniques: bent veneers (wood strips steam-bent, then glued) and solid wood (dense exotic wood, such as mahogany and ebony, turned on a manual or CNC wood lathe, drilled with a drill press, then finished with a rotary tool). Much of the work is done by hand: precision files, sanding, engraving and decoration. Epoxy resin as a complement, with varied sizes and designs.",
      skills: ["travail-du-bois", "essences", "tour-a-bois", "outil-rotatif"],
      steps: ["Drawing", "Bending", "Turning", "Finishing"],
    },
    {
      id: "limonadier",
      n: "06",
      title: "Waiter's corkscrew",
      ctx: "Wooden bottle opener and corkscrew",
      line: "Personal project",
      short: "Crafts",
      tags: ["crafts", "workshop"],
      summary:
        "Wooden waiter's corkscrew (corkscrew and bottle opener) assembled from wooden parts I designed. Steps: drawing, milling (milling machine, rotary tool), laser engraving of the signature, assembly and gluing, sanding, inlay of a Quiberon stone, then varnish finish. I also took the project's photographs.",
      skills: ["travail-du-bois", "fraiseuse", "outil-rotatif", "gravure-laser"],
      steps: ["Drawing", "Milling", "Engraving", "Assembly", "Varnish"],
    },
    {
      id: "polybud",
      n: "07",
      title: "Polybud",
      ctx: "Modular earphone, master's project",
      line: "Modular earphone, master's project",
      short: "Design, Workshop",
      tags: ["design", "workshop"],
      summary:
        "Prototyping of a modular earphone (master's project), designed to be versatile: usable wirelessly, rechargeable or plugged in with a cable, as a hands-free kit with a single earpiece or with two, thanks to a reversible tip. The earphone is made of three detachable parts that are repairable and interchangeable, in a circular economy approach aiming for a high repairability index. I produced the concept and the technical drawing, then the physical mock-up in polyurethane foam, with sanding and finishing.",
      skills: ["dessin-technique", "prototypage", "maquettes"],
      steps: ["Concept", "Drawing", "Mock-up", "Sanding", "Finishing"],
    },
  ],
};
