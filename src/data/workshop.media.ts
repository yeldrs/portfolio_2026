// src/data/workshop.media.ts
// Language-neutral images, keyed by WorkshopProject.id. A project without an entry
// renders the "Photo coming soon" placeholder.

export interface WorkshopMedia {
  cover?: string;
  gallery: string[];
}

export const workshopMedia: Record<string, WorkshopMedia> = {
  // Reuses the published Caisse des Dépôts case-study images (same Archipel cards).
  cartes: {
    cover: "/images/coverProject-cdc.webp",
    gallery: [
      "/images/project-2/crazy8.webp",
      "/images/project-2/packaging.webp",
      "/images/project-2/kickoffCdc.webp",
      "/images/project-2/distributeCdc.webp",
      "/images/project-2/mapCdc.webp",
      "/images/project-2/fillTilesCdc.webp",
      "/images/project-2/editCdc.webp",
      "/images/project-2/checkCdc.webp",
      "/images/project-2/magazineCdc.webp",
    ],
  },
  bagues: {
    cover: "/images/workshop/bagues-cover.webp",
    gallery: [1, 2, 3, 4, 5, 6, 7].map((i) => `/images/workshop/bagues-${i}.webp`),
  },
  limonadier: {
    cover: "/images/workshop/limonadier-cover.webp",
    gallery: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => `/images/workshop/limonadier-${i}.webp`),
  },
  biomimetisme: {
    cover: "/images/workshop/biomimetisme-cover.webp",
    gallery: [
      "/images/workshop/biomimetisme-1.webp",
      "/images/workshop/biomimetisme-2.webp",
      "/images/workshop/biomimetisme-3.webp",
    ],
  },
  // Real workshop photos (low resolution, 375x500) first, then the presentation slides.
  polybud: {
    cover: "/images/workshop/polybud-photo-1.webp",
    gallery: [
      "/images/workshop/polybud-photo-2.webp",
      "/images/workshop/polybud-photo-3.webp",
      "/images/workshop/polybud-cover.webp",
      "/images/workshop/polybud-1.webp",
      "/images/workshop/polybud-2.webp",
      "/images/workshop/polybud-3.webp",
    ],
  },
};
