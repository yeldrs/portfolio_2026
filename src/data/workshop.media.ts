// src/data/workshop.media.ts
// Language-neutral images, keyed by WorkshopProject.id. A project without an entry
// renders the "Photo coming soon" placeholder.
//
// Layout: public/images/workshop/<id>/cover.webp + 1.webp, 2.webp... (numbered in
// display order). "cartes" reuses the published case-study images in project-2/.

export interface WorkshopMedia {
  cover?: string;
  gallery: string[];
  /** How the main image fills its frame: "contain" (default) shows it whole, "cover" fills the width and crops. */
  fit?: "cover" | "contain";
}

const dir = (id: string, count: number): WorkshopMedia => ({
  cover: `/images/workshop/${id}/cover.webp`,
  gallery: Array.from({ length: count }, (_, i) => `/images/workshop/${id}/${i + 1}.webp`),
});

export const workshopMedia: Record<string, WorkshopMedia> = {
  // Reuses the published case-study images in project-2/ (the other ones stay there).
  cartes: {
    cover: "/images/project-2/reviewsCdc.webp",
    gallery: ["fillTilesCdc", "mapCdc", "storyBoardCdc"].map(
      (name) => `/images/project-2/${name}.webp`,
    ),
  },
  // 04: the stand render first, then other Maison Le Roux art-direction work.
  salon: dir("salon", 4),
  // 4:3 photos: fill the 16:9 frame, cropping top and bottom. Other files in the
  // folder are kept on purpose (not displayed), so they can be swapped in later.
  bagues: {
    cover: "/images/workshop/bagues/cover.webp",
    gallery: ["signet-flat-top-slit", "pair-dark-bands", "band-red-and-pale-wood"].map(
      (name) => `/images/workshop/bagues/${name}.webp`,
    ),
    fit: "cover",
  },
  // Cover, three process montages (two photos each), then the close-up.
  limonadier: {
    cover: "/images/workshop/limonadier/cover.webp",
    gallery: ["blank-and-milling", "parts-and-gluing", "finished-handle", "close-up"].map(
      (name) => `/images/workshop/limonadier/${name}.webp`,
    ),
    // Montages are full photos side by side: the frame crops them, the modal shows them whole.
    fit: "cover",
  },
  biomimetisme: {
    cover: "/images/workshop/biomimetisme/cover.webp",
    gallery: ["children-at-totem", "pioneer-poster", "pioneer-poster-wide"].map(
      (name) => `/images/workshop/biomimetisme/${name}.webp`,
    ),
    fit: "cover",
  },
  // Wire-control slide first, then the clay model next to the finished prototypes (one montage), the prototyping process and
  // the left/right compatibility slide.
  polybud: {
    cover: "/images/workshop/polybud/wire-control.webp",
    gallery: ["clay-and-prototypes", "prototyping-process", "left-right-ear"].map(
      (name) => `/images/workshop/polybud/${name}.webp`,
    ),
    fit: "cover",
  },
};
