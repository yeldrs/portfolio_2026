// src/data/workshop.media.ts
// Language-neutral images, keyed by WorkshopProject.id. A project without an entry
// renders the "Photo coming soon" placeholder.
//
// Layout: public/images/workshop/<id>/cover.webp + 1.webp, 2.webp... (numbered in
// display order). "cartes" reuses the published case-study images in project-2/.

export interface WorkshopMedia {
  cover?: string;
  gallery: string[];
}

const dir = (id: string, count: number): WorkshopMedia => ({
  cover: `/images/workshop/${id}/cover.webp`,
  gallery: Array.from({ length: count }, (_, i) => `/images/workshop/${id}/${i + 1}.webp`),
});

export const workshopMedia: Record<string, WorkshopMedia> = {
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
  // 04: the stand render first, then other Maison Le Roux art-direction work.
  salon: dir("salon", 4),
  bagues: dir("bagues", 7),
  limonadier: dir("limonadier", 8),
  biomimetisme: dir("biomimetisme", 3),
  // Real workshop photos (low resolution, 375x500) first, then the presentation slides.
  polybud: dir("polybud", 6),
};
